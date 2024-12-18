import img1 from './assets/menu-1.png';
import img2 from './assets/menu-2.png';
import img3 from './assets/menu-3.png';
import img4 from './assets/menu-4.png';
import img5 from './assets/menu-5.png';
import img6 from './assets/menu-6.png';
import img7 from './assets/menu-7.png';

export const Menu = [
  {
    Price: 90,
    Name: 'California Roll',
    Description: 'Crab, avocado, and cucumber wrapped in seaweed and sushi rice.',
    ImageSrc: img1,
    id: 1
  },
  {
    Price: 90,
    Name: 'Spicy Tuna Roll',
    Description: 'Fresh tuna mixed with spicy mayo, wrapped in seaweed and sushi rice.',
    ImageSrc: img2,
    id: 2
  },
  {
    Price: 90,
    Name: 'Rainbow Roll',
    Description: 'Assorted fish (tuna, salmon, yellowtail) and avocado wrapped around a California roll.',
    ImageSrc: img4,
    id: 3
  },
  {
    Price: 90,
    Name: 'Nigiri Combo',
    Description: 'Assortment of nigiri sushi including tuna, salmon, shrimp, and yellowtail.',
    ImageSrc: img5,
    id: 4
  },
  {
    Price: 90,
    Name: 'Sashimi Platter',
    Description: 'Assortment of fresh sashimi including tuna, salmon, yellowtail, and octopus.',
    ImageSrc: img6,
    id: 5
  },
  {
    Price: 90,
    Name: 'Chirashi Bowl',
    Description: 'Assortment of sashimi over a bed of sushi rice.',
    ImageSrc: img7,
    id: 6
  }
];

export const Category = [
  {
    Name: 'Specialty Rolls 1',
    Description: 'Assorted rolls wrapped in seaweed and sushi rice.',
    ImageSrc: img1,
    id: 1,
    menu: Menu.slice(0, 3) // First three items from the Menu
  },
  {
    Name: 'Nigiri & Sashimi 2',
    Description: 'Fresh fish served on top of sushi rice or as slices of raw fish.',
    ImageSrc: img3,
    id: 2,
    menu: Menu.slice(3, 6) // Last three items from the Menu
  },
  {
    Name: 'Specialty Rolls 4',
    Description: 'Creative and unique sushi rolls with special ingredients and toppings.',
    ImageSrc: img6,
    id: 3,
    menu: Menu.slice(2, 5) // Last three items from the Menu
  },
  {
    Name: 'Specialty Rolls 9',
    Description: 'Creative and unique sushi rolls with special ingredients and toppings.',
    ImageSrc: img4,
    id: 4,
    menu: Menu.slice(0, 3) // Last three items from the Menu
  },
  {
    Name: 'Specialty Rolls 10',
    Description: 'Creative and unique sushi rolls with special ingredients and toppings.',
    ImageSrc: img7,
    id: 5,
    menu: Menu.slice(2, 5) // Last three items from the Menu
  }
];
