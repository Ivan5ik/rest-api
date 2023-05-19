import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>, // яку модель і з якої колекції нам треба заінжектить.
  ) {}

  private products = [];

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getById(id): Promise<Product> {
    return this.productModel.findById(id);
  }

  async create(productDto: CreateProductDto) {
    const newProduct = new this.productModel(productDto);
    return newProduct.save();
  }

  async remove(id): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }
}
