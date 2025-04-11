import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TransferStatus } from '@shared/prisma';
import { BaseService } from '@/common/services/base.service';
import { Transfer } from '@shared/prisma';
@Injectable()
export class TransferService extends BaseService<Transfer> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'transfer');
    }
    protected getIncludeFields(): object {
        return {
            player: true,
            agent: true,
            fromClub: true,
            toClub: true,
            contract: true,
        };
    }
    getTransferByPlayerId(playerId: number): Promise<Transfer[]> {
        return this.prisma.transfer.findMany({
            where: {
                playerId,
            },
        });
    }

    getTransferByFromClubId(fromClubId: number): Promise<Transfer[]> {
        return this.prisma.transfer.findMany({
            where: {
                fromClubId,
            },
        });
    }

    getTransferByToClubId(toClubId: number): Promise<Transfer[]> {
        return this.prisma.transfer.findMany({
            where: {
                toClubId,
            },
        });
    }

    getTransferByContractId(contractId: number): Promise<Transfer[]> {
        return this.prisma.transfer.findMany({
            where: {
                contractId,
            },
        });
    }

    getTransferByAgentId(agentId: number): Promise<Transfer[]> {
        return this.prisma.transfer.findMany({
            where: {
                agentId,
            },
        });
    }
}