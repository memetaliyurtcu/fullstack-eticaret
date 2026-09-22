"use client";

import { createContext, useState, useContext, ReactNode } from "react";

//Sepetteki ürnün şeması/tipi
type CartItem = {
    id: string;
    isim: string;
    fiyat: number;
    adet: number;
};

//Hafızanın içerisinde neler olacağını deklare ediyoruz
type CartContextType = {
    sepet: CartItem[]; //Sepetteki ürünlerin listesi
    sepeteEkle: (urun: CartItem) => void;
    sepetiTemizle: () => void;
    toplamFiyat: number;
};

//Boş hafıza kutusu(context)
const CartContext = createContext<CartContextType | undefined>(undefined);

//Hafızayı tüm sisteme dağıtma
export function CartProvider({ children }: { children: ReactNode }) {
    const [sepet, setSepet] = useState<CartItem[]>([]); //Sepetin başlangıçtaki durumu

    const sepeteEkle = (yeniUrun: CartItem) => {
        setSepet((eskiSepet) => {
            // Kullanıcı bu ürünü daha önce sepete eklemiş mi
            const varOlanUrun = eskiSepet.find(urun => urun.id === yeniUrun.id);
            if (varOlanUrun) {
                return eskiSepet.map(urun =>
                    urun.id === yeniUrun.id ? { ...urun, adet: urun.adet + 1 } : urun
                );
            }
            return [...eskiSepet, { ...yeniUrun, adet: 1 }];
        });
    };

    const sepetiTemizle = () => setSepet([]);

    const toplamFiyat = sepet.reduce((toplam, urun) => toplam + (urun.fiyat * urun.adet), 0);

    return (
        <CartContext.Provider value={{ sepet, sepeteEkle, sepetiTemizle, toplamFiyat }}>
            {children}
        </CartContext.Provider>
    );
}
//İstediğimiz herhangi bir sayfa veya bileşenden sepete ulaşmamızı sağlayan hook
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart mutlaka CartProvider içinde kullanılmalıdır!");
    }
    return context;
}