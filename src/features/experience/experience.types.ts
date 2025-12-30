export type StoryItem = {
  year: string;
  label: string;
  title: string;
  context?: string;
  story: string;
  highlights: readonly string[];
  photo?: {
    src: string;
    alt?: string;
    orientation?: 'landscape' | 'portrait';
  };
};
