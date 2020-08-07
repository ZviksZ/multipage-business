export const mockUpNews = {
   pages: {
      1: [
         {
            id: 1,
            image: './img/news/1.jpg',
            title: 'Тариф выходного дня на услуги миксования',
            date: '14 июля 2020',
            link: 'url1'
         },
         {
            id: 2,
            image: './img/news/2.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url2'
         },
         {
            id: 3,
            image: './img/news/3.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url3'
         },
         {
            id: 4,
            image: './img/news/4.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url4'
         },
         {
            id: 5,
            image: './img/news/5.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url5'
         },
      ],
      2: [
         {
            id: 1,
            image: './img/news/1.jpg',
            title: 'Тариф выходного дня на услуги миксования',
            date: '14 июля 2020',
            link: 'url1'
         },
         {
            id: 2,
            image: './img/news/2.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url2'
         },
         {
            id: 3,
            image: './img/news/3.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url3'
         },
         {
            id: 4,
            image: './img/news/4.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url4'
         },
         {
            id: 5,
            image: './img/news/5.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url5'
         },
      ],
      3: [
         {
            id: 1,
            image: './img/news/1.jpg',
            title: 'Тариф выходного дня на услуги миксования',
            date: '14 июля 2020',
            link: 'url1'
         },
         {
            id: 2,
            image: './img/news/2.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url2'
         },
         {
            id: 3,
            image: './img/news/3.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url3'
         },
         {
            id: 4,
            image: './img/news/4.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url4'
         },
         {
            id: 5,
            image: './img/news/5.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url5'
         },
      ]
   }

}

export function getMockupNews(pagenumber) {
   return mockUpNews.pages[pagenumber] || [];
}


