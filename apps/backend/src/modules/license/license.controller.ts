import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LicenseService } from './license.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';

@ApiTags('التراخيص')
@Controller('licenses')
export class LicenseController {
    constructor(private readonly licenseService: LicenseService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء ترخيص جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الترخيص بنجاح' })
    create(@Body() createLicenseDto: CreateLicenseDto) {
        return this.licenseService.create(createLicenseDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع التراخيص' })
    @ApiResponse({ status: 200, description: 'تم جلب التراخيص بنجاح' })
    findAll() {
        return this.licenseService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على ترخيص محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الترخيص بنجاح' })
    findOne(@Param('id') id: string) {
        return this.licenseService.findOne(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على تراخيص مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب تراخيص المستخدم بنجاح' })
    findByUser(@Param('userId') userId: string) {
        return this.licenseService.findByUser(+userId);
    }

    @Get('type/:type')
    @ApiOperation({ summary: 'الحصول على تراخيص بنوع محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب التراخيص بنجاح' })
    findByType(@Param('type') type: string) {
        return this.licenseService.findByType(type);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث ترخيص محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث الترخيص بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateLicenseDto: UpdateLicenseDto,
    ) {
        return this.licenseService.update(+id, updateLicenseDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف ترخيص محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف الترخيص بنجاح' })
    remove(@Param('id') id: string) {
        return this.licenseService.remove(+id);
    }
} 