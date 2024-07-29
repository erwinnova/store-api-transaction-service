import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  qty: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  amount: string;
}
