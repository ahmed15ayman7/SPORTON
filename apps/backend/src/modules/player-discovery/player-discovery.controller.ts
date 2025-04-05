import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlayerDiscoveryService } from './player-discovery.service';
import { CreatePlayerDiscoveryDto } from './dto/create-player-discovery.dto';
import { UpdatePlayerDiscoveryDto } from './dto/update-player-discovery.dto';
import { PlayerDiscovery, DiscoveryStatus } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('اكتشافات اللاعبين')
@Controller('player-discoveries')
export class PlayerDiscoveryController {
    constructor(private readonly playerDiscoveryService: PlayerDiscoveryService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء اكتشاف لاعب جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الاكتشاف بنجاح' })
    async create(@Body() createPlayerDiscoveryDto: CreatePlayerDiscoveryDto): Promise<PlayerDiscovery> {
        return this.playerDiscoveryService.create(createPlayerDiscoveryDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع اكتشافات اللاعبين' })
    @ApiResponse({ status: 200, description: 'تم جلب الاكتشافات بنجاح' })
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<PlayerDiscovery>> {
        return this.playerDiscoveryService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على اكتشاف لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الاكتشاف بنجاح' })
    findOne(@Param('id') id: string): Promise<PlayerDiscovery> {
        return this.playerDiscoveryService.findOne(+id);
    }

    @Get('scout/:scoutId')
    @ApiOperation({ summary: 'الحصول على اكتشافات كشاف محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الاكتشافات بنجاح' })
    findByScout(@Param('scoutId') scoutId: string): Promise<PlayerDiscovery[]> {
        return this.playerDiscoveryService.findByScout(+scoutId);
    }

    @Get('player/:playerId')
    @ApiOperation({ summary: 'الحصول على اكتشافات لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الاكتشافات بنجاح' })
    findByPlayer(@Param('playerId') playerId: string): Promise<PlayerDiscovery[]> {
        return this.playerDiscoveryService.findByPlayer(+playerId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على اكتشافات بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الاكتشافات بنجاح' })
    findByStatus(@Param('status') status: string): Promise<PlayerDiscovery[]> {
        return this.playerDiscoveryService.findByStatus(status as DiscoveryStatus);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث اكتشاف لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث الاكتشاف بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updatePlayerDiscoveryDto: UpdatePlayerDiscoveryDto,
    ): Promise<PlayerDiscovery> {
        return this.playerDiscoveryService.update(+id, updatePlayerDiscoveryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف اكتشاف لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف الاكتشاف بنجاح' })
    remove(@Param('id') id: string): Promise<PlayerDiscovery> {
        return this.playerDiscoveryService.remove(+id);
    }
} 