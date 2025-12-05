import { Injectable } from '@nestjs/common';
import { ArticleGeneratorStrategy, GeneratedArticle, TranscriptEntry } from '../interfaces/article.interface';

@Injectable()
export class MockArticleGeneratorStrategy implements ArticleGeneratorStrategy {
  async generateArticle(
    topic: string,
    transcript: TranscriptEntry[],
    targetWordCount: number = 400,
  ): Promise<GeneratedArticle> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const title = `Insights on ${topic}: An In-Depth Exploration`;
    
    // Build article content from transcript
    const introductions = [
      `In a recent interview, we had the opportunity to delve deep into the world of ${topic}. The conversation revealed fascinating insights that challenge conventional thinking and offer fresh perspectives on this important subject.`,
      `${topic} continues to capture the attention of professionals and enthusiasts alike. Our recent discussion uncovered valuable perspectives that shed light on both the challenges and opportunities in this space.`,
    ];

    const transitions = [
      'When asked about their experience,',
      'Diving deeper into the conversation,',
      'On the topic of challenges and growth,',
      'Looking toward the future,',
      'Reflecting on the journey so far,',
    ];

    const conclusions = [
      `As our conversation concluded, it became clear that ${topic} represents not just a field of study or work, but a passion that drives continuous innovation and growth. The insights shared here offer valuable guidance for anyone looking to deepen their understanding of this dynamic area.`,
      `The discussion highlighted the multifaceted nature of ${topic}, revealing both its complexities and its tremendous potential. For those interested in this field, the perspectives shared serve as both inspiration and practical guidance for the journey ahead.`,
    ];

    let content = introductions[Math.floor(Math.random() * introductions.length)] + '\n\n';

    // Add content from transcript
    transcript.forEach((entry, index) => {
      const transition = transitions[index % transitions.length];
      content += `${transition} the response was illuminating: "${entry.answer}"\n\n`;
    });

    content += conclusions[Math.floor(Math.random() * conclusions.length)];

    // Pad content if needed to reach target word count
    const currentWordCount = content.split(/\s+/).length;
    if (currentWordCount < targetWordCount) {
      const additionalContent = `\n\nThe broader implications of these insights extend beyond immediate applications. In an increasingly connected world, the principles discussed here—continuous learning, adaptability, and genuine engagement—serve as foundational elements for success in any endeavor related to ${topic}. The key takeaway is clear: approach this field with curiosity, embrace challenges as opportunities for growth, and never underestimate the power of persistent effort combined with thoughtful reflection.`;
      content += additionalContent;
    }

    const wordCount = content.split(/\s+/).length;

    return {
      id: `article-${Date.now()}`,
      title,
      content,
      wordCount,
      topic,
      createdAt: new Date(),
    };
  }
}

