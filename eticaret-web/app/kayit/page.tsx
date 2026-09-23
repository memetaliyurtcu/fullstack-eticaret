"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function KayitSayfasi() {
    const router = useRouter();

    //Formdaki bilgileri tutan hafızalar
    const [isim, setIsim] = useState("");
    const [email, setEmail] = useState("");
    const [sifre, setSifre] = useState("");

    const [hata, setHata] = useState("");
    const [yukleniyor, setYukleniyor] = useState(false);

    const kayitOl = async (e: React.FormEvent) => {
        e.preventDefault();
        setHata("");
        setYukleniyor(true);

        try {
            //Backende post isteği atıyoruz
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({ isim, email, sifre }),
            });

            //Gelen cevabı paketten çıkarıyoruz
            const data = await response.json();

            if (response.ok) {
                alert("Kayıt başarılı. Giriş sayfasına yönlendiriliyorsunuz.");
                router.push("/giris");
            } else {
                setHata(data.mesaj || "Kayıt olunurken bir hata oluştu");
            }

        } catch (error) {
            setHata("Sunucuya Bağlanılamadı.")
        } finally {
            setYukleniyor(false)
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Kayıt Ol</h1>

            {/* Eğer hata varsa Kırmızı Uyarı kutusunu göster */}
            {hata && <div className={styles.error}>{hata}</div>}
            {/* onSubmit: Formun içindeki herhangi bir butona tıklanınca kayitOl algoritmasını çalıştırır */}
            <form onSubmit={kayitOl}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>İsim Soyisim</label>
                    <input
                        type="text"
                        required
                        className={styles.input}
                        placeholder="Örn: Ali Yılmaz"
                        value={isim}
                        onChange={(e) => setIsim(e.target.value)} // Klavyeye her basıldığında hafızaya kaydet
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>E-Posta Adresi</label>
                    <input
                        type="email"
                        required
                        className={styles.input}
                        placeholder="ornek@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Şifre</label>
                    <input
                        type="password"
                        required
                        className={styles.input}
                        placeholder="En az 6 karakter"
                        value={sifre}
                        onChange={(e) => setSifre(e.target.value)}
                    />
                </div>
                {/* Eğer yükleniyorsa butonu kilitle (disabled) */}
                <button type="submit" className="btn-mor" style={{ width: "100%", marginTop: "1rem" }} disabled={yukleniyor}>
                    {yukleniyor ? "Kaydediliyor..." : "Hesap Oluştur"}
                </button>
            </form>
            <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem" }}>
                Zaten hesabın var mı? <Link href="/giris" style={{ color: "var(--mor-acik)", fontWeight: "bold" }}>Giriş Yap</Link>
            </div>
        </div>
    );
}