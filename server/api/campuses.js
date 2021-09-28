const router = require('express').Router();
const { Campus } = require('../db');

router.get('/', async (req, res, next) => {
  try{
    res.send( await Campus.findAll() )
  }
  catch(ex){
    next(ex)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    res.send( await Campus.findByPk(req.params.id) )
  }
  catch(ex){
    next(ex)
  }
})

router.post('/', async (req, res, next) => {
  try{
    res.status(201).send(await Campus.create(req.body));
  } catch(error){
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try{
    const campus = await Campus.findByPk(req.params.id);
    await campus.destroy();
    res.status(202).send(campus);
  } catch(error){
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const campus = await Campus.findByPk(req.params.id);
    res.status(200).send(await campus.update(req.body));
  } catch(error){
    next(error)
  }
})

module.exports = router;