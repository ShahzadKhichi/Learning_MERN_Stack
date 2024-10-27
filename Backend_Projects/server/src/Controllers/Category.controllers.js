const Category = require("../Models/category.model");

const createCategory = async (req, res) => {
    try {

        //fetching data from req body

        const { name, description } = req.body;

        //validation
        if (!name || !description) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        //creating new Category
        const newCategory = await Category.create({ name, description });

        //sending response
        return res.status(200).json({
            success: true,
            message: "Category created Successfully",
            newCategory,
        })

    } catch (error) {

        //handling error
        return res.status(500).json({
            success: false,
            message: "Category Creation failed please try again",
        })

    }
}

//getAllCategorys Handler function

const showAllCategory = async (req, res) => {
    try {

        //get all Category from database
        const allCategorys = await Category.find({}, { name: true, description: true });

        //send all Categorys in responsse
        return res.status(200).json({
            success: true,
            message: "All Categorys returned successfully",
            allCategorys,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Failed to get all Categorys. Please try again",
        })

    }
}

const categoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        const { categoryId } = req.body;

        //validation
        if (!categoryId) {
            return res.status(404).json({
                success: false,
                message: "Inalid category Id ",
            })
        }
        //get courses for specified categoryId



        const selectCategory = await Category.findById(categoryId).populate("courses").exec();



        if (!selectCategory) {
            return res.status(404).json({
                success: false,
                message: "Data Not found"
            })
        }

        const differentCategories = await Category.find({
            _id: { $ne: categoryId }
        }).populate("courses");

        res.status(200).json({
            success: false,
            data: {
                selectCategory,
                differentCategories
            }
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "failed to get categories data"
        })

    }
}
module.exports = { createCategory, showAllCategory, categoryPageDetails };