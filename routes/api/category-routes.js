const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const categories = await Category.findAll({ include: Product });
        res.send(categories);
    } catch (err) {
        if (err) throw err;
        res.send({ message: 'couldnt get categories', error: err });
    }
});

router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const id_cat = await Category.findByPk(req.params.id, {
            include: Product,
        });
        if (id_cat !== null) {
            res.send(id_cat);
        } else {
            res.status(404).send({
                message: `couldnt find a category with id of ${req.params.id}`,
            });
        }
    } catch (err) {
        res.send({ message: 'couldnt get categories by id', error: err });
    }
});

router.post('/', async (req, res) => {
    // create a new category
    try {
        const new_cat = await Category.create({
            category_name: req.body.category_name,
        });
        res.status(200).send(new_cat);
    } catch (err) {
        res.status(500).send({
            message: `couldnt create category ${req.body.category_name}`,
            error: err,
        });
    }
});

router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    try {
        const updateCat = await Category.findByPk(req.params.id);
        const old_cat = updateCat.category_name;
        const updated = await updateCat.update({
            category_name: req.body.category_name,
        });
        res.send({
            id: updated.id,
            name: { old: old_cat, new: updated.category_name },
        });
    } catch (err) {
        res.status(500).send({
            message: `couldnt update category with id ${req.params.id}`,
            error: err,
        });
    }
});

router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
        const deleteCat = await Category.findByPk(req.params.id);
        console.log(deleteCat);
        await Category.destroy({
            where: { id: req.params.id },
        });
        res.send({
            message: `${deleteCat.category_name} deleted from categories`,
        });
    } catch (err) {
        res.status(500).send({
            message: `couldnt delete category with id of ${req.params.id}`,
        });
    }
});

module.exports = router;
