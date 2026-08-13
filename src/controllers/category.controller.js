import prisma from "../lib/prisma.js";

export const createCategory = async (req, res) => {
  try {
    const { name, status } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
        status,
      },
    });

    return res.status(201).json(category);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { search } = req.query;

    const categories = await prisma.category.findMany({
      where: search
        ? {
            name: {
              contains: search,
            },
          }
        : {},
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getCategoryById = async (req, res) => {
  console.log("GET CATEGORY ID:", req.params.id);
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid category id",
      });
    }

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
