import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';

@Module({
    imports: [PrismaModule],
    controllers: [CertificatesController],
    providers: [CertificatesService],
    exports: [CertificatesService],
})
export class CertificatesModule { } 