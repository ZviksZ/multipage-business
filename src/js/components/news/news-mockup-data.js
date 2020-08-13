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
            image: null,
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
            id: 21,
            image: './img/news/1.jpg',
            title: 'Тариф выходного дня на услуги миксования',
            date: '14 июля 2020',
            link: 'url21'
         },
         {
            id: 22,
            image: './img/news/2.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url22'
         },
         {
            id: 23,
            image: './img/news/3.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url23'
         },
         {
            id: 24,
            image: './img/news/4.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url24'
         },
         {
            id: 25,
            image: './img/news/5.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url25'
         },
      ],
      3: [
         {
            id: 31,
            image: './img/news/1.jpg',
            title: 'Тариф выходного дня на услуги миксования',
            date: '14 июля 2020',
            link: 'url31'
         },
         {
            id: 32,
            image: './img/news/2.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url32'
         },
         {
            id: 33,
            image: './img/news/3.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url33'
         },
         {
            id: 34,
            image: './img/news/4.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url34'
         },
         {
            id: 35,
            image: './img/news/5.jpg',
            title: 'Matelac Silver Crystalvision: новый декоративный продукт AGC',
            date: '15 июля 2020',
            link: 'url35'
         },
      ]
   }

}

export function getMockupNews(pagenumber) {
   return mockUpNews.pages[pagenumber] || [];
}


