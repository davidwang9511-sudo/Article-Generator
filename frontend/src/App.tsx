import { memo } from 'react';
import { useInterview } from './hooks/useInterview';
import { Container, Header } from './components/layout';
import {
  TopicForm,
  QuestionPanel,
  TranscriptPanel,
  ArticleView,
  GeneratingView,
} from './components/interview';

/**
 * Interview Grid Layout Component
 * Displays question panel and transcript side by side
 */
const InterviewLayout = memo(function InterviewLayout({
  interview,
}: {
  interview: ReturnType<typeof useInterview>;
}) {
  return (
    <div style={styles.interviewGrid}>
      <QuestionPanel
        question={interview.currentQuestion}
        answer={interview.currentAnswer}
        onAnswerChange={interview.setAnswer}
        onSubmit={interview.submitAnswer}
        progress={interview.progress}
        isLastQuestion={interview.isLastQuestion}
        isLoading={interview.isLoading}
        inputMode={interview.inputMode}
        onModeChange={interview.setInputMode}
        isRecording={interview.isRecording}
        onToggleRecording={interview.toggleRecording}
        error={interview.error}
      />
      <TranscriptPanel transcript={interview.transcript} />
    </div>
  );
});

/**
 * Main Application Component
 * 
 * Architecture:
 * - Uses custom useInterview hook for state management
 * - Renders different views based on interview step
 * - All components are memoized for performance
 */
function App() {
  const interview = useInterview();

  return (
    <Container>
      <Header />

      {/* Step 1: Topic Selection */}
      {interview.step === 'topic' && (
        <TopicForm
          topic={interview.topic}
          onTopicChange={interview.setTopic}
          onSubmit={interview.startInterview}
          isLoading={interview.isLoading}
          error={interview.error}
        />
      )}

      {/* Step 2: Interview Questions */}
      {interview.step === 'interview' && (
        <InterviewLayout interview={interview} />
      )}

      {/* Step 3: Generating Article */}
      {interview.step === 'generating' && (
        <GeneratingView transcriptCount={interview.transcript.length} />
      )}

      {/* Step 4: Article Display */}
      {interview.step === 'article' && interview.article && (
        <ArticleView
          article={interview.article}
          topic={interview.topic}
          transcriptCount={interview.transcript.length}
          onNewInterview={interview.reset}
        />
      )}
    </Container>
  );
}

const styles: Record<string, React.CSSProperties> = {
  interviewGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '28px',
    animation: 'fadeIn 0.5s ease-out',
  },
};

export default App;
