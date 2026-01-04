import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function SecurityDepositReturnTimeline() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'security-deposit-return-timeline.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
