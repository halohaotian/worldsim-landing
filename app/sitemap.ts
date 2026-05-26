import { MetadataRoute } from 'next';

const DOMAIN = 'https://worldsim.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${DOMAIN}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  ];
}
