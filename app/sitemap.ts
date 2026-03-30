import { MetadataRoute } from 'next'

const url = 'https://readtheprint.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${url}/demo`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${url}/help`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${url}/terms`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${url}/privacy`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${url}/blog`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${url}/blog/freelance-contract-review`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${url}/blog/how-to-review-an-nda`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${url}/blog/non-compete-clause-explained`,
      lastModified: new Date('2026-03-30'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${url}/blog/saas-agreement-checklist`,
      lastModified: new Date('2026-03-30'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${url}/blog/msa-review-checklist`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${url}/blog/contract-red-flags-freelancers`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${url}/blog/how-to-read-a-contract`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${url}/nda-review`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${url}/freelance-contract-review-tool`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${url}/msa-review`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}
