import z from 'zod';

export const PRODUCT_CONDITIONING = ['unit'] as const;
export type ProductConditioning = (typeof PRODUCT_CONDITIONING)[number];
export const ProductConditioningSchema = z.enum(PRODUCT_CONDITIONING);

export const PRODUCT_UNITIES = ['unit', 'kg', 'g', 'L', 'ml'] as const;
export type ProductUnity = (typeof PRODUCT_UNITIES)[number];
export const ProductUnitySchema = z.enum(PRODUCT_UNITIES);

export const PRODUCT_SIZE = [
  'small',
  'medium',
  'large',
  'extra-large'
] as const;
export type ProductSize = (typeof PRODUCT_SIZE)[number];
export const ProductSizeSchema = z.enum(PRODUCT_SIZE);
