import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function Section8HousingVouchersExplained() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'section-8-housing-vouchers-explained.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
