export const Menu = [
  {
    Price: 90,
    Name: 'California Roll',
    Description: 'Crab, avocado, and cucumber wrapped in seaweed and sushi rice.',
    ImageSrc: "assets/menu-1.png",
    id: 1
  },
  {
    Price: 90,
    Name: 'Spicy Tuna Roll',
    Description: 'Fresh tuna mixed with spicy mayo, wrapped in seaweed and sushi rice.',
    ImageSrc: "assets/menu-2.png",
    id: 2
  },
  {
    Price: 90,
    Name: 'Rainbow Roll',
    Description: 'Assorted fish (tuna, salmon, yellowtail) and avocado wrapped around a California roll.',
    ImageSrc: "assets/menu-3.png",
    id: 3
  },
  {
    Price: 90,
    Name: 'Nigiri Combo',
    Description: 'Assortment of nigiri sushi including tuna, salmon, shrimp, and yellowtail.',
    ImageSrc: "assets/menu-4.png",
    id: 4
  },
  {
    Price: 90,
    Name: 'Sashimi Platter',
    Description: 'Assortment of fresh sashimi including tuna, salmon, yellowtail, and octopus.',
    ImageSrc: "assets/menu-6.png",
    id: 5
  },
  {
    Price: 90,
    Name: 'Chirashi Bowl',
    Description: 'Assortment of sashimi over a bed of sushi rice.',
    ImageSrc: "assets/menu-7.png",
    id: 6
  }
];

export const Category = [
  {
    Name: 'Specialty Rolls 1',
    Description: 'Assorted rolls wrapped in seaweed and sushi rice.',
    ImageSrc: "assets/menu-7.png",
    id: 1,
    menu: Menu.slice(0, 3) // First three items from the Menu
  },
  {
    Name: 'Nigiri & Sashimi 2',
    Description: 'Fresh fish served on top of sushi rice or as slices of raw fish.',
    ImageSrc: "assets/menu-7.png",
    id: 2,
    menu: Menu.slice(3, 6) // Last three items from the Menu
  },
  {
    Name: 'Specialty Rolls 4',
    Description: 'Creative and unique sushi rolls with special ingredients and toppings.',
    ImageSrc: "assets/menu-7.png",
    id: 3,
    menu: Menu.slice(2, 5) // Last three items from the Menu
  },
  {
    Name: 'Specialty Rolls 9',
    Description: 'Creative and unique sushi rolls with special ingredients and toppings.',
    ImageSrc: "assets/menu-7.png",
    id: 4,
    menu: Menu.slice(0, 3) // Last three items from the Menu
  }
];
