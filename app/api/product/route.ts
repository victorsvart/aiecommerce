import { parseIdParam } from "@/app/lib/definitions/api/api-helper";
import { ApiResponse } from "@/app/lib/definitions/api/api-response";
import { HTTP_STATUS } from "@/app/lib/definitions/api/status-codes";
import { createProduct, getProduct, getProducts } from "@/app/lib/store/product-store";
import { Prisma, Product } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handleGet(req: NextApiRequest, res: NextApiResponse<ApiResponse<Product | Product[]>>) {
  const id = parseIdParam(req.query.id);
  if (id !== null) {
    const product = await getProduct(id);
    if (!product) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(["Product not found"]));
    }
    return res.status(HTTP_STATUS.OK).json(ApiResponse.success(product));
  }

  const products = await getProducts();
  return res.status(HTTP_STATUS.OK).json(ApiResponse.success(products));
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<ApiResponse<Product | Product[]>>) {
  const product = req.body as Prisma.ProductCreateInput;
  const createdProduct = await createProduct(product);
  return res.status(HTTP_STATUS.CREATED).json(ApiResponse.success(createdProduct)); }

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
        return res.status(HTTP_STATUS.METHOD_NOT_ALLOWED).json(ApiResponse.error(["Method not allowed"]));
    }
  } catch (err) {
    console.error("API error:", err);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(["Internal server error"]));
  }
}

