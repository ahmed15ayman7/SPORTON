import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlayerDiscoveryService } from './player-discovery.service';
import { CreatePlayerDiscoveryDto } from './dto/create-player-discovery.dto';
import { UpdatePlayerDiscoveryDto } from './dto/update-player-discovery.dto';

@ApiTags('اكتشافات اللاعبين')
@Controller('player-discoveries')
export class PlayerDiscoveryController {
    constructor(private readonly playerDiscoveryService: PlayerDiscoveryService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء اكتشاف لاعب جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الاكتشاف بنجاح' })
    create(@Body() createPlayerDiscoveryDto: CreatePlayerDiscoveryDto) {
        return this.playerDiscoveryService.create(createPlayerDiscoveryDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع اكتشافات اللاعبين' })
    @ApiResponse({ status: 200, description: 'تم جلب الاكتشافات بنجاح' })
    findAll() {
        return this.playerDiscoveryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على اكتشاف لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الاكتشاف بنجاح' })
    findOne(@Param('id') id: string) {
        return this.playerDiscoveryService.findOne(+id);
    }

    @Get('scout/:scoutId')
    @ApiOperation({ summary: 'الحصول على اكتشافات كشاف محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الاكتشافات بنجاح' })
    findByScout(@Param('scoutId') scoutId: string) {
        return this.playerDiscoveryService.findByScout(+scoutId);
    }

    @Get('player/:playerId')
    @ApiOperation({ summary: 'الحصول على اكتشافات لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الاكتشافات بنجاح' })
    findByPlayer(@Param('playerId') playerId: string) {
        return this.playerDiscoveryService.findByPlayer(+playerId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على اكتشافات بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الاكتشافات بنجاح' })
    findByStatus(@Param('status') status: string) {
        return this.playerDiscoveryService.findByStatus(status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث اكتشاف لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث الاكتشاف بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updatePlayerDiscoveryDto: UpdatePlayerDiscoveryDto,
    ) {
        return this.playerDiscoveryService.update(+id, updatePlayerDiscoveryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف اكتشاف لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف الاكتشاف بنجاح' })
    remove(@Param('id') id: string) {
        return this.playerDiscoveryService.remove(+id);
    }
} 