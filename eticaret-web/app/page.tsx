"use client";

import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

//Test Ürünleri
const SAHTE_URUNLER = [
  { id: "1", isim: "iPhone 15 Pro", fiyat: 65000, aciklama: "Apple'ın en yeni telefonu." },
  { id: "2", isim: "MacBook Air M2", fiyat: 45000, aciklama: "Hafif ve güçlü bir bilgisayar." },
  { id: "3", isim: "Sony WH-1000XM5", fiyat: 12000, aciklama: "Gürültü engelleyici üst düzey kulaklık." }
];

export default function Home() {
  const { sepeteEkle } = useCart();
  return (
    <div>
      <h1 className={styles.pageTitle}>En Çok Satan Ürünler</h1>

      <div className={styles.productGrid}>
        {/* MAP döngüsü ile sahte dizideki ürünleri tek tek ekrana basıyoruz */}
        {SAHTE_URUNLER.map((urun) => (
          <div key={urun.id} className={styles.productCard}>
            <div>
              <h2 className={styles.productName}>{urun.isim}</h2>
              <p className={styles.productDesc}>{urun.aciklama}</p>
            </div>

            <div className={styles.productFooter}>
              {/* Sayıyı daha güzel okumak için toLocaleString kullanıyoruz */}
              <span className={styles.productPrice}>
                {urun.fiyat.toLocaleString("tr-TR")} ₺
              </span>

              <button
                onClick={() => sepeteEkle({ ...urun, adet: 1 })}
                className="btn-mor">
                Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}