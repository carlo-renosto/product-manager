
import { productsModel } from "../../models/products.models.js";

export class productManagerMongo {
    constructor() {
        this.model = productsModel;
    }

    async createProduct(productInfo) {
        try {
            const product = await this.model.create(productInfo);
            return product;
        }
        catch(error) {
            console.log("Error (product.mongo.js): " + error.message);
        }
    }

    async getProducts(limit=0, page=0, query="", sort=0) {
        var products = [];

        try {
            if(limit == 0 && page == 0 && query == "" && sort == 0) { 
                products = await this.model.find().lean();
            }
            else {  
                var options = {
                    lean: true,
                    limit: limit,
                    page: page,
                };
                if(query != "") options = {...options, select: query};
                if(sort != 0) options = {...options, sort: { price: sort }};

                products = await this.model.paginate({}, options);
            }
            
            return products;
        }
        catch(error) {
            console.log("Error (product.mongo.js): " + error.message);
        }
    }

    async getProductById(id) {
        try {
            const product = await this.model.findById(id);
            if(product == null) throw new Error("PID inexistente");

            return product;
        }
        catch(error) {
            console.log("Error (product.mongo.js): " + error.message);
        }
    }

    async updateProduct(id, productInfo) {
        try {
            await this.model.findByIdAndUpdate(id, productInfo);

            const product = await this.model.findById(id);
            if(product == null) throw new Error("PID inexistente");

            return product;
        }
        catch {
            console.log("Error (product.mongo.js): " + error.message); 
        }
    }

    async deleteProduct(id) {
        try {
            const product = await this.model.findByIdAndDelete(id);
            if(product == null) throw new Error("PID inexistente");
        }
        catch {
            console.log("Error (product.mongo.js): " + error.message); 
        }
    }
}