import { Product, Category } from '../types';

const generateProducts = (): Product[] => {
  const categories: Category[] = ['Electronics', 'Clothing', 'Furniture', 'Home', 'Sports', 'Accessories'];
  const products: Product[] = [];
  
  let idCounter = 1;

  categories.forEach((category) => {
    // Generate 7-8 products per category to reach ~45 products
    const numProducts = Math.floor(Math.random() * 2) + 7; 
    for (let i = 1; i <= numProducts; i++) {
      products.push({
        id: `prod_${idCounter}`,
        name: `${category} Item ${i}`,
        category,
        price: Math.floor(Math.random() * 300) + 15,
        rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
        reviewCount: Math.floor(Math.random() * 800) + 5,
        image: `https://picsum.photos/seed/prod_${idCounter}/400/400`,
        description: `Experience the brutalist aesthetic with this premium ${category.toLowerCase()} item. Built to last, designed to stand out. Don't blend in.`,
      });
      idCounter++;
    }
  });
  
  return products;
};

export const products = generateProducts();
