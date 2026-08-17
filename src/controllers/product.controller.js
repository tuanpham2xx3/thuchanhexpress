import prisma from "../lib/prisma.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, categoryIds } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (price === undefined || Number(price) < 0) {
      return res.status(400).json({
        message: "Invalid price",
      });
    }

    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return res.status(400).json({
        message: "categoryIds is required",
      });
    }

    // Kiểm tra các category có tồn tại không
    const categories = await prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    if (categories.length !== categoryIds.length) {
      return res.status(400).json({
        message: "One or more categories do not exist",
      });
    }

    // Tạo product + quan hệ N-N
    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),

        categories: {
          create: categoryIds.map((categoryId) => ({
            category: {
              connect: {
                id: categoryId,
              },
            },
          })),
        },
      },

      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const where = search
      ? {
          name: {
            contains: search,
          },
        }
      : {};

    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    const total = await prisma.product.count({
      where,
    });

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid product id",
      });
    }

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
