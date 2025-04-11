import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UserSegmentService } from './user-segment.service';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { UserSegment, User, AdTargeting, TargetingPerformance } from '@shared/prisma';
import { CreateUserSegmentDto } from '@/dtos/UserSegment.create.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UpdateUserSegmentDto } from '@/dtos/UserSegment.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('فئة المستخدم')
@Controller('user-segment')
export class UserSegmentController extends BaseController<UserSegment> {
    constructor(private readonly userSegmentService: UserSegmentService) {
        super(userSegmentService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء فئة مستخدم جديدة', 'none', CreateUserSegmentDto, null, 'فئة المستخدم')
    create(@Body() createUserSegmentDto: CreateUserSegmentDto) {
        return this.userSegmentService.create(createUserSegmentDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث فئة مستخدم محددة', 'none', UpdateUserSegmentDto, null, 'فئة المستخدم')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.userSegmentService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع فئات المستخدم', 'none', null, null, 'فئة المستخدم')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() query: PaginationDto) {
        return this.userSegmentService.findAll(query);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على فئة مستخدم محددة', 'none', null, null, 'فئة المستخدم')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userSegmentService.findOne(id);
    }

    @Get(':id/users')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المستخدمين في فئة معينة', 'none', null, null, 'فئة المستخدم')
    getSegmentUsers(@Param('id') id: string): Promise<User[]> {
        return this.userSegmentService.getSegmentUsers(+id);
    }

    @Get(':id/targeting')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع استهدافات الإعلانات لفئة معينة', 'none', null, null, 'فئة المستخدم')
    getSegmentTargeting(@Param('id') id: string): Promise<AdTargeting[]> {
        return this.userSegmentService.getSegmentTargeting(+id);
    }

    @Get(':id/performance')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع أداء الاستهداف لفئة معينة', 'none', null, null, 'فئة المستخدم')
    getSegmentPerformance(@Param('id') id: string): Promise<TargetingPerformance[]> {
        return this.userSegmentService.getSegmentPerformance(+id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف فئة مستخدم محددة', 'none', null, null, 'فئة المستخدم')
    remove(@Param('id') id: string) {
        return this.userSegmentService.remove(+id);
    }
} 