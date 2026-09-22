const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    kullanici: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' //ID' nin hangi tabloya ait olduğunu bildiriyoruz
    },
    urunler: [
        {
            urun: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            adet: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    toplamTutar: {
        type: Number,
        required: true
    },
    adres: {
        type: String,
        required: [true, "Lütfen teslimat adresi giriniz"]
    },
    durum: {
        type: String,
        enum: ['Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi', 'İptal Edildi'],
        default: 'Hazırlanıyor'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);