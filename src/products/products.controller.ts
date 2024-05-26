import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard())
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Req() req
  ) {
    const generatedId =await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
      req.user
    );
    return { id: generatedId };
  }

  @Get()
  @UseGuards(AuthGuard())
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const updateProducts=await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return updateProducts;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
     const deleteProdcut=await  this.productsService.deleteProduct(prodId);
      return deleteProdcut;
  }
}
