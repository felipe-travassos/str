'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

<<<<<<< HEAD
exports.get = (req, res, next) => {
    Product
        .find({ active: true }, 'title price slug')
        .then(data => {
            res.status(201).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    Product
=======
exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product
>>>>>>> 25ac6cde0bec30c796b76afb2a8efe49a21e66a3
        .save()
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto!',
                data: e
            });
        });
};
exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
}
exports.delete = (req, res, next) => {
    res.status(200).send(req.body)
}