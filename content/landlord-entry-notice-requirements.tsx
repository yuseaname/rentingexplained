import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function LandlordEntryNoticeRequirements() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'landlord-entry-notice-requirements.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
