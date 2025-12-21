export const SITE_CONFIG = {
  name: 'Keyable Korea',
  domain: 'keyable.co.kr',
  email: 'jinhyeokcc@gmail.com',
  phone: '+82-10-2216-0058',
  whatsapp: '821022160058',
  address: 'Seoul, South Korea',
  social: {
    instagram: 'https://instagram.com/keyablekorea',
    facebook: 'https://facebook.com/keyablekorea',
  },
};

export const SERVICES = [
  {
    slug: 'private-tour',
    icon: 'Map',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    slug: 'medical-tourism',
    icon: 'Heart',
    color: 'from-rose-500 to-pink-500',
  },
  {
    slug: 'guide-service',
    icon: 'Users',
    color: 'from-amber-500 to-orange-500',
  },
  {
    slug: 'vehicle-rental',
    icon: 'Car',
    color: 'from-emerald-500 to-teal-500',
  },
];

export const BUDGET_OPTIONS = [
  { value: 'economy', min: 1000, max: 3000 },
  { value: 'standard', min: 3000, max: 7000 },
  { value: 'premium', min: 7000, max: 15000 },
  { value: 'luxury', min: 15000, max: null },
];
