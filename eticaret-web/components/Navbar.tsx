"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
    //Context API içinden sepet bilgisini çekiyoruz
    const { sepet } = useCart();

    const sepettekiToplamUrunSayisi = sepet.reduce((toplam, urun) => toplam + urun.adet, 0);

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                E-Ticaret 🚀
            </Link>
            <div className={styles.linkContainer}>
                <Link href="/" className={styles.navLink}>Ürünler</Link>
                <Link href="/giris" className={styles.navLink}>Giriş Yap</Link>

                <Link href="/sepet" className={`btn-mor ${styles.cartButton}`}>
                    🛒 Sepet
                    {sepettekiToplamUrunSayisi > 0 && (
                        <span className={styles.cartBadge}>
                            {sepettekiToplamUrunSayisi}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );

}