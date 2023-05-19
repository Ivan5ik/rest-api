import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Redirect,
  // HttpCode,
  // HttpStatus,
  // Header,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  // @Get()
  // @Redirect('https://www.youtube.com/', 301)
  // getAlll(@Req() req: Request, @Res() res: Response): string {
  //   res.status(201).end('Poka');
  // }

  @Get()
  getAlll() {
    return this.productService.getAll();
  }

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  // @Header('1st param', '2nd param')
  createNewProduct(@Body() createNewProduct: CreateProductDto) {
    return this.productService.create(createNewProduct);
  }

  @Get(':id')
  getOneProduct(@Param('id') params) {
    return this.productService.getById(params);
  }

  @Delete(':id')
  daleted(@Param('id') body: string) {
    return 'delete ' + body;
  }

  @Put(':id')
  update(@Param('id') id, @Body() body: CreateProductDto) {
    return `update ${id} with body ${body.title}`;
  }
}
