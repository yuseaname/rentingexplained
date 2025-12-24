import { Metadata } from 'next';

interface GenerateMetadataProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function generateMetadata({
  title,
  description,
  path = '',
  image = '/og-image.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: GenerateMetadataProps): Metadata {
  const baseUrl = 'https://rentingexplained.com';
  const url = `${baseUrl}${path}`;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'RentingExplained.com',
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors || ['RentingExplained.com Editorial Team'],
      tags,
    };
  }

  return metadata;
}

export function generateArticleMetadata(article: {
  title: string;
  description: string;
  slug: string;
  image: string;
  publishDate: string;
  lastModified: string;
  author: string;
  tags: string[];
}) {
  return generateMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    image: article.image,
    type: 'article',
    publishedTime: article.publishDate,
    modifiedTime: article.lastModified,
    authors: [article.author],
    tags: article.tags,
  });
}
