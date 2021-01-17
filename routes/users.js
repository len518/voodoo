const express = require('express');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/usersModel');

const router = express.Router();

router.get('/:id', async (req, res, _next) => {
  const user = await User.get(req.params.id);
  return res.json(user);
});

router.post('/', async (req, res, _next) => {
  const userData = req.body;
  userData.id = uuidv4();
  const user = await User.create(userData);
  return res.json(user);
});

router.put('/', async (req, res, _next) => {
  const user = await User.update(req.body);
  return res.json(user);
});

router.delete('/:id', async (req, res, _next) => {
  await User.delete(req.params.id);
  return res.json({ msg: `Deleted ${req.params.id}` });
});

module.exports = router;
