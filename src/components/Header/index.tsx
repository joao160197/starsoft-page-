
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import logo from '/public/img/logo.png';
import bag from '/public/img/Bag.png';
import { RootState } from '@/components/Redux/store'; 
import { toggleCart } from '@/components/Redux/cartSlice';

import './styles.scss';

export function Header() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items); 
  
  const totalItemsInCart = items.reduce((total, item) => total + item.quantity, 0);

  const handleCartToggle = () => {
    dispatch(toggleCart()); 
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link href="" className="header__title">
          <Image src={logo} alt="Logo" width={120} height={50} /> 
        </Link>

        <div className="header__cart">
          <button className="cart__button" title="Carrinho" type="button" onClick={handleCartToggle}>
            <Image src={bag} alt="Logo" width={35} />
            <p className="cart__count">{totalItemsInCart}</p> 
          </button>
        </div>
      </div>
    </header>
  );
}
