import Link from 'next/link';
import Image from 'next/image';
import { getRelatedArticles } from '@/lib/articles';

interface RelatedArticlesProps {
  currentSlug: string;
}

export default function RelatedArticles({ currentSlug }: RelatedArticlesProps) {
  const related = getRelatedArticles(currentSlug, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Continue Learning</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {article.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
