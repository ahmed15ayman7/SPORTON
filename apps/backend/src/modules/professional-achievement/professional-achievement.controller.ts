import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfessionalAchievementService } from './professional-achievement.service';
import { CreateProfessionalAchievementDto } from './dto/create-professional-achievement.dto';
import { UpdateProfessionalAchievementDto } from './dto/update-professional-achievement.dto';
import { ProfessionalAchievement } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';

@ApiTags('الإنجازات المهنية')
@Controller('professional-achievements')
export class ProfessionalAchievementController {
    constructor(private readonly professionalAchievementService: ProfessionalAchievementService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إنجاز مهني جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الإنجاز المهني بنجاح' })
    create(@Body() createProfessionalAchievementDto: CreateProfessionalAchievementDto): Promise<ProfessionalAchievement> {
        return this.professionalAchievementService.create(createProfessionalAchievementDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الإنجازات المهنية' })
    @ApiResponse({ status: 200, description: 'تم جلب الإنجازات المهنية بنجاح' })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ProfessionalAchievement>> {
        return this.professionalAchievementService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على إنجاز مهني محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الإنجاز المهني بنجاح' })
    findOne(@Param('id') id: number): Promise<ProfessionalAchievement> {
        return this.professionalAchievementService.findOne(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على إنجازات مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إنجازات المستخدم بنجاح' })
    findByUser(@Param('userId') userId: number): Promise<ProfessionalAchievement[]> {
        return this.professionalAchievementService.findByUser(+userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث إنجاز مهني محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث الإنجاز المهني بنجاح' })
    update(
        @Param('id') id: number,
        @Body() updateProfessionalAchievementDto: UpdateProfessionalAchievementDto,
    ): Promise<ProfessionalAchievement> {
        return this.professionalAchievementService.update(+id, updateProfessionalAchievementDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف إنجاز مهني محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف الإنجاز المهني بنجاح' })
    remove(@Param('id') id: number): Promise<ProfessionalAchievement> {
        return this.professionalAchievementService.remove(+id);
    }

    @Patch(':id/verify')
    @ApiOperation({ summary: 'التحقق من إنجاز مهني محدد' })
    @ApiResponse({ status: 200, description: 'تم التحقق من الإنجاز المهني بنجاح' })
    verify(@Param('id') id: number): Promise<ProfessionalAchievement> {
        return this.professionalAchievementService.verify(+id);
    }
} 