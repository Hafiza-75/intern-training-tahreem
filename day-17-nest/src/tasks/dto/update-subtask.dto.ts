
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSubtaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
