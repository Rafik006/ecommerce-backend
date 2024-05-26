import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from './product.model';
import { AuthModule } from 'src/auth/auth.module';
import {UserSchema} from "../auth/schemas/users.schema"

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Products', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
