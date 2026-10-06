import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsInt()
  userId: number;
}