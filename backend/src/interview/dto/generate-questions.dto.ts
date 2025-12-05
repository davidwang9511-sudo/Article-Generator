import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class GenerateQuestionsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  topic: string;
}

