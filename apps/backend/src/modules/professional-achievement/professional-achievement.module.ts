import { Module } from '@nestjs/common';
import { ProfessionalAchievementService } from './professional-achievement.service';
import { ProfessionalAchievementController } from './professional-achievement.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ProfessionalAchievementController],
    providers: [ProfessionalAchievementService],
    exports: [ProfessionalAchievementService],
})
export class ProfessionalAchievementModule { } 