const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    console.log('tag get route hit');
    try {
        const tags = await Tag.findAll();
        res.send(tags);
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    console.log('tag get by id route hit');
    try {
        const id_tag = await Tag.findOne({
            where: { id: req.params.id },
            include: Product,
        });
        console.log(id_tag);
        res.send(id_tag);
    } catch (err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    // create a new tag
    console.log('tag post route hit');
    try {
        const newTag = await Tag.create({
            tag_name: req.body.tag_name,
        });
        res.send(newTag);
    } catch (err) {
        res.json({
            message: 'Couldnt make that tag for some reason',
            error: err,
        });
    }
});

router.put('/:id', async (req, res) => {
    // update a tag's name by its `id` value
    console.log('tag put route hit');
    try {
        const updateTag = await Tag.findByPk(req.params.id);
        const updated = await updateTag.update({
            tag_name: `${req.body.tag_name}`,
        });
        res.send(updated);
    } catch (err) {
        res.send({ message: 'couldnt update that tag', error: err });
    }
});

router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    console.log('tag delete route hit');
    try {
        const deleteTag = await Tag.destroy({ where: { id: req.params.id } });
        res.send({ message: 'tag deleted' });
    } catch (err) {
        res.send({ message: 'tag couldnt be deleted', error: err });
    }
});

module.exports = router;
