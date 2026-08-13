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

