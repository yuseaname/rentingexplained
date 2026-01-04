import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function BreakingALeaseWithoutPenalty2025() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'breaking-a-lease-without-penalty-2025.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
