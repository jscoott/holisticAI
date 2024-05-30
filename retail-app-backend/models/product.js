const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type:String, required: true },
    price: { type:Number, required: true },
    status: { type:String, required: true},
    createdAt: {type:Date, default: Date.now}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
