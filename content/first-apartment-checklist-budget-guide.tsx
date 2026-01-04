import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function FirstApartmentChecklistBudgetGuide() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'first-apartment-checklist-budget-guide.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
