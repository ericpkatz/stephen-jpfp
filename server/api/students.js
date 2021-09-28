const router = require('express').Router();
const { default: axios } = require('axios');
const { Student } = require('../db');

router.get('/', async (req, res, next) => {
  try{
    res.send( await Student.findAll() )
  }
  catch(ex){
    next(ex)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    res.send( await Student.findByPk(req.params.id) )
  }
  catch(ex){
    next(ex)
  }
})

router.post('/', async (req, res, next) => {
  try{
    res.status(201).send(await Student.create(req.body));
  } catch(error){
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try{
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.status(202).send(student);
  } catch(error){
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const student = await Student.findByPk(req.params.id);
    res.status(200).send(await student.update(req.body));
  } catch(error){
    next(error)
  }
})

module.exports = router;