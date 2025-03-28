import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { CreateContractDto, ContractStatus } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@ApiTags('العقود')
@Controller('contracts')
export class ContractController {
    constructor(private readonly contractService: ContractService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء عقد جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء العقد بنجاح' })
    create(@Body() createContractDto: CreateContractDto) {
        return this.contractService.create(createContractDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع العقود' })
    @ApiResponse({ status: 200, description: 'تم جلب العقود بنجاح' })
    findAll() {
        return this.contractService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على عقد محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب العقد بنجاح' })
    findOne(@Param('id') id: string) {
        return this.contractService.findOne(+id);
    }

    @Get('player/:playerId')
    @ApiOperation({ summary: 'الحصول على عقود لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب عقود اللاعب بنجاح' })
    findByPlayer(@Param('playerId') playerId: string) {
        return this.contractService.findByPlayer(+playerId);
    }

    @Get('club/:clubId')
    @ApiOperation({ summary: 'الحصول على عقود نادي محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب عقود النادي بنجاح' })
    findByClub(@Param('clubId') clubId: string) {
        return this.contractService.findByClub(+clubId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على عقود بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العقود بنجاح' })
    findByStatus(@Param('status') status: ContractStatus) {
        return this.contractService.findByStatus(status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث عقد محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث العقد بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateContractDto: UpdateContractDto,
    ) {
        return this.contractService.update(+id, updateContractDto);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة عقد محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة العقد بنجاح' })
    updateStatus(
        @Param('id') id: string,
        @Body('status') status: ContractStatus,
    ) {
        return this.contractService.updateStatus(+id, status);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف عقد محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف العقد بنجاح' })
    remove(@Param('id') id: string) {
        return this.contractService.remove(+id);
    }
} 