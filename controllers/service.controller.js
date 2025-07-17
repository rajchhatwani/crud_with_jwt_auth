const { Category, Service, ServicePriceOption } = require('../models');
const { SERVICE_TYPES, PRICE_OPTION_TYPES } = require('../constants');

const ServiceOperations = {};

ServiceOperations.getServicesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findByPk(categoryId, {
            include: {
                model: Service,
                include: ServicePriceOption,
            },
        });

        if (!category) return res.status(404).json({ error: 'Category not found' });

        res.json(category.Services);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

ServiceOperations.addService = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, type, priceOptions } = req.body;

        if (!SERVICE_TYPES.includes(type)) {
            return res.status(400).json({ error: 'Invalid service type' });
        }

        const category = await Category.findByPk(categoryId);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        const newService = await Service.create({ name, type, categoryId });

        if (Array.isArray(priceOptions)) {
            for (const option of priceOptions) {
                const { duration, price, type } = option;
                if (!PRICE_OPTION_TYPES.includes(type)) continue;

                await ServicePriceOption.create({
                    duration,
                    price,
                    type,
                    serviceId: newService.id,
                });
            }
        }

        const serviceWithOptions = await Service.findByPk(newService.id, {
            include: ServicePriceOption,
        });

        res.status(201).json(serviceWithOptions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

ServiceOperations.updateService = async (req, res) => {
    try {
        const { categoryId, serviceId } = req.params;
        const { name, type, priceOptions } = req.body;

        const service = await Service.findOne({ where: { id: serviceId, categoryId } });
        if (!service) return res.status(404).json({ error: 'Service not found' });

        if (name) service.name = name;
        if (type && SERVICE_TYPES.includes(type)) service.type = type;

        await service.save();

        if (Array.isArray(priceOptions)) {
            // Clear old options and add new
            await ServicePriceOption.destroy({ where: { serviceId } });

            for (const option of priceOptions) {
                const { duration, price, type } = option;
                if (!PRICE_OPTION_TYPES.includes(type)) continue;

                await ServicePriceOption.create({ duration, price, type, serviceId });
            }
        }

        const updated = await Service.findByPk(serviceId, {
            include: ServicePriceOption,
        });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

ServiceOperations.deleteService = async (req, res) => {
    try {
        const { categoryId, serviceId } = req.params;

        const service = await Service.findOne({
            where: { id: serviceId, categoryId },
        });

        if (!service) return res.status(404).json({ error: 'Service not found' });

        await ServicePriceOption.destroy({ where: { serviceId } });
        await service.destroy();

        res.json({ message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    ServiceOperations
};