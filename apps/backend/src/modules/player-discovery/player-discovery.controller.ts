import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PlayerDiscoveryService } from './player-discovery.service';
import { CreatePlayerDiscoveryDto } from '@/dtos/PlayerDiscovery.create.dto';
import { UpdatePlayerDiscoveryDto } from '@/dtos/PlayerDiscovery.update.dto';
import { PlayerDiscovery, DiscoveryStatus } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CustomApiDocs } from '@/common/controllers/base.controller';
import { BaseController } from '@/common/controllers/base.controller';
@ApiTags('اكتشافات اللاعبين')
@Controller('player-discoveries')
export class PlayerDiscoveryController extends BaseController<PlayerDiscovery> {
    constructor(private readonly playerDiscoveryService: PlayerDiscoveryService) {
        super(playerDiscoveryService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء اكتشاف لاعب جديد', 'none', null, CreatePlayerDiscoveryDto, 'اكتشافات اللاعبين')
    async create(@Body() createPlayerDiscoveryDto: CreatePlayerDiscoveryDto): Promise<PlayerDiscovery> {
        return this.playerDiscoveryService.create(createPlayerDiscoveryDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث اكتشاف لاعب معين', 'none', UpdatePlayerDiscoveryDto, null, 'اكتشافات اللاعبين')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<PlayerDiscovery> {
        return this.playerDiscoveryService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع اكتشافات اللاعبين', 'none', null, null, 'اكتشافات اللاعبين')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<PlayerDiscovery>> {
        return this.playerDiscoveryService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على اكتشاف لاعب محدد', 'none', null, null, 'اكتشافات اللاعبين')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<PlayerDiscovery> {
        return this.playerDiscoveryService.findOne(id);
    }

    @Get('scout/:scoutId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على اكتشافات كشاف محدد', 'none', null, null, 'اكتشافات اللاعبين')
    findByScout(@Param('scoutId') scoutId: string): Promise<PlayerDiscovery[]> {
        return this.playerDiscoveryService.findByScout(+scoutId);
    }

    @Get('player/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على اكتشافات لاعب محدد', 'none', null, null, 'اكتشافات اللاعبين')
    findByPlayer(@Param('playerId') playerId: string): Promise<PlayerDiscovery[]> {
        return this.playerDiscoveryService.findByPlayer(+playerId);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على اكتشافات بحالة محددة', 'none', null, null, 'اكتشافات اللاعبين')
    findByStatus(@Param('status') status: string): Promise<PlayerDiscovery[]> {
        return this.playerDiscoveryService.findByStatus(status as DiscoveryStatus);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف اكتشاف لاعب محدد', 'none', null, null, 'اكتشافات اللاعبين')
    remove(@Param('id') id: string): Promise<PlayerDiscovery> {
        return this.playerDiscoveryService.remove(+id);
    }
} 