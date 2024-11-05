"use client";

import Image from "next/image";
import { NFTs } from "@/utils/types/nfts";
import { useState, useEffect } from "react";
import styles from "./Cards.module.scss";
import BlueSimble from "../../../public/img/Ellipse 770.png";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, toggleCart, removeItem, clearCart } from '@/components/Redux/cartSlice';
import { RootState } from "@/components/Redux/store";

interface ProductProps {
  data: NFTs;
}

export function Cards({ data }: ProductProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Comprar");
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isItemInCart = cartItems.some(item => item.id === data.id.toString());

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setButtonText(isItemInCart ? "Adicionado no Carrinho" : "Comprar");
  }, [isItemInCart]);

  const handleAddToCart = () => {
    if (!isItemInCart) {
      const itemToAdd = {
        id: data.id.toString(), 
        name: data.name,
        price: data.price,
        image: data.image,
        quantity: 1,
      };
      dispatch(addItem(itemToAdd));
      dispatch(toggleCart());
    } else {
      dispatch(removeItem({ id: data.id.toString() })); 
    }
  };

  return (
    <section className={styles.cardContainer}>
      <div className={styles.cardImage}>
        <Image src={data.image} alt={data.name} fill quality={100} />
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.cardTitle}>{data.name}</p>
      </div>
      <p className={styles.cardDescription}>{data.description}</p>

      <div className={styles.priceContainer}>
        <Image
          className={styles.Ellipse}
          src={BlueSimble}
          alt="símbolo preço"
          width={24}
          height={24}
        />
        <span className={styles.cardPrice}>{data.price} ETH</span>
      </div>
      <button className={styles.addToCartButton} onClick={handleAddToCart}>
        {buttonText} 
      </button>
    </section>
  );
}
