'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

// Metodo para GET básico - SELECT
exports.get = (req, res, next) => {
    Product
        .find({ active: true }, 'title price slug tags')
        .then(data => {
            res.status(201).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

// Metodo para buscar por SLUG - SELECT
exports.getBySlug = (req, res, next) => {
    Product
        .findOne({
            slug: req.params.slug,
            active: true
        }, 'title description price slug tags')
        .then(data => {
            res.status(201).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}
// Metodo para buscar  por TAG
exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag,
            active: true
        }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

// Metodo para buscar por ID
exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(201).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

// Metodo para adicionar um registro - INSERT
exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres! :(');
    contract.hasMinLen(req.body.slug, 3, 'O Slug deve conter pelo menos 3 caracteres! :(');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres! :(');

    // Se os dados forem válidos:
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    var product = new Product(req.body);
    product
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

// Metodo para Alterar - UPDATE
exports.put = (req, res, next) => {
    Product
        .findAndModify(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }
        }).then(x => {
            res.status(201).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar o produto!',
                data: e
            });
        });
};


// Metodo para deletar do banco Mongo - DELETE
exports.delete = (req, res, next) => {
    Product
        .findByIdAndDelete(req.body.id)
        .then(x => {
            res.status(201).send({
                message: 'Produto removido com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto!',
                data: e
            });
        });
}