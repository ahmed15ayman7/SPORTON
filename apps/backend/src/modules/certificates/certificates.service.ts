import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Certificate } from '@prisma/client';

@Injectable()
export class CertificatesService extends BaseService<Certificate> {
    constructor(prisma: PrismaService) {
        super(prisma, 'certificate');
    }

    protected getSearchFields(): string[] {
        return ['title', 'issuer', 'description'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
        };
    }

    async getCertificateProfile(id: number): Promise<Certificate> {
        const certificate = await this.prisma.certificate.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!certificate) {
            throw new NotFoundException('الشهادة غير موجودة');
        }
        return certificate;
    }

    async getUserCertificates(userId: number): Promise<Certificate[]> {
        const certificates = await this.prisma.certificate.findMany({
            where: { userId },
            include: this.getIncludeFields(),
        });
        return certificates;
    }

    async getVerifiedCertificates(userId: number): Promise<Certificate[]> {
        const certificates = await this.prisma.certificate.findMany({
            where: {
                userId,
                verified: true
            },
            include: this.getIncludeFields(),
        });
        return certificates;
    }
} 