import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, Min, Max, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class TranscriptEntryDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class GenerateArticleDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranscriptEntryDto)
  transcript: TranscriptEntryDto[];

  @IsNumber()
  @IsOptional()
  @Min(200)
  @Max(1000)
  targetWordCount?: number;
}

