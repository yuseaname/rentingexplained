import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function NoticeToVacateLetterTemplate() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'notice-to-vacate-letter-template.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
