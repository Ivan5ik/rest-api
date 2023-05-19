import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop() // в декоратоор можна передавать ще властивості
  title: string;
  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
