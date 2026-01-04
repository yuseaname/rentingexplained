import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function TenantScreeningCreditChecksForRenters() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'tenant-screening-credit-checks-for-renters.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
