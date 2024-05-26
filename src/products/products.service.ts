import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/users.schema';
@Injectable()
export class ProductsService {
  private products: Product[] = [];
  constructor(
    @InjectModel('Products') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number,user:User) {
    const data={
      title,
      description: desc,
      price,
      
    }
    const added=Object.assign(data,{user:user._id})
    const newProduct = new this.productModel(added);
    const result = await newProduct.save();

    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().populate("user");
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
      user:{
        id:prod.user.id,
        name:prod.user.name,
        email:prod.user.email
      }
    })) as Product[];
  }

  async getSingleProduct(productId: string)  {
    const product = await this.findProduct(productId);
    return {
      id:product.id,
      title:product.title,
      description:product.description,
      price:product.price
    };
  }

    async updateProduct(
      productId: string,
      title: string,
      desc: string,
      price: number,
    ) {
      const updateProduct=await this.findProduct(productId)
      if(title){
        updateProduct.title=title
      }
      if(desc){
        updateProduct.description=desc
      }
      if(price){
        updateProduct.price=price
      }
      return await updateProduct.save()
    }

  async deleteProduct(prodId: string) {
    return await this.productModel.findByIdAndDelete(prodId, { new: true });
  }

  private async findProduct(id: string) :Promise <Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return product
  }
}
