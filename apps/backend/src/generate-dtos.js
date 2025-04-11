const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const SCHEMA_PATH = path.join(__dirname, "..", "..", "..", "packages", "shared", "prisma", "schema.prisma");
const OUTPUT_DIR = path.join(__dirname, "dtos");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let schema = fs.readFileSync(SCHEMA_PATH, "utf8");
schema = schema.replace(/\/\/.*$/gm, "");

// إزالة التعليقات متعددة الأسطر
schema = schema.replace(/\/\*[\s\S]*?\*\//gm, "");
const models = schema
    .split("model ")
    .slice(1)
    .map((section) => {
        const [name, ...rest] = section.split("{");
        const body = rest.join("{").split("}")[0];
        return {
            name: name.trim(),
            fields: body
                .trim()
                .split("\n")
                .map((f) => f
                    .replace(/\/\/.*$/, "")      // يشيل التعليقات
                    .replace(/@.*$/, "")         // يشيل أي attribute يبدأ بـ @
                    .trim()
                )
                .filter(Boolean),
        };
    });

const enums = schema
    .split("enum ")
    .slice(1)
    .map((section) => {
        const [name, ...rest] = section.split("{");
        const body = rest.join("{").split("}")[0];
        return {
            name: name.trim(),
            fields: body
                .trim()
                .split("\n")
                .map((f) => f
                    .replace(/\/\/.*$/, "")      // يشيل التعليقات
                    .replace(/@.*$/, "")         // يشيل أي attribute يبدأ بـ @
                    .trim()
                )
                .filter(Boolean),
        };
    });
const typeMap = {
    Int: "number",
    String: "string",
    Boolean: "boolean",
    Float: "number",
    DateTime: "Date",
    Json: "object",  // No longer using 'any', using 'object' instead
};

async function generateFile(model, isModel = false, dtoType = "") {
    const lines = [];
    const imports = new Set([`import { ApiProperty } from '@nestjs/swagger';`]);
    const externalTypes = new Set();

    // إذا كانت Entity، يتم إضافة Decorator لـ TypeORM
    if (isModel) {
        lines.push(`import { Entity, Column } from 'typeorm';`);
        lines.push(`@Entity()`);  // استخدام Decorator لـ TypeORM Entity

        // إضافة تعليقات لتوضيح نوع الملف (Entity أو DTO)
        lines.push(`// This is the ${dtoType === "Create" ? "Create" : dtoType === "Update" ? "Update" : ""} Entity for ${model.name}`);
        lines.push(`export class ${dtoType === "Create" ? "Create" : dtoType === "Update" ? "Update" : ""}${model.name}${dtoType === "Entity" ? 'Entity' : "Dto"} {`);
    } else {
        lines.push(`// This is the ${dtoType === "Create" ? "Create" : dtoType === "Update" ? "Update" : ""} DTO for ${model.name}`);
        lines.push(`export class ${model.name}${dtoType}Dto {`);
    }

    model.fields.forEach((line) => {
        const [field, typeRaw, ...rest] = line.split(/\s+/);
        const isArray = typeRaw.includes("[]");
        const isOptional = typeRaw.includes("?") || rest.includes("@default(null)");

        const baseType = typeRaw.replace("?", "").replace("[]", "");
        const tsType = typeMap[baseType] || baseType;

        if (!typeMap[baseType]) {
            externalTypes.add(baseType);
        }

        const isEnum = enums.some(e => e.name === baseType);
        const isModels = models.some(e => e.name === baseType);
        if (dtoType === "Create" || dtoType === "Update") {
            if (isModels || field === "id") {
                return null;
            }
        }
        let decoratorLine = `  @ApiProperty({ `;

        if (baseType === "object" || baseType === "Json") {
            decoratorLine += ` additionalProperties: true,type: 'object'`;
        } else if (isEnum) {
            decoratorLine += `enum: ${baseType}`;
        } else if (isModels && dtoType !== "Create" && dtoType !== "Update") {
            if (!(baseType === model.name && dtoType === "Entity")) {
                imports.add(`import { ${baseType}Entity } from './${baseType}.entity';`);
            }
            decoratorLine += `type: ${baseType}Entity`;  // استخدام الـ Entity بدلاً من الـ baseType
        } else {
            decoratorLine += `type: '${baseType === "DateTime" ? "string" : tsType}'`;
            if (baseType === "DateTime") decoratorLine += `, format: 'date-time'`;
        }

        if (isOptional && dtoType !== "Create") decoratorLine += `, nullable: true`;

        decoratorLine += ` })`;

        lines.push("");
        lines.push(decoratorLine);

        // إضافة تعليق للإشارة إلى نوع الحقل
        lines.push(`// Field: ${field}, Type: ${tsType}${isArray ? "[]" : ""}`);

        // إذا كانت Entity، سنستخدم @Column
        if (isModel) {
            lines.push(`  @Column()`);
        }

        lines.push(`  ${field}${isOptional ? "?" : ""}: ${tsType}${isArray ? "[]" : ""};`);
    });

    lines.push(`}`);

    if (externalTypes.size > 0) {
        imports.add(`import { ${Array.from(externalTypes).join(", ")} } from '@shared/prisma';`);
    }

    const content = [...imports, "", ...lines].join("\n");
    return await prettier.format(content, { parser: "typescript" });
}

(async () => {
    for (const model of models) {
        const isModel = models.some(e => e.name === model.name);

        // توليد Create DTO
        const fileContentCreate = await generateFile(model, isModel, "Create");
        fs.writeFileSync(path.join(OUTPUT_DIR, `${model.name}.create.dto.ts`), fileContentCreate);

        // توليد Update DTO
        const fileContentUpdate = await generateFile(model, isModel, "Update");
        fs.writeFileSync(path.join(OUTPUT_DIR, `${model.name}.update.dto.ts`), fileContentUpdate);

        // توليد Entity
        const fileContentEntity = await generateFile(model, isModel, "Entity");
        fs.writeFileSync(path.join(OUTPUT_DIR, `${model.name}.entity.ts`), fileContentEntity);
        const fileContent = await generateFile(model, isModel, "");
        fs.writeFileSync(path.join(OUTPUT_DIR, `${model.name}.dto.ts`), fileContent);
    }
    console.log("✅ Models, Create DTOs, and Update DTOs generated successfully!");
})();
