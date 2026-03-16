import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function LeaseRenewalVsMovingOut() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'lease-renewal-vs-moving-out.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
