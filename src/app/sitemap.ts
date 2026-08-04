import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-site-nnp.vercel.app';

  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/portfolio/grand-market-management',
    '/portfolio/hospital-management',
    '/portfolio/hotelpro',
    '/registration',
    '/startup-hub',
    '/contact',
    '/start-project',
    '/business-partner',
  ];

  const teamMembers = [
    'mohamed-naseem',
    'jasim-ahamed',
    'mohamed-rasith',
    'prakasu-velmurugan',
  ];

  const staticUrls: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/portfolio') ? 0.9 : 0.8,
  }));

  const teamUrls: MetadataRoute.Sitemap = teamMembers.map((slug) => ({
    url: `${baseUrl}/team/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticUrls, ...teamUrls];
}
