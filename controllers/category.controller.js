const Category = require('../models/catagory.model');
const Service = require('../models/service.model'); // to check dependency

const CatagoryOperations = {};
// Create category (Admin only)
CatagoryOperations.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: 'Name is required' });

        const exists = await Category.findOne({ where: { name } });
        if (exists) return res.status(409).json({ message: 'Category already exists' });

        const category = await Category.create({ name });
        res.status(201).json({ message: 'Category created', category });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all categories (public)
CatagoryOperations.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json({ categories });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update category
CatagoryOperations.updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: 'Name is required' });

        const category = await Category.findByPk(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        // Optional: prevent duplicate names
        const duplicate = await Category.findOne({ where: { name } });
        if (duplicate && duplicate.id != categoryId) {
            return res.status(409).json({ message: 'Category name already exists' });
        }

        category.name = name;
        await category.save();

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete empty category (no services)
CatagoryOperations.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findByPk(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        const services = await Service.findAll({ where: { categoryId } });
        if (services.length > 0) {
            return res.status(400).json({ message: 'Cannot delete category with services' });
        }

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    CatagoryOperations
};
