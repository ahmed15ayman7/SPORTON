import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { AgentsService } from './agents.service';
import { Agent, Player } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateAgentDto } from '../../dtos/Agent.create.dto';
import { UpdateAgentDto } from '../../dtos/Agent.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';

@ApiTags('agents')
@Controller('agents')
export class AgentsController extends BaseController<Agent> {
    constructor(private readonly agentsService: AgentsService) {
        super(agentsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateAgentDto, "الوكلاء")
    async create(@Body() data: any): Promise<Agent> {
        return this.agentsService.create(data);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateAgentDto, null, "الوكلاء")
    async update(@Param('id') id: number, @Body() data: any): Promise<Agent> {
        return this.agentsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "الوكلاء")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Agent>> {
        return this.agentsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "الوكلاء")
    async findOne(@Param('id') id: number): Promise<Agent> {
        return this.agentsService.findOne(id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تفاصيل الوكيل' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الوكيل بنجاح' })
    async getAgentProfile(@Param('id', ParseIntPipe) id: number) {
        return this.agentsService.getAgentProfile(id);
    }

    @Get(':id/players')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على اللاعبين المتعاقدين مع الوكيل' })
    @ApiResponse({ status: 200, description: 'تم جلب اللاعبين المتعاقدين مع الوكيل بنجاح' })
    async getAgentPlayers(@Param('id', ParseIntPipe) id: number): Promise<Player[]> {
        return this.agentsService.getAgentPlayers(id);
    }

    @Get(':id/contracts')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على العقود المتعاقدين مع الوكيل' })
    @ApiResponse({ status: 200, description: 'تم جلب العقود المتعاقدين مع الوكيل بنجاح' })
    async getAgentContracts(@Param('id', ParseIntPipe) id: number) {
        return this.agentsService.getAgentContracts(id);
    }

    @Get(':id/transfers')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على التحويلات المتعاقدين مع الوكيل' })
    @ApiResponse({ status: 200, description: 'تم جلب التحويلات المتعاقدين مع الوكيل بنجاح' })
    async getAgentTransfers(@Param('id', ParseIntPipe) id: number) {
        return this.agentsService.getAgentTransfers(id);
    }


} 