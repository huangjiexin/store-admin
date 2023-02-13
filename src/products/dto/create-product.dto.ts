import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: '产品标题必填' })
  @ApiProperty({ description: '产品标题' })
  readonly title: string;

  @IsNotEmpty({ message: '缺少产品描述' })
  @ApiProperty({ description: '产品描述' })
  readonly desc: string;

  @ApiPropertyOptional({ description: '产品缩略图' })
  readonly thumb_url: string;

  @IsNumber()
  @ApiProperty({ description: '产品类型' })
  readonly type: number;
}
