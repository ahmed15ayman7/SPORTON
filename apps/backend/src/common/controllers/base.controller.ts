import {
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BaseService } from '../services/base.service';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interfaces/paginated-response.interface';

export class BaseController<T> {
    constructor(private readonly baseService: BaseService<T>) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all records with pagination and filters' })
    @ApiResponse({ status: 200, description: 'Return paginated results.' })
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<T>> {
        return this.baseService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a record by id' })
    @ApiResponse({ status: 200, description: 'Return a record by id.' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<T> {
        return this.baseService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new record' })
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    async create(@Body() data: any): Promise<T> {
        return this.baseService.create(data);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a record' })
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: any,
    ): Promise<T> {
        return this.baseService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a record' })
    @ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<T> {
        return this.baseService.delete(id);
    }
} 