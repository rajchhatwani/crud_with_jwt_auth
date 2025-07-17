// routes/service.routes.js
const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middlewares/auth.middleware');
const { ServiceOperations } = require('../controllers/service.controller');

router.post('/category/:categoryId/service', authMiddleWare, ServiceOperations.addService);
router.get('/category/:categoryId/services', authMiddleWare, ServiceOperations.getServicesByCategory);
router.delete('/category/:categoryId/service/:serviceId', authMiddleWare, ServiceOperations.deleteService);
router.put('/category/:categoryId/service/:serviceId', authMiddleWare, ServiceOperations.updateService);

module.exports = router;
