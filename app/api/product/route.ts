import { parseIdParam } from "@/app/lib/definitions/api/api-helper";
import { ApiResponse } from "@/app/lib/definitions/api/api-response";
import { HTTP_STATUS } from "@/app/lib/definitions/api/status-codes";
import { Filters } from "@/app/lib/definitions/filters";
import { ProductPaged } from "@/app/lib/definitions/product-paged";
import {
  createProduct,
  getProduct,
  getProductsByFilters,
} from "@/app/lib/store/product-store";
import { Prisma, Product } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Product | Product[] | ProductPaged>>,
) {
  const id = parseIdParam(req.query.id);
  if (id !== null) {
    const product = await getProduct(id);
    if (!product) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(ApiResponse.error(["Product not found"]));
    }
    return res.status(HTTP_STATUS.OK).json(ApiResponse.success(product));
  }
  const { categories, brands, min, max, sortBy, page, limit } = req.query;

  const toStringArray = (val?: string | string[]) =>
    val ? (Array.isArray(val) ? val : val.split(",")) : [];

  const toNumberArray = (val?: string | string[]) => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val.map((v) => Number(v)).filter((n) => !isNaN(n));
    }
    return val
      .split(",")
      .map((v) => Number(v))
      .filter((n) => !isNaN(n));
  };

  const filters: Filters = {
    categories: toNumberArray(categories),
    brands: toStringArray(brands),
    priceMin: min ? Number(min) : 0,
    priceMax: max ? Number(max) : 1000,
    sortBy: typeof sortBy === "string" ? sortBy : "featured",
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 12,
  };

  const products = await getProductsByFilters(filters);
  return res.status(HTTP_STATUS.OK).json(ApiResponse.success(products));
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Product | Product[]>>,
) {
  const product = req.body as Prisma.ProductCreateInput;
  const createdProduct = await createProduct(product);
  return res
    .status(HTTP_STATUS.CREATED)
    .json(ApiResponse.success(createdProduct));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Product | Product[]>>,
) {
  try {
    switch (req.method) {
      case "GET":
        return await handleGet(req, res);

      case "POST":
        return await handlePost(req, res);

      default:
        return res
          .status(HTTP_STATUS.METHOD_NOT_ALLOWED)
          .json(ApiResponse.error(["Method not allowed"]));
    }
  } catch (err) {
    console.error("API error:", err);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(ApiResponse.error(["Internal server error"]));
  }
}
