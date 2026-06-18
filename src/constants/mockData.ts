export interface Flyer {
  id: string;
  title: string;
  description: string;
  storeName: string;
  storeLogo: string;
  category: 'Grocery' | 'Fashion' | 'Services';
  image: string;
  distance: string;
  views: number;
  validUntil: string;
  location: string;
  followed?: boolean;
  saved?: boolean;
  badgeText?: string;
  badgeColor?: 'red' | 'yellow' | 'green' | 'slate' | 'default';
}

export const INITIAL_FLYERS: Flyer[] = [
  {
    id: 'f1',
    title: 'Whole Foods Market Fresh Organics',
    description: 'Save up to 45% on all certified organic produce, fresh-caught Atlantic salmon, grass-fed beef ribs, and artisanal cheeses. Grab your healthy meal ingredients today.',
    storeName: 'Whole Foods Market',
    storeLogo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&auto=format&fit=crop&q=80',
    category: 'Grocery',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuRrM8nAFvT7Mz7wyNEM3IfCrgwTy8az0aPtimPUqRg8qGJxCknPvDx9y-4LwpBJBSF3PrJfSOXLjRGGEvFJU08s1L0_cGfBjClLOh0lHMEApZlBeHi-pis-Hf1Zf4SeW7-mzx4gBTHfOqpzfrmrb85ojXabXcPmYYkSP2rLRBesJN5zIyHJATQcv1_9yp2FeYnm13O2nDTFnXl2wskTgyE5_uSgnAYJkHrRQlzq7QRYpqt2vMmab-gX_5k_hzQ-Sw4hbXmt2PlF0',
    distance: '1.2 miles away',
    views: 1240,
    validUntil: 'June 25, 2026',
    location: '250 7th Ave, Brooklyn, NY 11215',
    followed: false,
    saved: false,
    badgeText: 'ENDS IN 2D',
    badgeColor: 'red',
  },
  {
    id: 'f2',
    title: 'H&M Summer Essentials Collection',
    description: 'Get ready for the summer season! Enjoy a massive buy-one-get-one-free (BOGO) on all summer dresses, linen shirts, activewear, sunglasses, and swimwear.',
    storeName: 'H&M Fashion',
    storeLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&auto=format&fit=crop&q=80',
    category: 'Fashion',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqSxvvxwo44zj-ijVQt063DucOLyQ3mRIEzjePl6kcY5rLtyvhp1Zbfvn_XbkNI_V_5ocv9s9AQZnArf-plVSpxVviUmBhHnJPHKRLR5tT60KEV3EQKq35i7L8zhCWuF__CxdWmQmLcckQKOu0X0E_8A7mqXZH-2LGzw0411Z4syXvta6cFxKSLnFOMCGP73erwGeC-s1VqKtNKUrV997fD_xYPu18o8wVkQFJb7kyi9l9bsOI9X83D-W06kgJ_luWKJcfSI8uNqw',
    distance: '0.8 miles away',
    views: 843,
    validUntil: 'June 30, 2026',
    location: '5100 Kings Plaza, Brooklyn, NY 11234',
    followed: true,
    saved: false,
    badgeText: 'NEW TODAY',
    badgeColor: 'yellow',
  },
  {
    id: 'f3',
    title: 'Speedy Auto Services Care Specials',
    description: 'Full inspection, oil change, tire rotation, and fluid top-off. 50% discount on standard service packages this week only. Keep your vehicle running smoothly!',
    storeName: 'Speedy Auto Services',
    storeLogo: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&auto=format&fit=crop&q=80',
    category: 'Services',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7SvH2mBOWXkQy0k5vA_P1S6jnMoXoEoY5HNMy6mIodFh_snIvR6Vz71d7g8dQsAWiE9OC9Z9wJnLz7VTRkGm4C9KoWTERg4fF3f-wd1no5Dt8lFYz74HM1DRlU4Dy847IBnCnUvbhw9Wkytkba9m5GZ3aAzdU7rTZJqTLurWdoaYGinWhjz-6UT3dpeNOiT8hD-OT7Es-PKxAaTMVnHZOh0hO2yRBK8WtQodFr4RkyD8RMkAp7fkw9nGSuRNd913SLQu57PGyX4w',
    distance: '2.5 miles away',
    views: 2150,
    validUntil: 'July 05, 2026',
    location: '1410 Atlantic Ave, Brooklyn, NY 11216',
    followed: false,
    saved: true,
    badgeText: '50% OFF SERVICE',
    badgeColor: 'green',
  },
  {
    id: 'f4',
    title: 'Target Mega Summer Weekly Deals',
    description: 'Stock up your home pantry! Amazing price cuts on kitchen utilities, groceries, patio furniture, and summer coolers. Spend $100 and receive an instant $15 gift card.',
    storeName: 'Target Deals',
    storeLogo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=100&auto=format&fit=crop&q=80',
    category: 'Grocery',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXgy5gcPp5yyDs4v9_eQVEEu4XMYwrjQ0ZQvf5CnUp61hxwEZwCNuwwZILjBwdk7iKQi9zFOGOcfQBJ4kzBrWheY4M-enIbZJ4L0FwZ4JCWVdYc_kMyEg_U2IhobYDSJm-LRNoNXAnmcnW42O7OKCI0o_TMT0VT0MsNrtKmSP3HXqkUywq2XfMYxjr50v1f1WbZM1hSHMR14z8FLzpiSwXWQsxUdKOVqE34zwzpKC0A4rvK61i35PWIYDwtQF0SIUU67gk2bHYn4A',
    distance: '1.5 miles away',
    views: 932,
    validUntil: 'June 22, 2026',
    location: '1590 Flatbush Ave, Brooklyn, NY 11210',
    followed: false,
    saved: false,
    badgeText: 'WEEKLY AD',
    badgeColor: 'slate',
  }
];
