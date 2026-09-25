const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

//Ürünleri görüntüleme
router.get('/', productController.urunleriGetir);

//Yeni ürün ekleme isteği
router.post('/', productController.urunEkle);

module.exports = router;