'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// Metodo para GET básico - SELECT
exports.get = async() => {
    const res = await Product.find({
        active: true
    }, 'title price slug');
    return res;
}

// Metodo para buscar por SLUG - SELECT
exports.getBySlug = async(slug) => {
    const res = await Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description price slug tags');
    return res;
}

// Metodo para buscar  por TAG
exports.getById = async(id) => {
    const res = await Product
        .findById(id);
    return res;
}

// Metodo para buscar por ID
exports.getByTag = async(tag) => {
    const res = Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags');
    return res;
}

// Metodo para adicionar um registro - INSERT
exports.create = async(data) => {
    var product = new Product(data);
    await product.save();
}

// Metodo para Alterar - UPDATE
exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });
}

// Metodo para deletar do banco Mongo - DELETE
exports.delete = async(id) => {
    await Product
        .findOneAndRemove(id);
}