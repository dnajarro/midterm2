var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

router.get('/products', function(req, res, next) {
  Product.find(function(err, products){
    if(err){ return next(err); }
    res.json(products);
  });
});

router.post('/products', function(req, res, next) {
  var prod = new Product(req.body);
  prod.save(function(err, prod){
    if(err){ return next(err); }
    res.json(prod);
  });
});

router.param('prod', function(req, res, next, id) {
  var query = Product.findById(id);
  query.exec(function (err, prod){
    if (err) { return next(err); }
    if (!prod) { return next(new Error("can't find prod")); }
    req.prod = prod;
    return next();
  });
});

router.get('/products/:prod', function(req, res) {
  res.json(req.prod);
});

router.put('/products/:prod/upvote', function(req, res, next) {
  req.prod.upvote(function(err, prod){
    if (err) { return next(err); }
    res.json(prod);
  });
});

router.delete('/products/:prod', function(req, res) {
  console.log("in Delete");
  req.prod.remove();
  res.sendStatus(200);
});
module.exports = router;
