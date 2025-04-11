import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { ScoutsService } from './scouts.service';
import { Scout } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateScoutDto } from '@/dtos/Scout.create.dto';
import { UpdateScoutDto } from '@/dtos/Scout.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('scouts')
@Controller('scouts')
export class ScoutsController extends BaseController<Scout> {
    constructor(private readonly scoutsService: ScoutsService) {
        super(scoutsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء مستكشف جديد', 'none', null, CreateScoutDto, 'المستكشفين')
    async create(@Body() createScoutDto: CreateScoutDto) {
        return this.scoutsService.create(createScoutDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث مستكشف محدد', 'none', UpdateScoutDto, null, 'المستكشفين')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateScoutDto: UpdateScoutDto) {
        return this.scoutsService.update(id, updateScoutDto);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المستكشفين', 'none', null, null, 'المستكشفين')
    @ApiQuery({ type: PaginationDto })
    async findAll(@Query() params: PaginationDto) {
        return this.scoutsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على مستكشف محدد', 'none', null, null, 'المستكشفين')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.scoutsService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على ملف المستكشف بالتفاصيل', 'none', null, null, 'المستكشفين')
    async getScoutProfile(@Param('id', ParseIntPipe) id: number) {
        return this.scoutsService.getScoutProfile(id);
    }

    @Get(':id/reports')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تقارير المستكشف', 'none', null, null, 'المستكشفين')
    async getScoutReports(@Param('id', ParseIntPipe) id: number) {
        return this.scoutsService.getScoutReports(id);
    }

    @Get(':id/discoveries')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على اكتشافات المستكشف', 'none', null, null, 'المستكشفين')
    async getScoutDiscoveries(@Param('id', ParseIntPipe) id: number) {
        return this.scoutsService.getScoutDiscoveries(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف مستكشف محدد', 'none', null, null, 'المستكشفين')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.scoutsService.remove(id);
    }
} 