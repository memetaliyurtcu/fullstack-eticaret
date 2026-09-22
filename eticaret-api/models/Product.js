const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    isim: {
        type: String,
        required: [true, "Lütfen ürün ismini giriniz"],
        trim: true
    },
    aciklama: {
        type: String,
        required: [true, "Lütfen ürün açıklaması giriniz"]
    },
    fiyat: {
        type: Number,
        required: [true, "Lütfen ürün açıklaması giriniz"],
        min: [0, "Ürün fiyatı 0 dan küçük olamaz!"]
    },
    kategori: {
        type: String,
        required: [true, "Lütfen ürün kategorisini giriniz"],
        enum: ['Elektronik', 'Giyim', 'Ev', 'Kozmetik', 'Diğer']
    },
    stok: {
        type: Number,
        required: [true, "Lütfen stok miktarını giriniz"],
        min: [0, "Stok sıfırdan küçük olamaz"],
        default: 1
    },
    resim_url: {
        type: String,
        required: [true, "Lütfen ürün resmi için bir URL ekleyiniz"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
