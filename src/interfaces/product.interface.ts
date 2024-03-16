export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // TODO type: Type;
  gender: Category;
}

export interface CartProduct {
  id: string; // Add the id property
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  images: string;
}
export type Category = 'men' | 'women' | 'kid' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';
