const dev = process.env.NODE_ENV !== 'production';

export const apiRoute = dev ? 'http://localhost:3000' : 'https://next-mongodb-cloudinary-ecommerce-96y14rg8c.vercel.app';