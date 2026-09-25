const Product = require('../models/Product');

//Veritabanındaki tüm ürünleri çekme
const urunleriGetir = async (req, res) => {
    try {
        const urunler = await Product.find({});
        res.status(200).json(urunler);
    } catch (error) {
        console.error("Ürünler getirilirken hata oluştu:", error);
        res.status(500).json({ mesaj: "Sucunu hatası, ürünler getirilemedi" });
    }
};

//Yeni ürün ekleme
const urunEkle = async (req, res) => {
    try {
        //Frontend tarfından gelen verileri req.body ile alıyoruz
        const { isim, aciklama, fiyat, resim_url, kategori, stok } = req.body;

        if (!isim || !fiyat || !stok) {
            return res.status(400).json({ mesaj: "Lütfen isim, fiyat ve stok bilgilerini eksiksiz bir şekilde doldurun" });
        }
        //Yeni ürünü veritabanı formatında hazırlama
        const yeniUrun = new Product({
            isim,
            aciklama,
            fiyat,
            resim_url: resim_url || "https://via.placeholder.com/300",
            kategori,
            stok
        });
        await yeniUrun.save();

        res.status(201).json({ mesaj: "Ürün başarıyla veritabanına eklendi", urun: yeniUrun });
    } catch (error) {
        console.error("Ürün eklenirken hata oluştu:", error);
        res.status(500).json({ mesaj: "Sunucu hatası, ürün eklenemedi." });
    }
};

//İhraç
module.exports = {
    urunleriGetir,
    urunEkle
};