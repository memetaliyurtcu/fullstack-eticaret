const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register
exports.register = async (req, res) => {
    try {
        const { isim, email, sifre, rol } = req.body;
        const kullaniciVarMi = await User.findOne({ email });

        if (kullaniciVarMi) {
            return res.status(400).json({ mesaj: "Bu e-posta zaten kullanımda!" });
        }

        //Şifre kriptolama
        const salt = await bcrypt.genSalt(10);
        const kriptoluSifre = await bcrypt.hash(sifre, salt);

        //Kullanıcıyı veritabanına kaydetme

        const yeniKullanici = await User.create({
            isim,
            email,
            sifre: kriptoluSifre,
            rol
        });

        res.status(201).json({ mesaj: "Kullanıcı başarıyla oluşturuldu", isim: yeniKullanici.isim });
    } catch (hata) {
        res.status(500).json({ mesaj: "Kayıt olurken bir hata oluştu", detay: hata.message });
    }
};

//Login
exports.login = async (req, res) => {
    try {
        const { email, sifre } = req.body;
        const kullanici = await User.findOne({ email });

        if (!kullanici) {
            return res.status(404).json({ mesaj: "Kullanıcı bulunamadı!" });
        }

        const sifreDogruMu = await bcrypt.compare(sifre, kullanici.sifre);
        if (!sifreDogruMu) {
            return res.status(400).json({ mesaj: "Şifre hatalı!" });
        }

        const token = jwt.sign(
            { id: kullanici._id, rol: kullanici.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json({
            mesaj: "Giriş başarılı",
            token,
            kullanici: { isim: kullanici.isim, rol: kullanici.rol }
        });
    } catch (hata) {
        res.status(500).json({ mesaj: "Giriş yaparken bir hata oluştu", detay: hata.message });
    }
};