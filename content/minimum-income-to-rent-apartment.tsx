import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function MinimumIncomeToRentApartment() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'minimum-income-to-rent-apartment.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
