"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

/*Test Ürünleri
const SAHTE_URUNLER = [
  { id: "1", isim: "iPhone 15 Pro", fiyat: 65000, aciklama: "Apple'ın en yeni telefonu." },
  { id: "2", isim: "MacBook Air M2", fiyat: 45000, aciklama: "Hafif ve güçlü bir bilgisayar." },
  { id: "3", isim: "Sony WH-1000XM5", fiyat: 12000, aciklama: "Gürültü engelleyici üst düzey kulaklık." }
];*/

//Veritabanından gelen ürünlerin tip tanımlamaları
type Product = {
  _id: string;
  isim: string;
  aciklama: string;
  fiyat: number;
  resim_url: string;
}

export default function Home() {
  const { sepeteEkle } = useCart();
  //Hafızalar
  const [urunler, setUrunler] = useState<Product[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  //Sayfa açıldığında çalışacak kod
  useEffect(() => {
    const urunleriGetir = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();

        //Gelen verileri kaydetme
        setUrunler(data);
      } catch (error) {
        console.error("Ürünler çekilirken hata oluştu:", error);
      } finally {
        setYukleniyor(false);
      }
    };
    urunleriGetir();

  }, []);
  //Eğer veriler henüz gelmediyse ekranda ne gözükecek
  if (yukleniyor) {
    return (
      <div className={styles.container} style={{ textAlign: "center", marginTop: "5rem" }}>
        <h2>Ürünler Yükleniyor... ⏳</h2>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Yeni Nesil Alışverişe Hoş Geldiniz</h1>
        <p className={styles.subtitle}>En iyi ürünler, en uygun fiyatlarla bir tık uzağınızda.</p>
      </div>

      <div className={styles.grid}>
        {urunler.map((urun) => (
          <div key={urun._id} className={styles.card}>
            <div className={styles.imageContainer}>
              {/* Harici linklerden resim çekerken çökmemesi için normal img etiketi kullandık */}
              <img
                src={urun.resim_url}
                alt={urun.isim}
                style={{ width: "100%", height: "200px", objectFit: "contain" }} />
            </div>

            <div className={styles.cardContent}>
              <h2 className={styles.productTitle}>{urun.isim}</h2>
              <p className={styles.productDesc}>{urun.aciklama}</p>
              <div className={styles.priceContainer}>
                <span className={styles.price}>{urun.fiyat.toLocaleString("tr-TR")} ₺</span>
                <button
                  className={styles.button}
                  onClick={() => sepeteEkle({
                    id: urun._id,
                    isim: urun.isim,
                    fiyat: urun.fiyat,
                    adet: 1
                  })}>
                  Sepete Ekle
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}