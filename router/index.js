const items = require('./routers/items');

module.exports = (app) => {
  app.use('/items', items);
}