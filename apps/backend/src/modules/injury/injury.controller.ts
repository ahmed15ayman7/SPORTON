import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjuryService } from './injury.service';
import { CreateInjuryDto, InjuryStatus } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';

@ApiTags('الإصابات')
@Controller('injuries')
export class InjuryController {
    constructor(private readonly injuryService: InjuryService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إصابة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الإصابة بنجاح' })
    create(@Body() createInjuryDto: CreateInjuryDto) {
        return this.injuryService.create(createInjuryDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الإصابات' })
    @ApiResponse({ status: 200, description: 'تم جلب الإصابات بنجاح' })
    findAll() {
        return this.injuryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على إصابة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الإصابة بنجاح' })
    findOne(@Param('id') id: string) {
        return this.injuryService.findOne(+id);
    }

    @Get('player/:playerId')
    @ApiOperation({ summary: 'الحصول على إصابات لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إصابات اللاعب بنجاح' })
    findByPlayer(@Param('playerId') playerId: string) {
        return this.injuryService.findByPlayer(+playerId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على إصابات بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الإصابات بنجاح' })
    findByStatus(@Param('status') status: InjuryStatus) {
        return this.injuryService.findByStatus(status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث إصابة محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الإصابة بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateInjuryDto: UpdateInjuryDto,
    ) {
        return this.injuryService.update(+id, updateInjuryDto);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة إصابة محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الإصابة بنجاح' })
    updateStatus(
        @Param('id') id: string,
        @Body('status') status: InjuryStatus,
    ) {
        return this.injuryService.updateStatus(+id, status);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف إصابة محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف الإصابة بنجاح' })
    remove(@Param('id') id: string) {
        return this.injuryService.remove(+id);
    }
} 