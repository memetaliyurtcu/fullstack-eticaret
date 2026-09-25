"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";


export default function SepetSayfasi() {
    const router = useRouter();
    const { sepet, toplamFiyat, sepetiTemizle } = useCart();

    const [adres, setAdres] = useState("");
    const [yukleniyor, setYukleniyor] = useState(false);
    const [hata, setHata] = useState("");

    const siparisiTamamla = async () => {

        //Kullanıcı giriş yapmış mı
        const kullaniciVerisi = localStorage.getItem("kullanici");
        if (!kullaniciVerisi) {
            alert("Sipariş verebilmek için lütfen giriş yapınız.");
            router.push("/giris")
            return;
        }

        //Adres girilmiş mi
        if (!adres || adres.trim() === "") {
            setHata("Lütfen teslimat adresini giriniz.");
            return;
        }

        const kullanici =
            JSON.parse(kullaniciVerisi);
        setHata("");
        setYukleniyor(true);

        //Verileri şablona çevirme.
        const siparisUrunleri = sepet.map((item) => ({
            urun: item.id,
            adet: item.adet
        }));


        try {
            //Siparişi backend'e atıyoruz
            const response = await fetch("http://localhost:8080/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    kullanici: kullanici._id || kullanici.id,
                    urunler: siparisUrunleri,
                    toplamTutar: toplamFiyat,
                    adres: adres
                })
            });
            const data = await response.json();
            if (response.ok) {
                // Eğer sunucu "Sipariş Alındı (201)" derse:
                alert("Siparişiniz başarıyla alındı! Bizi tercih ettiğiniz için teşekkür ederiz.");
                sepetiTemizle();
                router.push("/");
            } else {
                setHata(data.mesaj || "Sipariş oluşturulurken bir hata meydana geldi.");
            }
        } catch (error) {
            setHata("Sunucuya bağlanılamadı. Lütfen backend'in çalıştığından emin olun.");
        } finally {
            setYukleniyor(false);
        }
    };
    // 1. SENARYO: EĞER SEPET BOŞSA
    if (sepet.length === 0) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Alışveriş Sepetim</h1>
                <div className={styles.emptyCart}>
                    <h2 className={styles.emptyTitle}>Sepetiniz şu an boş 😔</h2>
                    <p className={styles.emptyDesc}>
                        Sepetinizde henüz ürün bulunmamaktadır. Harika ürünlerimizi incelemek için vitrine göz atabilirsiniz.
                    </p>
                    <Link href="/" className="btn-mor">
                        Alışverişe Başla
                    </Link>
                </div>
            </div>
        );
    }
    // 2. SENARYO: EĞER SEPET DOLUYSA
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Alışveriş Sepetim</h1>

            {/* HATA MESAJI KUTUSU */}
            {hata && (
                <div style={{ backgroundColor: "#FEE2E2", color: "red", padding: "1rem", borderRadius: "8px", marginBottom: "1rem", textAlign: "center", fontWeight: "bold" }}>
                    {hata}
                </div>
            )}

            <div className={styles.cartList}>
                {sepet.map((urun) => (
                    <div key={urun.id} className={styles.cartItem}>
                        <div className={styles.itemInfo}>
                            <h3>{urun.isim}</h3>
                            <span className={styles.itemPrice}>
                                {urun.fiyat.toLocaleString("tr-TR")} ₺
                            </span>
                        </div>
                        <div className={styles.itemQuantity}>
                            Adet: {urun.adet}
                        </div>
                    </div>
                ))}
            </div>
            {/* ADRES ALANI (KASA BÖLÜMÜNÜN HEMEN ÜSTÜ) */}
            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", marginBottom: "2rem" }}>
                <h3 style={{ marginBottom: "1rem", color: "var(--mor-koyu)" }}>Teslimat Adresi</h3>
                <textarea
                    value={adres}
                    onChange={(e) => setAdres(e.target.value)}
                    placeholder="Lütfen kargonun teslim edileceği açık adresi buraya yazın (Mahalle, Sokak, İl, İlçe vb.)"
                    style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #D1D5DB", minHeight: "100px", fontFamily: "inherit", resize: "vertical" }}
                />
            </div>
            {/* KASA BÖLÜMÜ (ÖDEME) */}
            <div className={styles.checkoutSection}>
                <div>
                    <div className={styles.totalLabel}>Ödenecek Tutar</div>
                    <div className={styles.totalAmount}>
                        {toplamFiyat.toLocaleString("tr-TR")} ₺
                    </div>
                </div>

                <button onClick={siparisiTamamla} className="btn-mor" disabled={yukleniyor}>
                    {yukleniyor ? "İşleniyor..." : "Siparişi Tamamla"}
                </button>
            </div>
        </div>
    );
}
