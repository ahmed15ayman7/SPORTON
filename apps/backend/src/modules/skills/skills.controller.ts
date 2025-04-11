import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { SkillsService } from './skills.service';
import { Skill } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateSkillDto } from '@/dtos/Skill.create.dto';
import { UpdateSkillDto } from '@/dtos/Skill.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('skills')
@Controller('skills')
export class SkillsController extends BaseController<Skill> {
    constructor(private readonly skillsService: SkillsService) {
        super(skillsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء مهارة جديدة', 'none', null, CreateSkillDto, 'المهارات')
    async create(@Body() createSkillDto: CreateSkillDto) {
        return this.skillsService.create(createSkillDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث مهارة محددة', 'none', UpdateSkillDto, null, 'المهارات')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSkillDto: UpdateSkillDto,
    ) {
        return this.skillsService.update(id, updateSkillDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المهارات', 'none', null, null, 'المهارات')
    @ApiQuery({ type: PaginationDto })
    async findAll(@Query() params: PaginationDto) {
        return this.skillsService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على مهارة محددة', 'none', null, null, 'المهارات')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.skillsService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على ملف المهارة بالتفاصيل', 'none', null, null, 'المهارات')
    async getSkillProfile(@Param('id', ParseIntPipe) id: number) {
        return this.skillsService.getSkillProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على مهارات المستخدم', 'none', null, null, 'المهارات')
    async getUserSkills(@Param('userId', ParseIntPipe) userId: number) {
        return this.skillsService.getUserSkills(userId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف مهارة محددة', 'none', null, null, 'المهارات')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.skillsService.remove(id);
    }
} 
