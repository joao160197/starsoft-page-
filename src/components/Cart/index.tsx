"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toggleCart,addItem,removeItem,clearCart,} from "@/components/Redux/cartSlice";
import styles from "./Cart.module.scss";
import { CartItem } from "@/utils/types/cartItem";
import { RootState } from "@/components/Redux/store";
import { GoArrowLeft } from "react-icons/go";
import BlueSimble from "../../../public/img/Ellipse 770.png";
import Delete from "../../../public/img/Delete.png";
import Image from "next/image";
import { motion } from "framer-motion";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, isOpen, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const [finalized, setFinalized] = useState(false);

  const handleRemove = (id: string) => {
    dispatch(removeItem({ id }));
  };

  const handleAdd = (item: CartItem) => {
    dispatch(addItem(item));
  };

  const handleClearItem = (id: string) => {
    const itemToClear = items.find((item) => item.id === id);
    if (itemToClear) {
      for (let i = 0; i < itemToClear.quantity; i++) {
        dispatch(removeItem({ id }));
      }
    }
  };

  const handleFinalizePurchase = () => {
    dispatch(clearCart());
    setFinalized(true);
    console.log("Compra finalizada!");
  };

  useEffect(() => {}, [items, isOpen, dispatch, finalized]);

  if (!isOpen) return null;

  return (
    <motion.div
      className={styles.cartContainer}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.header}>
        <button
          title="voltar"
          className={styles.closeButton}
          onClick={() => dispatch(toggleCart())}
        >
          <GoArrowLeft className={styles.arrow} size={30} />
        </button>
        <h2>Mochila de Compras</h2>
      </div>
      {items.length === 0 ? (
        <p className={styles.emptyCartMessage}>
          Você ainda não tem nada na mochila
        </p>
      ) : (
        items.map((item: CartItem) => (
          <div key={item.id} className={styles.cartItem}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.cartImage}
            />
            <div className={styles.PriceContainer}>
              <p>{item.name}</p>
              <p className={styles.subtitle}>Redesigned from scra</p>
              <p className={styles.price}>
                <Image
                  className={styles.Ellipse}
                  src={BlueSimble}
                  alt="símbolo preço"
                  width={24}
                  height={24}
                />
                {item.price * item.quantity} ETH
              </p>
              <div className={styles.quantityControls}>
                <div className={styles.buttons}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleRemove(item.id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleAdd(item)}
                  >
                    +
                  </button>
                </div>
                <div className={styles.DeleteButton}>
                  <button
                    title="delete"
                    className={styles.delete}
                    onClick={() => handleClearItem(item.id)}
                  >
                    <Image
                      className={styles.Delete}
                      src={Delete}
                      alt="deletar produto"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {items.length > 0 && (
        <>
          <h3 className={styles.total}>
            <span>Total:</span>
            <span className={styles.priceWithSymbol}>
              <Image
                className={styles.Ellipse}
                src={BlueSimble}
                alt="símbolo preço"
                width={24}
                height={24}
              />
              {totalAmount} ETH
            </span>
          </h3>
          <button
            className={styles.finalizeButton}
            onClick={handleFinalizePurchase}
          >
            Finalizar Compra
          </button>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
