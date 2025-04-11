import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProfessionalAchievementService } from './professional-achievement.service';
import { CreateProfessionalAchievementDto } from '@/dtos/ProfessionalAchievement.create.dto';
import { UpdateProfessionalAchievementDto } from '@/dtos/ProfessionalAchievement.update.dto';
import { ProfessionalAchievement } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('الإنجازات المهنية')
@Controller('professional-achievements')
export class ProfessionalAchievementController extends BaseController<ProfessionalAchievement> {
    constructor(private readonly professionalAchievementService: ProfessionalAchievementService) {
        super(professionalAchievementService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء إنجاز مهني جديد', 'none', null, CreateProfessionalAchievementDto, 'الإنجازات المهنية')
    create(@Body() createProfessionalAchievementDto: CreateProfessionalAchievementDto): Promise<ProfessionalAchievement> {
        return this.professionalAchievementService.create(createProfessionalAchievementDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث إنجاز مهني محدد', 'none', UpdateProfessionalAchievementDto, null, 'الإنجازات المهنية')
    update(@Param('id') id: number, @Body() data: any): Promise<ProfessionalAchievement> {
        return this.professionalAchievementService.update(+id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الإنجازات المهنية', 'none', null, null, 'الإنجازات المهنية')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ProfessionalAchievement>> {
        return this.professionalAchievementService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إنجاز مهني محدد', 'none', null, null, 'الإنجازات المهنية')
    findOne(@Param('id') id: number): Promise<ProfessionalAchievement> {
        return this.professionalAchievementService.findOne(+id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إنجازات مستخدم محدد', 'none', null, null, 'الإنجازات المهنية')
    findByUser(@Param('userId') userId: number): Promise<ProfessionalAchievement[]> {
        return this.professionalAchievementService.findByUser(+userId);
    }

    @Patch(':id/verify')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('التحقق من إنجاز مهني محدد', 'none', null, null, 'الإنجازات المهنية')
    verify(@Param('id') id: number): Promise<ProfessionalAchievement> {
        return this.professionalAchievementService.verify(+id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف إنجاز مهني محدد', 'none', null, null, 'الإنجازات المهنية')
    remove(@Param('id') id: number): Promise<ProfessionalAchievement> {
        return this.professionalAchievementService.remove(+id);
    }

} 