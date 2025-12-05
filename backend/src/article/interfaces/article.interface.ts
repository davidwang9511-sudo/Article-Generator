export interface TranscriptEntry {
  question: string;
  answer: string;
}

export interface GeneratedArticle {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  topic: string;
  createdAt: Date;
}

export interface ArticleGeneratorStrategy {
  generateArticle(
    topic: string,
    transcript: TranscriptEntry[],
    targetWordCount?: number,
  ): Promise<GeneratedArticle>;
}

