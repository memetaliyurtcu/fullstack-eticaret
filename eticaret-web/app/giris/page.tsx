"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function GirisSayfası() {
    const router = useRouter();

    //Formdaki bilgeleri tutacağımız hafızalar
    const [email, setEmail] = useState("");
    const [sifre, setSifre] = useState("");

    const [hata, setHata] = useState("");
    const [yukleniyor, setYukleniyor] = useState(false);

    const girisYap = async (e: React.FormEvent) => {
        e.preventDefault();
        setHata("");
        setYukleniyor(true);

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ email, sifre }),
            });
            const data = await response.json();

            if (response.ok) {
                //Sunucu tarafından gelen jwt'yi LocalStroge'a kaydediyoruz
                localStorage.setItem("token", data.token);

                localStorage.setItem("kullanici", JSON.stringify(data.kullanici));

                alert(`Giriş başarılı. Hoş geldin, ${data.kullanici.isim}!`);
                router.push("/")
            } else {
                setHata(data.mesaj || "Giriş başarısız.")
            }
        } catch (error) {
            setHata("Sunucuya bağlanılamadı.")
        } finally {
            setYukleniyor(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Giriş Yap</h1>

            {hata && <div className={styles.error}>{hata}</div>}
            <form onSubmit={girisYap}>
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
                        placeholder="Şifrenizi girin"
                        value={sifre}
                        onChange={(e) => setSifre(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-mor" style={{ width: "100%", marginTop: "1rem" }} disabled={yukleniyor}>
                    {yukleniyor ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </button>
            </form>
            <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem" }}>
                Hesabın yok mu? <Link href="/kayit" style={{ color: "var(--mor-acik)", fontWeight: "bold" }}>Kayıt Ol</Link>
            </div>
        </div>
    );
}