import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://rafikmhadhbi01:qhaIMTJguQqtGALk@cluster0.yfksoea.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
