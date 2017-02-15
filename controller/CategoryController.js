const Category = require('../model/category');
const constant = require('../config/constant');
const async = require('async');
const Item = require('../model/item')

class CategoryController {
  getAll(req, res, next) {
    async.series({
      categories: (cb) => {
        Category.find({}, cb)
      },
      totalCount: (cb) => {
        Category.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result)
    })
  }

  getOne(req, res, next) {
    Category.findById(req.params.categoryId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.OK).send(doc)
    })
  }

  create(req, res, next) {
    Category.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `categories/${doc._id}`});
    })
  }

  update(req, res, next) {
    Category.findByIdAndUpdate(req.params.categoryId, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  delete(req, res, next) {
    const categoryId = req.params.categoryId;
    async.waterfall([
      (done) => {
        Item.findOne({categoryId}, done)
      },
      (doc, done) => {
        if (doc) {
          return done(true, null)
        }
        Category.findByIdAndRemove(categoryId, done)
      }
    ], (err, result) => {
      if (err === true) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }
}

module.exports = CategoryController;
