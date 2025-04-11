import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { AchievementsService } from './achievements.service';
import { Achievement } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CreateAchievementDto } from '@/dtos/Achievement.create.dto';
import { UpdateAchievementDto } from '@/dtos/Achievement.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController extends BaseController<Achievement> {
    constructor(private readonly achievementsService: AchievementsService) {
        super(achievementsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateAchievementDto, "المؤهلات")
    async create(@Body() data: any): Promise<Achievement> {
        return this.achievementsService.create(data);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateAchievementDto, null, "المؤهلات")
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<Achievement> {
        return this.achievementsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "المؤهلات")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Achievement>> {
        return this.achievementsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "المؤهلات")
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Achievement> {
        return this.achievementsService.findOne(id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get achievement profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return achievement profile.' })
    async getAchievementProfile(@Param('id', ParseIntPipe) id: number) {
        return this.achievementsService.getAchievementProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user achievements' })
    @ApiResponse({ status: 200, description: 'Return user achievements.' })
    async getUserAchievements(@Param('userId', ParseIntPipe) userId: number) {
        return this.achievementsService.getUserAchievements(userId);
    }

} 