"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
        this.products = [];
    }
    async insertProduct(title, desc, price, user) {
        const data = {
            title,
            description: desc,
            price,
        };
        const added = Object.assign(data, { user: user._id });
        const newProduct = new this.productModel(added);
        const result = await newProduct.save();
        return result.id;
    }
    async getProducts() {
        const products = await this.productModel.find().populate("user");
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price,
            user: {
                id: prod.user.id,
                name: prod.user.name,
                email: prod.user.email
            }
        }));
    }
    async getSingleProduct(productId) {
        const product = await this.findProduct(productId);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        };
    }
    async updateProduct(productId, title, desc, price) {
        const updateProduct = await this.findProduct(productId);
        if (title) {
            updateProduct.title = title;
        }
        if (desc) {
            updateProduct.description = desc;
        }
        if (price) {
            updateProduct.price = price;
        }
        return await updateProduct.save();
    }
    async deleteProduct(prodId) {
        return await this.productModel.findByIdAndDelete(prodId, { new: true });
    }
    async findProduct(id) {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find product');
        }
        if (!product) {
            throw new common_1.NotFoundException('Could not find product');
        }
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Products')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map