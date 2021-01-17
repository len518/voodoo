const express = require('express');
const { v4: uuidv4 } = require('uuid');

const IAP = require('../models/inAppPurchasesModel');
const User = require('../models/usersModel');

const router = express.Router();

// updating the currencies array of the player, if the currency is found we add to that currency
// otherwise we push the new currency to the currencies list
const getUpdatedCurrencies = (currencies, newCurrency) => {
  let updatedCurrencies = currencies;
  const currency = currencies.find((el) => el.id === newCurrency.id);
  if (currency) {
    currency.quantity += newCurrency.quantity;
    const notUpdatedCurrencies = currencies.filter((el) => el.id !== newCurrency.id);
    notUpdatedCurrencies.push(currency);
    updatedCurrencies = notUpdatedCurrencies;
  } else {
    currencies.push(newCurrency);
    updatedCurrencies = currencies;
  }
  return updatedCurrencies;
};

const updateUser = async (userId, currency) => {
  const user = await User.get(userId);
  delete user.updatedAt;
  delete user.createdAt;
  user.currencies = getUpdatedCurrencies(user.currencies, currency);
  await User.update(user);
};

router.get('/user/:id', async (req, res, _next) => {
  const iapsByUser = await IAP.query('userId').eq(req.params.id).exec();
  return res.json(iapsByUser);
});

router.get('/:id', async (req, res, _next) => {
  const iap = await IAP.get(req.params.id);
  return res.json(iap);
});

router.post('/', async (req, res, _next) => {
  try {
    const iapData = req.body;
    iapData.id = uuidv4();
    const createdIap = await IAP.create(iapData);
    await updateUser(createdIap.userId, createdIap.currency);
    return res.json(createdIap);
  } catch (error) {
    return res.send(error);
  }
});

router.delete('/:id', async (req, res, _next) => {
  try {
    const iap = await IAP.get(req.params.id);
    iap.deleted = true;
    delete iap.updatedAt;
    delete iap.createdAt;
    await IAP.update(iap);
    await updateUser(iap.userId, { id: iap.currency.id, quantity: iap.currency.quantity * -1 });
    return res.json({ msg: `Deleted ${req.params.id}` });
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
