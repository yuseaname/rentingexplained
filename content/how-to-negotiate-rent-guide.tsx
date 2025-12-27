import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function HowToNegotiateRentGuide() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'how-to-negotiate-rent-guide.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
