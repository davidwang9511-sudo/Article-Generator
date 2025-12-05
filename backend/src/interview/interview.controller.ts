import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { GenerateQuestionsDto } from './dto/generate-questions.dto';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post('generate-questions')
  async generateQuestions(@Body() dto: GenerateQuestionsDto) {
    const session = await this.interviewService.generateQuestions(dto.topic);
    return {
      success: true,
      data: session,
    };
  }

  @Get('session/:id')
  async getSession(@Param('id') id: string) {
    const session = this.interviewService.getSession(id);
    if (!session) {
      throw new NotFoundException('Interview session not found');
    }
    return {
      success: true,
      data: session,
    };
  }
}

