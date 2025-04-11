import { Controller, Get, Param, Post, Body, UseGuards, ParseIntPipe, Put, Query, Delete } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { Transfer } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateTransferDto } from '@/dtos/Transfer.create.dto';
import { UpdateTransferDto } from '@/dtos/Transfer.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@Controller('transfers')
export class TransferController extends BaseController<Transfer> {
    constructor(private readonly transferService: TransferService) {
        super(transferService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء انتقال جديد', 'none', CreateTransferDto, null, 'الانتقالات')
    create(@Body() createTransferDto: CreateTransferDto) {
        return this.transferService.create(createTransferDto as Transfer);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث انتقال محدد', 'none', UpdateTransferDto, null, 'الانتقالات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.transferService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الانتقالات', 'none', null, null, 'الانتقالات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() query: PaginationDto) {
        return this.transferService.findAll(query);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على انتقال محدد', 'none', null, null, 'الانتقالات')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.transferService.findOne(id);
    }

    @Get('by-player/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الانتقالات باللاعب', 'none', null, null, 'الانتقالات')
    getTransferByPlayerId(@Param('playerId') playerId: string): Promise<Transfer[]> {
        return this.transferService.getTransferByPlayerId(parseInt(playerId));
    }

    @Get('by-from-club/:fromClubId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الانتقالات بالنادي المنصب', 'none', null, null, 'الانتقالات')
    getTransferByFromClubId(@Param('fromClubId') fromClubId: string): Promise<Transfer[]> {
        return this.transferService.getTransferByFromClubId(parseInt(fromClubId));
    }

    @Get('by-to-club/:toClubId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الانتقالات بالنادي المستقبل', 'none', null, null, 'الانتقالات')
    getTransferByToClubId(@Param('toClubId') toClubId: string): Promise<Transfer[]> {
        return this.transferService.getTransferByToClubId(parseInt(toClubId));
    }

    @Get('by-contract/:contractId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الانتقالات بالعقد', 'none', null, null, 'الانتقالات')
    getTransferByContractId(@Param('contractId') contractId: string): Promise<Transfer[]> {
        return this.transferService.getTransferByContractId(parseInt(contractId));
    }

    @Get('by-agent/:agentId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الانتقالات بالوكيل', 'none', null, null, 'الانتقالات')
    getTransferByAgentId(@Param('agentId') agentId: string): Promise<Transfer[]> {
        return this.transferService.getTransferByAgentId(parseInt(agentId));
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف انتقال محدد', 'none', null, null, 'الانتقالات')
    remove(@Param('id') id: string) {
        return this.transferService.remove(+id);
    }
}