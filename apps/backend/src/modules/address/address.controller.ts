import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('العناوين')
@Controller('addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء عنوان جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء العنوان بنجاح' })
    create(@Body() createAddressDto: CreateAddressDto) {
        return this.addressService.create(createAddressDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع العناوين' })
    @ApiResponse({ status: 200, description: 'تم جلب العناوين بنجاح' })
    findAll() {
        return this.addressService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على عنوان محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب العنوان بنجاح' })
    findOne(@Param('id') id: string) {
        return this.addressService.findOne(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على عناوين مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب عناوين المستخدم بنجاح' })
    findByUser(@Param('userId') userId: string) {
        return this.addressService.findByUser(+userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث عنوان محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث العنوان بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateAddressDto: UpdateAddressDto,
    ) {
        return this.addressService.update(+id, updateAddressDto);
    }

    @Patch(':id/set-default')
    @ApiOperation({ summary: 'تعيين عنوان كافتراضي' })
    @ApiResponse({ status: 200, description: 'تم تعيين العنوان كافتراضي بنجاح' })
    setDefault(@Param('id') id: string) {
        return this.addressService.setDefault(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف عنوان محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف العنوان بنجاح' })
    remove(@Param('id') id: string) {
        return this.addressService.remove(+id);
    }
} 