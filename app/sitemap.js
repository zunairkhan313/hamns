export default function sitemap() {
    return [
      {
        url: 'https:/www.hamnswear.com',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https:/www.hamnswear.com/about',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
      },
      {
        url: 'https:/www.hamnswear.com/contact',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      
      {
        url: 'https:/www.hamnswear.com/login',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        url: 'https:/www.hamnswear.com/register',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
 
    ]
  }