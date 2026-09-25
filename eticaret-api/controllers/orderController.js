const Order = require('../models/Order');

//Yeni sipariş oluşturma
const siparisOlustur = async (req, res) => {
    try {
        const { kullanici, urunler, toplamTutar, adres } = req.body;

        //Zorunlu alanlar
        if (!kullanici || !urunler || urunler.length == 0 || !toplamTutar || !adres) {
            return res.status(400).json({ mesaj: "Lütfen adres dâhil tüm sipariş bilgilerini eksiksiz yollayın." });
        }

        //Yeni siparişi veritabanı formatında hazırlama
        const yeniSiparis = new Order({
            kullanici,
            urunler,
            toplamTutar,
            adres
        });

        await yeniSiparis.save();
        res.status(201).json({ mesaj: "Sipariş başarıyla alındı ve mutfağa iletildi!", siparis: yeniSiparis });

    } catch (error) {
        console.error("Sipariş oluşturulurken hata:", error);
        res.status(500).json({ mesaj: "Sunucu hatası, sipariş oluşturulamadı." });
    }
};

module.exports = {
    siparisOlustur
};