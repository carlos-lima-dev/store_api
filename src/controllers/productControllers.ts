import {IProduct} from "../interfaces/interfaces.js";
import ProductService from "../services/productService.js";
import FileService from "../utils/fileService.js";
import jsonFileReader from "../utils/jsonFileReader.js";
import {Request, Response} from "express";

const productsPath = "./src/data/products.json";

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    const products = await ProductService.getAll();
    return res.json(products);
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await ProductService.getOne(req.params.id);
      if (!product) {
        return res.status(404).json({error: "Product not found."});
      }
      return res.json(product);
    } catch (error) {
      console.error("Error getting product by ID:", error);
      return res.status(500).json({error: "Internal server error."});
    }
  }

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const newProduct: IProduct = await ProductService.create(
        req.body,
        req.files?.image
      );
      return res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({error: "Internal server error."});
    }
  }
  async updateProduct(req: Request, res: Response): Promise<Response> {
    const productId = req.params.id;
    try {
      const updatedProduct = await ProductService.update(
        req.body,
        productId,
        req.files?.image
      );
      if (!updatedProduct) {
        return res.status(404).json({error: "Product not found."});
      }
      return res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({error: "Internal server error."});
    }
  }
  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productId = req.params.id;
      const deletedProduct = await ProductService.delete(productId);
      if (!deletedProduct) {
        return res.status(404).json({error: "Product not found."});
      }
      return res.json(deletedProduct);
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({error: "Internal server error."});
    }
  }
}

export default new ProductController();
