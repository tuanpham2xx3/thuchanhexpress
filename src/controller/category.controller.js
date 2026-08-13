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
