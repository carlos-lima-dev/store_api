import {IProduct} from "../interfaces/interfaces.js";
import fileService from "../utils/fileService.js";
import jsonFileReader from "../utils/jsonFileReader.js";
import productModel from "../models/productModel.js";

const productsPath = "./src/data/products.json";

class ProductService {
  async getAll() {
    return await productModel.find();
  }

  async getOne(productId: string) {
    return await productModel.findById(productId);
  }

  async create(productData: any, imageFile: any): Promise<IProduct> {
    try {
      const {title, price, description, category} = productData;

      let image = "default-product.png";
      if (imageFile) {
        image = await fileService.save(imageFile);
      }

      const newProductData: any = {
        title,
        price,
        description,
        category,
        image,
      };

      const newProduct = await productModel.create(newProductData);

      return newProduct.toObject() as IProduct;
    } catch (error) {
      throw error;
    }
  }

  async update(
    productData: any,
    productId: string,
    productImage: any
  ): Promise<IProduct | undefined> {
    try {
      const {title, price, description, category} = productData;

      // Encontre o produto pelo ID
      let updatedProduct = await productModel.findById(productId);

      if (!updatedProduct) {
        // Se o produto não existir, retorne undefined
        return undefined;
      }

      // Atualize os campos do produto
      updatedProduct.title = title;
      updatedProduct.price = price;
      updatedProduct.description = description;
      updatedProduct.category = category;

      // Atualize a imagem somente se uma nova imagem for fornecida
      if (productImage) {
        // Exclua a imagem existente se não for a imagem padrão
        if (updatedProduct.image !== "default.png") {
          await fileService.delete(updatedProduct.image);
        }
        // Salve a nova imagem e atualize o caminho da imagem no produto
        updatedProduct.image = await fileService.save(productImage);
      }

      // Salve as alterações no banco de dados
      await updatedProduct.save();

      return updatedProduct.toObject();
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
  async delete(productId: string): Promise<IProduct | undefined> {
    try {
      // Find the product by ID and delete it
      const deletedProduct = await productModel.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return undefined;
      }

      // Delete the associated image from the server if it's not the default image
      if (deletedProduct.image !== "default-product.png") {
        await fileService.delete(deletedProduct.image);
      }

      return deletedProduct.toObject(); // Convert the deleted document to a JavaScript object
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error; // Reject the error so that the controller can handle it
    }
  }
}
export default new ProductService();
