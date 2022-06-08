import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import styled from 'styled-components'

import { Cart } from './';
import { useStateContext} from '../context/AppContext';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 6px 18px;
    position: relative;
    flex-wrap: nowrap;
`

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: .5rem;
    cursor: pointer;
`

const SiteTitle = styled.div`
    font-weight: 800;
    font-size: 2rem;
`

const CartIcon = styled.button`
    font-size: 25px;
    cursor: pointer;
    position: relative;
    transition: transform .4s ease;
    border: none;
    background-color: transparent;

    :hover {
        transform: scale(1.1, 1.1);
    }

    span { 
        background-color: ${props => props.theme.colors.secondary};
        color: white;
        position: absolute;
        right: -8px;
        font-size: 12px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        text-align: center;
        font-weight: 600;
    }
`

export default function Navbar(){
	const { showCart, setShowCart, totalQuantities } = useStateContext();

	return (
		<Wrapper>
			<Logo>
				<img width={40} height={40} src="/logo.png" />
				<Link href="/">
					<SiteTitle>Ape Phones</SiteTitle>
				</Link>
			</Logo>

			<CartIcon type="button" onClick={() => setShowCart(true)}>
				<AiOutlineShopping />
				<span>{totalQuantities}</span>
			</CartIcon>

			{showCart && <Cart />}
		</Wrapper>
	)
}