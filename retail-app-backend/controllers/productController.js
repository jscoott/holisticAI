const Product = require('../models/product');

exports.listActiveProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: 'active'}).sort({createdAt: -1});
        res.json(products);
    } catch(err){
        res.status(500).json({error: err.message });
    }
}

exports.searchProducts = async (req, res) => {
    try {
        const { productName, minPrice, maxPrice, minPostedDate, maxPostedDate } = req.query;

        let filters = {};

        if (productName){
            filters.name = { $regex: productName, $options: 'i'};
        }
        if (minPrice){
            filters.price = { $gte: parseFloat(minPrice)};
        }
        if(maxPrice){
            filters.price = { ...filters.price, $lte: parseFloat(maxPrice)};
        }
        if(minPostedDate){
            filters.createdAt = {$gte: new Date(minPostedDate)};
        }
        if(maxPostedDate){
            filters.createdAt = { ...filters.createdAt, $lte: new Date(maxPostedDate)};
        }

        const products = await Product.find(filters);
        res.json(products);
    }
    catch (err){
        res.status(500).json({error: err.message });
    }
}

exports.createProduct = async (req, res) => {
    try{
        const {name, price, status} = req.body;

        console.log(req.body);

        if(price > 10000){
            return res.status(400).json({error: 'Price must not exceed $10,000'});
        }

        const newProduct = new Product({name, price, status});

        if(price > 5000){
            newProduct.status = "pending_approval";
        }

        await newProduct.save();

        res.status(201).json(newProduct);
    }
    catch (err) {
        res.status(500).json({error: err.message });        
    }
}