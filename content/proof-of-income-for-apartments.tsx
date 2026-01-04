import fs from 'fs';
import path from 'path';
import MarkdownArticle from '@/components/article/MarkdownArticle';

export default function ProofOfIncomeForApartments() {
  const filePath = path.join(process.cwd(), 'content', 'articles', 'proof-of-income-for-apartments.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return <MarkdownArticle markdown={markdown} />;
}
