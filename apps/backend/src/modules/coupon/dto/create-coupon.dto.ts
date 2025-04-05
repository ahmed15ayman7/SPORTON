// import { ApiProperty } from '@nestjs/swagger';
// import { IsString, IsNumber, IsDate, IsOptional, Min, Max } from 'class-validator';

// export class CreateCouponDto {
//     @ApiProperty({ description: 'رمز الكوبون' })
//     @IsString()
//     code: string;

//     @ApiProperty({ description: 'نسبة الخصم' })
//     @IsNumber()
//     @Min(0)
//     @Max(100)
//     discountPercentage: number;

//     @ApiProperty({ description: 'تاريخ بداية صلاحية الكوبون' })
//     @IsDate()
//     startDate: Date;

//     @ApiProperty({ description: 'تاريخ نهاية صلاحية الكوبون' })
//     @IsDate()
//     endDate: Date;

//     @ApiProperty({ description: 'الحد الأدنى للطلب', required: false })
//     @IsNumber()
//     @IsOptional()
//     minOrderAmount?: number;

//     @ApiProperty({ description: 'الحد الأقصى للخصم', required: false })
//     @IsNumber()
//     @IsOptional()
//     maxDiscountAmount?: number;

//     @ApiProperty({ description: 'عدد مرات الاستخدام المسموح بها', required: false })
//     @IsNumber()
//     @IsOptional()
//     usageLimit?: number;

//     @ApiProperty({ description: 'المنتجات المخصصة للكوبون', required: false })
//     @IsNumber({}, { each: true })
//     @IsOptional()
//     productIds?: number[];

//     @ApiProperty({ description: 'الوصف', required: false })
//     @IsString()
//     @IsOptional()
//     description?: string;
// } 