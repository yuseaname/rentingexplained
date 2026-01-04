import Image from 'next/image';
import Link from 'next/link';

interface AuthorBioProps {
  name: string;
  title: string;
  bio: string;
  image?: string;
  credentials?: string[];
  socialLinks?: {
    platform: string;
    url: string;
    icon?: string;
  }[];
  articleCount?: number;
}

export default function AuthorBio({
  name,
  title,
  bio,
  image = '/images/authors/default-author.jpg',
  credentials = [],
  socialLinks = [],
  articleCount,
}: AuthorBioProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 my-8">
      <div className="flex items-start gap-4">
        {/* Author Image */}
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={image}
              alt={`${name} - ${title}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1">
          {/* Name & Title */}
          <div className="mb-2">
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="text-sm text-primary-600 font-medium">{title}</p>
          </div>

          {/* Bio */}
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            {bio}
          </p>

          {/* Credentials */}
          {credentials.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Credentials:
              </p>
              <div className="flex flex-wrap gap-2">
                {credentials.map((credential, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700"
                  >
                    <svg className="w-3 h-3 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {credential}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links & Article Count */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {/* Article Count */}
            {articleCount && (
              <Link
                href={`/authors/${name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {articleCount} {articleCount === 1 ? 'Article' : 'Articles'}
              </Link>
            )}

            {/* Social Links */}
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label={`${name} on ${link.platform}`}
              >
                {link.platform === 'Twitter' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                )}
                {link.platform === 'LinkedIn' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
                {link.platform === 'Website' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Author Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            'name': name,
            'jobTitle': title,
            'description': bio,
            'image': image.startsWith('http') ? image : `https://rentingexplained.com${image}`,
            ...(socialLinks.length > 0 && {
              'sameAs': socialLinks.map(link => link.url)
            })
          })
        }}
      />
    </div>
  );
}
