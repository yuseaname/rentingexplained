import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function ApartmentLeaseAgreementExplained() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'apartment-lease-agreement-explained.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
