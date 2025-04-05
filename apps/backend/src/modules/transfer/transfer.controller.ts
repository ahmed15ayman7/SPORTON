import { Controller, Get, Param } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { BaseController } from '@/common/controllers/base.controller';
import { Transfer } from '@prisma/client';

@Controller('transfers')
export class TransferController extends BaseController<Transfer> {
    constructor(private readonly transferService: TransferService) {
        super(transferService);
    }

    @Get('by-player/:playerId')
    getTransferByPlayerId(@Param('playerId') playerId: string): Promise<Transfer[]> {
        return this.transferService.getTransferByPlayerId(parseInt(playerId));
    }

    @Get('by-from-club/:fromClubId')
    getTransferByFromClubId(@Param('fromClubId') fromClubId: string): Promise<Transfer[]> {
        return this.transferService.getTransferByFromClubId(parseInt(fromClubId));
    }

    @Get('by-to-club/:toClubId')
    getTransferByToClubId(@Param('toClubId') toClubId: string): Promise<Transfer[]> {
        return this.transferService.getTransferByToClubId(parseInt(toClubId));
    }

    @Get('by-contract/:contractId')
    getTransferByContractId(@Param('contractId') contractId: string): Promise<Transfer[]> {
        return this.transferService.getTransferByContractId(parseInt(contractId));
    }

    @Get('by-agent/:agentId')
    getTransferByAgentId(@Param('agentId') agentId: string): Promise<Transfer[]> {
        return this.transferService.getTransferByAgentId(parseInt(agentId));
    }


}