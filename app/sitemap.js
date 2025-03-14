export default function sitemap() {
    return [
      {
        url: 'https://www.cappello.pk',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://www.cappello.pk/about',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
      },
      {
        url: 'https://www.cappello.pk/contact',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      // {
      //   url: 'https://www.cappello.pk/category',
      //   lastModified: new Date(),
      //   changeFrequency: 'weekly',
      //   priority: 0.5,
      // },
      {
        url: 'https://www.cappello.pk/login',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        url: 'https://www.cappello.pk/register',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
 
    ]
  }