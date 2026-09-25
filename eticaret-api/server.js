const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const PORT = 8080;

//Güvenlik ve JSON veri okuma
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const orderRoutes =
    require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);


//Veritabanı bağlantısı
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB veritabanına başarıyla bağlanıldı."))
    .catch((hata) => console.log("Veritabanı bağlantı hatası, hata:", hata));


//TEST
app.get('/', (req, res) => {
    res.send("E-Ticaret API Çalışıyor");
});

//Sunucuyu Başlat
app.listen(PORT, () => {
    console.log(`E-Ticaret Backend http://localhost:${PORT} portunda ayakta!`);
});