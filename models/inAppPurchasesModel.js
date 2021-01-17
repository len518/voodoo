const dynamoose = require('dynamoose');

const inAppPurchase = new dynamoose.Schema({
  id: String,
  currency: {
    type: Object,
    schema: {
      id: String,
      quantity: {
        type: Number,
        enum: [5, 10, 15],
      },
    },
  },
  userId: {
    type: String,
    index: {
      name: 'userIndex',
      global: true,
    },
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  saveUnknown: true,
  timestamps: true,
});
module.exports = dynamoose.model('inAppPurchase', inAppPurchase);
