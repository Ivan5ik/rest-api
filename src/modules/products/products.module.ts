import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), // у декортатора є парамс name, назва колекції. { name: Product.name, schema: ProductSchema } - це колекція
  ],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductsModule {}
