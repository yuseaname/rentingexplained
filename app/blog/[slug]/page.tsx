import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getArticleBySlug, getRelatedArticles, getAllArticles } from '@/lib/articles';
import { generateArticleSchema } from '@/lib/schema';
import ReadingProgress from '@/components/article/ReadingProgress';
import TableOfContents from '@/components/article/TableOfContents';
import RelatedArticles from '@/components/article/RelatedArticles';
import ArticleTracker from '@/components/article/ArticleTracker';
import ArticleQuiz from '@/components/quiz/ArticleQuiz';
import { getQuizByArticleSlug } from '@/lib/quizzes';

import HowToSaveMoneyRenting2025 from '@/content/how-to-save-money-renting-2025';
import TenantRightsEveryoneShouldKnow from '@/content/tenant-rights-everyone-should-know';
import TenantRightsByStateOverview from '@/content/tenant-rights-by-state-overview';
import SecurityDepositsAndEvictionsOverview from '@/content/security-deposits-and-evictions-overview';
import HiddenRentalFeesExplained from '@/content/hidden-rental-fees-explained';
import BestAppsAndToolsForRenters from '@/content/best-apps-and-tools-for-renters';
import RentingVsBuying2025 from '@/content/renting-vs-buying-2025';
import FirstApartmentChecklistGuide2025 from '@/content/first-apartment-checklist-guide-2025';
import HowToBreakLeaseEarly from '@/content/how-to-break-lease-early';
import HowToNegotiateRentGuide from '@/content/how-to-negotiate-rent-guide';
import FirstApartmentChecklistBudgetGuide from '@/content/first-apartment-checklist-budget-guide';
import BreakingALeaseWithoutPenalty2025 from '@/content/breaking-a-lease-without-penalty-2025';
import RentalApplicationChecklist from '@/content/rental-application-checklist';
import ApartmentTourChecklistQuestionsRedFlags from '@/content/apartment-tour-checklist-questions-red-flags';
import TenantScreeningCreditChecksForRenters from '@/content/tenant-screening-credit-checks-for-renters';
import ApartmentMoveInCosts from '@/content/apartment-move-in-costs';
import ApartmentUtilityCosts from '@/content/apartment-utility-costs';
import RentersInsuranceCost2025 from '@/content/renters-insurance-cost-2025';

const contentComponents: Record<string, React.ComponentType> = {
  'how-to-save-money-renting-2025': HowToSaveMoneyRenting2025,
  'tenant-rights-everyone-should-know': TenantRightsEveryoneShouldKnow,
  'tenant-rights-by-state-overview': TenantRightsByStateOverview,
  'security-deposits-and-evictions-overview': SecurityDepositsAndEvictionsOverview,
  'hidden-rental-fees-explained': HiddenRentalFeesExplained,
  'best-apps-and-tools-for-renters': BestAppsAndToolsForRenters,
  'renting-vs-buying-2025': RentingVsBuying2025,
  'first-apartment-checklist-guide-2025': FirstApartmentChecklistGuide2025,
  'how-to-break-lease-early': HowToBreakLeaseEarly,
  'how-to-negotiate-rent-guide': HowToNegotiateRentGuide,
  'first-apartment-checklist-budget-guide': FirstApartmentChecklistBudgetGuide,
  'breaking-a-lease-without-penalty-2025': BreakingALeaseWithoutPenalty2025,
  'rental-application-checklist': RentalApplicationChecklist,
  'apartment-tour-checklist-questions-red-flags': ApartmentTourChecklistQuestionsRedFlags,
  'tenant-screening-credit-checks-for-renters': TenantScreeningCreditChecksForRenters,
  'apartment-move-in-costs': ApartmentMoveInCosts,
  'apartment-utility-costs': ApartmentUtilityCosts,
  'renters-insurance-cost-2025': RentersInsuranceCost2025,
};

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishDate,
      modifiedTime: article.lastModified,
      authors: [article.author],
      images: [{
        url: article.image,
        width: 1200,
        height: 630,
        alt: article.imageAlt,
      }],
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  const ContentComponent = contentComponents[params.slug];
  
  if (!ContentComponent) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(params.slug);
  const quiz = getQuizByArticleSlug(params.slug);
  const schema = generateArticleSchema(article);
  const publishDate = new Date(article.publishDate);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <ReadingProgress />
      <ArticleTracker slug={params.slug} readingTime={article.readingTime} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span>&gt;</span>
              <Link href="/blog" className="hover:text-primary-600">Blog</Link>
              <span>&gt;</span>
              <span className="text-gray-900">{article.category}</span>
            </nav>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span>{article.author}</span>
              <time dateTime={article.publishDate}>
                {publishDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <span>{article.readingTime} min read</span>
            </div>

            <p className="mt-6 text-xl text-gray-700 leading-relaxed">
              {article.description}
            </p>
          </div>
        </header>

        <div className="container mx-auto px-4 max-w-6xl -mt-8 mb-12">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </aside>

            <article className="lg:col-span-9">
              <div className="prose prose-lg max-w-none
                prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-4 prose-ul:space-y-2
                prose-ol:my-4 prose-ol:space-y-2
                prose-li:text-gray-700
                prose-img:rounded-lg prose-img:shadow-md
                prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-4 prose-blockquote:italic
              ">
                <ContentComponent />
              </div>

              {quiz && (
                <div className="mt-12">
                  <ArticleQuiz quiz={quiz} />
                </div>
              )}
            </article>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl mt-16 mb-12">
          <RelatedArticles currentSlug={params.slug} />
        </div>
      </div>
    </>
  );
}
