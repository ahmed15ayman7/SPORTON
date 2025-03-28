import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AgentClientService } from './agent-client.service';
import { CreateAgentClientDto } from './dto/create-agent-client.dto';
import { UpdateAgentClientDto } from './dto/update-agent-client.dto';

@ApiTags('عملاء الوكلاء')
@Controller('agent-clients')
export class AgentClientController {
    constructor(private readonly agentClientService: AgentClientService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء علاقة عميل ووكيل جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء العلاقة بنجاح' })
    create(@Body() createAgentClientDto: CreateAgentClientDto) {
        return this.agentClientService.create(createAgentClientDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع علاقات العملاء والوكلاء' })
    @ApiResponse({ status: 200, description: 'تم جلب العلاقات بنجاح' })
    findAll() {
        return this.agentClientService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على علاقة عميل ووكيل محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العلاقة بنجاح' })
    findOne(@Param('id') id: string) {
        return this.agentClientService.findOne(+id);
    }

    @Get('agent/:agentId')
    @ApiOperation({ summary: 'الحصول على عملاء وكيل محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب العملاء بنجاح' })
    findByAgent(@Param('agentId') agentId: string) {
        return this.agentClientService.findByAgent(+agentId);
    }

    @Get('client/:clientId')
    @ApiOperation({ summary: 'الحصول على وكلاء عميل محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الوكلاء بنجاح' })
    findByClient(@Param('clientId') clientId: string) {
        return this.agentClientService.findByClient(+clientId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على علاقات العملاء والوكلاء بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العلاقات بنجاح' })
    findByStatus(@Param('status') status: string) {
        return this.agentClientService.findByStatus(status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث علاقة عميل ووكيل محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث العلاقة بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateAgentClientDto: UpdateAgentClientDto,
    ) {
        return this.agentClientService.update(+id, updateAgentClientDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف علاقة عميل ووكيل محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف العلاقة بنجاح' })
    remove(@Param('id') id: string) {
        return this.agentClientService.remove(+id);
    }
} 