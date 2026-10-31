import { MetadataRoute } from 'next';

const DOMAIN = 'https://mandela.world';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${DOMAIN}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  ];
}
