import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { TrainingsService } from './trainings.service';
import { Training } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateTrainingDto } from '@/dtos/Training.create.dto';
import { UpdateTrainingDto } from '@/dtos/Training.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingsController extends BaseController<Training> {
    constructor(private readonly trainingsService: TrainingsService) {
        super(trainingsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء تدريب جديد', 'none', CreateTrainingDto, null, 'التدريبات')
    create(@Body() createTrainingDto: CreateTrainingDto) {
        return this.trainingsService.create(createTrainingDto as Training);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث تدريب محدد', 'none', UpdateTrainingDto, null, 'التدريبات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.trainingsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التدريبات', 'none', null, null, 'التدريبات')
    findAll(@Query() query: PaginationDto) {
        return this.trainingsService.findAll(query);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تدريب محدد', 'none', null, null, 'التدريبات')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.trainingsService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تدريب محدد بالعلاقات', 'none', null, null, 'التدريبات')
    async getTrainingProfile(@Param('id', ParseIntPipe) id: number): Promise<Training> {
        return this.trainingsService.getTrainingProfile(id);
    }

    @Get('coach/:coachId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تدريبات المدرب', 'none', null, null, 'التدريبات')
    async getCoachTrainings(@Param('coachId', ParseIntPipe) coachId: number): Promise<Training[]> {
        return this.trainingsService.getCoachTrainings(coachId);
    }

    @Get('player/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تدريبات اللاعب', 'none', null, null, 'التدريبات')
    async getPlayerTrainings(@Param('playerId', ParseIntPipe) playerId: number): Promise<Training[]> {
        return this.trainingsService.getPlayerTrainings(playerId);
    }

    @Post(':trainingId/players/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة لاعب إلى تدريب', 'none', null, null, 'التدريبات')
    async addPlayerToTraining(
        @Param('trainingId', ParseIntPipe) trainingId: number,
        @Param('playerId', ParseIntPipe) playerId: number,
    ): Promise<Training> {
        return this.trainingsService.addPlayerToTraining(trainingId, playerId);
    }

    @Delete(':trainingId/players/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إزالة لاعب من تدريب', 'none', null, null, 'التدريبات')
    async removePlayerFromTraining(
        @Param('trainingId', ParseIntPipe) trainingId: number,
        @Param('playerId', ParseIntPipe) playerId: number,
    ): Promise<Training> {
        return this.trainingsService.removePlayerFromTraining(trainingId, playerId);
    }

    @Get('check/:trainingId/players/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('التحقق من وجود لاعب في تدريب', 'none', null, null, 'التدريبات')
    async isPlayerInTraining(
        @Param('trainingId', ParseIntPipe) trainingId: number,
        @Param('playerId', ParseIntPipe) playerId: number,
    ) {
        return this.trainingsService.isPlayerInTraining(trainingId, playerId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف تدريب محدد', 'none', null, null, 'التدريبات')
    remove(@Param('id') id: string) {
        return this.trainingsService.remove(+id);
    }
} 