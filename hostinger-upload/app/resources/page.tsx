import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'Resources - Free Renting Checklists & Downloads',
  description: 'Download free renting checklists, templates, and resources to help you navigate the rental process with confidence.',
  path: '/resources',
});

export default function ResourcesPage() {
  const resources = [
    {
      title: 'Move-In Checklist',
      description: 'Complete checklist to document your unit condition at move-in',
      type: 'PDF Download',
      icon: '??',
    },
    {
      title: 'Lease Review Checklist',
      description: 'Essential items to review before signing any lease',
      type: 'PDF Download',
      icon: '??',
    },
    {
      title: 'Security Deposit Documentation Template',
      description: 'Organize photos and notes to protect your deposit',
      type: 'Template',
      icon: '??',
    },
    {
      title: 'Rent Negotiation Email Templates',
      description: 'Proven scripts to negotiate lower rent',
      type: 'Templates',
      icon: '??',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Free downloads, templates, and tools to help you rent smarter
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {resources.map((resource) => (
            <div key={resource.title} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">{resource.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-600 font-medium">{resource.type}</span>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
