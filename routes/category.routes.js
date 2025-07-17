const express = require('express');
const router = express.Router();
const { CatagoryOperations } = require('../controllers/category.controller');
const authMiddleWare = require('../middlewares/auth.middleware');

router.post('/category', authMiddleWare, CatagoryOperations.createCategory);
router.get('/category', authMiddleWare, CatagoryOperations.getAllCategories);
router.put('/category/:categoryId', authMiddleWare, CatagoryOperations.updateCategory);
router.delete('/category/:categoryId', authMiddleWare, CatagoryOperations.deleteCategory);

module.exports = router;
