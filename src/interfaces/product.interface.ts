export interface Product {
  // id: todo
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Sizes[];
  slug: string;
  tags: string[];
  title: string;
  type: Type;
  gender: Category;
}
export type Category = 'men' | 'women' | 'kid' | 'unisex';
export type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';
