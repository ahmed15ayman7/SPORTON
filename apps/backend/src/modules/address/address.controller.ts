import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from '../../dtos/Address.create.dto';
import { UpdateAddressDto } from '../../dtos/Address.update.dto';
import { Address } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('العناوين')
@Controller('addresses')
export class AddressController extends BaseController<Address> {
    constructor(private readonly addressService: AddressService) {
        super(addressService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateAddressDto, "العناوين")
    @ApiOperation({ summary: 'إنشاء عنوان جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء العنوان بنجاح' })
    async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
        return this.addressService.create(createAddressDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateAddressDto, null, "العناوين")
    async update(@Param('id') id: number, @Body() data: any): Promise<Address> {
        return this.addressService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "العناوين")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Address>> {
        return this.addressService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "العناوين")
    async findOne(@Param('id') id: number): Promise<Address> {
        return this.addressService.findOne(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على عناوين مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب عناوين المستخدم بنجاح' })
    async findByUser(@Param('userId') userId: string): Promise<Address[]> {
        return this.addressService.findByUser(+userId);
    }



    @Patch(':id/set-default')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تعيين عنوان كافتراضي' })
    @ApiResponse({ status: 200, description: 'تم تعيين العنوان كافتراضي بنجاح' })
    async setDefault(@Param('id') id: string): Promise<Address> {
        return this.addressService.setDefault(+id);
    }

} 