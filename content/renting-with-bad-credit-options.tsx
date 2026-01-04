import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function RentingWithBadCreditOptions() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'renting-with-bad-credit-options.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
