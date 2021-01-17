const dynamoose = require('dynamoose');

const user = new dynamoose.Schema({
  id: String,
  playerLevel: Number,
  selectedHero: String,
  talentUpgradeCount: Number,
  lastChapterSelected: String,
  lastChapterIndex: Number,
  lastDificultyIndex: Number,
  lastEnergyTimestamp: String,
  lastCommonChestTimeStamp: String,
  lastRareChestTimeStamp: String,
  playCount: Number,
  sessionCount: Number,
  lastEndlessFloorCompleted: Number,
  currencies: {
    type: Array,
    schema: {
      id: String,
      quantity: Number,
    },
  },
  talents: {
    type: Array,
    schema: {
      talentId: String,
      level: Number,
    },
  },
  heroes: {
    type: Array,
    schema: {
      id: String,
      heroId: String,
      level: Number,
    },
  },
}, {
  saveUnknown: true,
  timestamps: true,
});
module.exports = dynamoose.model('User', user);
