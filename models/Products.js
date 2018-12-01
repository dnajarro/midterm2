var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  name: String,
  quantity: {type: Number, default: 0},
  price: Number,
});
ProductSchema.methods.upvote = function(cb) {
  this.quantity += 1;
  this.save(cb);
};
mongoose.model('Product', ProductSchema);
