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

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsInt()
  userId: number;
}