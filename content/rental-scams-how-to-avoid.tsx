import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function RentalScamsHowToAvoid() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'rental-scams-how-to-avoid.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
