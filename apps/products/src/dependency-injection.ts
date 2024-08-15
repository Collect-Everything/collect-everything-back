import { PrismaCategoryRepository } from "./core/adapters/category.prisma.repository";
import { PrismaProductRepository } from "./core/adapters/product.prisma.repository";
import { RealIDProvider } from "./core/adapters/real-id-provider";
import { CreateCategoryUseCase } from "./core/use-cases/create-category/create-category.usecase";
import { CreateProductUseCase } from "./core/use-cases/create-product/create-product.usecase";
import { DeleteProductUseCase } from "./core/use-cases/delete-product/delete-product.usecase";
import { GetProductUseCase } from "./core/use-cases/get-product/get-product.usecase";
import { ListProductsUseCase } from "./core/use-cases/list-products/list-products.usecase";
import { UpdateProductUseCase } from "./core/use-cases/update-product/update-product.usecase";
import { client } from "./lib/db";
import { ProductsController } from "./products.controller";
import { ProductsRouter } from "./products.router";

const productRepository = new PrismaProductRepository(client);
const categoryRepository = new PrismaCategoryRepository(client);

const idProvider = new RealIDProvider();

const createCategoryUseCase = new CreateCategoryUseCase(
  categoryRepository,
  idProvider,
);
const createProductUseCase = new CreateProductUseCase(
  productRepository,
  categoryRepository,
  idProvider,
);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const getProductUseCase = new GetProductUseCase(productRepository);
const listProductsUseCase = new ListProductsUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
export const productsController = new ProductsController(
  createCategoryUseCase,
  createProductUseCase,
  listProductsUseCase,
  getProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
);

const productsRouter = new ProductsRouter(productsController).router;

export { productsRouter };
