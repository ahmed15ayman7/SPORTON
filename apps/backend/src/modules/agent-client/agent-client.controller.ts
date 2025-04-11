import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AgentClientService } from './agent-client.service';
import { CreateAgentClientDto } from '../../dtos/AgentClient.create.dto';
import { UpdateAgentClientDto } from '../../dtos/AgentClient.update.dto';
import { AgentClient, ClientStatus } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('عملاء الوكلاء')
@Controller('agent-clients')
export class AgentClientController extends BaseController<AgentClient> {
    constructor(private readonly agentClientService: AgentClientService) {
        super(agentClientService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateAgentClientDto, "عملاء الوكلاء")
    async create(@Body() data: any): Promise<AgentClient> {
        return this.agentClientService.create(data);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateAgentClientDto, null, "عملاء الوكلاء")
    async update(@Param('id') id: number, @Body() data: any): Promise<AgentClient> {
        return this.agentClientService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "عملاء الوكلاء")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<AgentClient>> {
        return this.agentClientService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "عملاء الوكلاء")
    async findOne(@Param('id') id: number): Promise<AgentClient> {
        return this.agentClientService.findOne(id);
    }
    @Get('agent/:agentId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على عملاء وكيل محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب العملاء بنجاح' })
    async findByAgent(@Param('agentId') agentId: number): Promise<AgentClient[]> {
        return this.agentClientService.findByAgent(+agentId);
    }

    @Get('client/:clientId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على وكلاء عميل محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الوكلاء بنجاح' })
    async findByClient(@Param('clientId') clientId: number): Promise<AgentClient[]> {
        return this.agentClientService.findByClient(+clientId);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على علاقات العملاء والوكلاء بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العلاقات بنجاح' })
    async findByStatus(@Param('status') status: ClientStatus): Promise<AgentClient[]> {
        return this.agentClientService.findByStatus(status);
    }

} 