
import { productsService } from "../repository/index.js";
import { socket_server } from "../app.js";

export class productsController {
    static getProducts = async(request, response) => {
        try {
            const limit = request.query.limit == undefined ? 10 : parseInt(request.query.limit);
            const page = request.query.page == undefined ? 1 : parseInt(request.query.page);
            const query = request.query.query == undefined ? "" : request.query.query;
            const sort = request.query.sort == undefined ? 0 : parseInt(request.query.sort);
    
            var products = await productsService.getProducts(limit, page, query, sort);
                    
            response.json({status: "success", data: products});
        }
        catch(error) {
            response.json({status: "error", message: "Productos no obtenidos (error)"});
        }
    };

    static getProductsView = async(request, response) => {
        try {
            const products = await productsService.getProducts(10, 1);

            const object = {
                products: products,
                email: request.user.email,
                role: request.user.role
            }

            response.render("products", {object});
        }
        catch(error) {
            response.render("products");
        }
    }

    static getProductById = async(request, response) => {
        try {
            const id = request.params.pid;
    
            const product = await productsService.getProductById(id);
            response.json({status: "success", data: product});
        }
        catch(error) {
            response.json({status: "error", message: "Producto no obtenido (error)"});
        }
    };

    static createProduct = async(request, response) => {
        try {
            const productInfo = request.body;
            const productCreated = await productsService.createProduct(productInfo)
    
            socket_products.emit("product-add", productCreated);
    
            response.json({status: "success", data: productCreated});
        }
        catch(error) {
            response.json({status: "error", message: "Producto no agregado (error)"});
        }
    };

    static updateProduct = async(request, response) => {
        try {
            const id = request.params.pid;
            const productInfo = request.body;
    
            const productUpdated = await productsService.updateProduct(id, productInfo);
    
            socket_server.emit("product-update", productUpdated);
    
            response.json({status: "success", data: productUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Producto no actualizado (error)"});
        }
    };

    static deleteProduct = async(request, response) => {
        try {
            const id = request.params.pid;
    
            await service.deleteProduct(id);
    
            socket_server.emit("product-delete", id);
    
            response.json({status: "success", pid: id});
        }
        catch(error) {
            response.json({status: "error", message: "Producto no eliminado (error)"});
        }    
    };
}