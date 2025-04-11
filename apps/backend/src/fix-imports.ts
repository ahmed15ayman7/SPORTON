import * as fs from 'fs';
import * as path from 'path';

const __dirname = path.resolve();  // تأكد أن هذا صحيح بناءً على هيكل المشروع

const dtoDir = path.resolve(__dirname, './src/dto');
if (fs.existsSync(dtoDir)) {
function replaceImportsInFile(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = content.replace(/@prisma\/client/g, '@shared/prisma');
    fs.writeFileSync(filePath, updated, 'utf8');
}

function walkDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkDir(fullPath);
        } else if (entry.name.endsWith('.ts')) {
            replaceImportsInFile(fullPath);
        }
    }
}

walkDir(dtoDir);
console.log('✅ Updated all @prisma/client imports to @shared/prisma');
}else{
    console.log(`مجلد ${dtoDir} غير موجود!`);
}

