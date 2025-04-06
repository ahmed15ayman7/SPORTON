import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AgentClientService } from './agent-client.service';
import { CreateAgentClientDto } from './dto/create-agent-client.dto';
import { UpdateAgentClientDto } from './dto/update-agent-client.dto';
import { AgentClient, ClientStatus } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController } from '@/common/controllers/base.controller';
@ApiTags('عملاء الوكلاء')
@Controller('agent-clients')
export class AgentClientController {
    constructor(private readonly agentClientService: AgentClientService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء علاقة عميل ووكيل جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء العلاقة بنجاح' })
    async create(@Body() createAgentClientDto: CreateAgentClientDto): Promise<AgentClient> {
        return this.agentClientService.create(createAgentClientDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع علاقات العملاء والوكلاء' })
    @ApiResponse({ status: 200, description: 'تم جلب العلاقات بنجاح' })
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<AgentClient>> {
        return this.agentClientService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على علاقة عميل ووكيل محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العلاقة بنجاح' })
    async findOne(@Param('id') id: number): Promise<AgentClient> {
        return this.agentClientService.findOne(+id);
    }

    @Get('agent/:agentId')
    @ApiOperation({ summary: 'الحصول على عملاء وكيل محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب العملاء بنجاح' })
    async findByAgent(@Param('agentId') agentId: number): Promise<AgentClient[]> {
        return this.agentClientService.findByAgent(+agentId);
    }

    @Get('client/:clientId')
    @ApiOperation({ summary: 'الحصول على وكلاء عميل محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الوكلاء بنجاح' })
    async findByClient(@Param('clientId') clientId: number): Promise<AgentClient[]> {
        return this.agentClientService.findByClient(+clientId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على علاقات العملاء والوكلاء بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العلاقات بنجاح' })
    async findByStatus(@Param('status') status: ClientStatus): Promise<AgentClient[]> {
        return this.agentClientService.findByStatus(status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث علاقة عميل ووكيل محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث العلاقة بنجاح' })
    async update(
        @Param('id') id: number,
        @Body() updateAgentClientDto: UpdateAgentClientDto,
    ): Promise<AgentClient> {
        return this.agentClientService.update(+id, updateAgentClientDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف علاقة عميل ووكيل محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف العلاقة بنجاح' })
    async remove(@Param('id') id: number): Promise<AgentClient> {
        return this.agentClientService.remove(+id);
    }
} 