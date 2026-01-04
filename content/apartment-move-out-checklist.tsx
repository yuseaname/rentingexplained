import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function ApartmentMoveOutChecklist() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'apartment-move-out-checklist.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
