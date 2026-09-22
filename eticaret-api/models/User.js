const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    isim: {
        type: String,
        required: [true, "Lütfen isminizi giriniz"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Lütfen e-posta adresinizi giriniz"],
        unique: true, //Aynı e posta ile iki kayıt yapılamaz
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Lütfen geçerli bir e-posta adresi giriniz"]
    },
    sifre: {
        type: String,
        required: [true, "Lütfen şifrenizi giriniz"],
        minlength: [6, "Şifreniz en az 6 karakter olmalıdır"]
    },
    rol: {
        type: String,
        enum: ['musteri', 'admin'],
        default: 'musteri'
    }

}, { timestamps: true }) //Kullanıcının ne zaman kayıt olduğunu kaydeder.

module.exports = mongoose.model('user', userSchema);