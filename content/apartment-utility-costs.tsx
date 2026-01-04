import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function ApartmentUtilityCosts() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'apartment-utility-costs.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
