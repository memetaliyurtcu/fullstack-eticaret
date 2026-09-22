"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

export default function SepetSayfasi() {
    const { sepet, toplamFiyat, sepetiTemizle } = useCart();

    //Sipariş tamamlandığı zaman çalışacak olan fonksiyoon
    const siparisiTamamla = () => {
        alert("Siparişiniz başarıyla alındı!");
        sepetiTemizle();
    };

    //Sepet boşsa
    if (sepet.length === 0) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Alışveriş Sepetim</h1>

                <div className={styles.emptyCart}>
                    <h2 className={styles.emptyTitle}>Sepetiniz şu an boş 😔</h2>
                    <p className={styles.emptyDesc}>
                        Sepetinizde henüz ürün bulunmamaktadır. Harika ürünlerimizi incelemek için vitrine göz atabilirsiniz.
                    </p>

                    {/* Alışverişe dönmesi için ana sayfaya yönlendiren buton */}
                    <Link href="/" className="btn-mor">
                        Alışverişe Başla
                    </Link>
                </div>
            </div>
        );
    }

    //Sepet doluysa
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Alışveriş Sepetim</h1>

            {/* Context'den gelen ürünlerin listelendiği bölüm */}
            <div className={styles.cartList}>
                {sepet.map((urun) => (
                    <div key={urun.id} className={styles.cartItem}>
                        <div className={styles.itemInfo}>
                            <h3>{urun.isim}</h3>
                            <span className={styles.itemPrice}>
                                {urun.fiyat.toLocaleString("tr-TR")} ₺
                            </span>
                        </div>

                        {/* Ürün Adeti */}
                        <div className={styles.itemQuantity}>
                            Adet: {urun.adet}
                        </div>
                    </div>
                ))}
            </div>
            {/*Toplam Tutar ve Ödeme Butonu */}
            <div className={styles.checkoutSection}>
                <div>
                    <div className={styles.totalLabel}>Ödenecek Tutar</div>
                    <div className={styles.totalAmount}>
                        {toplamFiyat.toLocaleString("tr-TR")} ₺
                    </div>
                </div>

                <button onClick={siparisiTamamla} className="btn-mor">
                    Siparişi Tamamla
                </button>
            </div>
        </div>
    );
}