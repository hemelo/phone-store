import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import toast from 'react-hot-toast';
import styled from 'styled-components';

import { useStateContext } from '../context/AppContext';
import Button from './Button';
import QuantityDescription from './QuantityDescription';
import { imageUrlFor } from '../services/sanity';
import getStripe from '../services/stripe';

const Wrapper = styled.div`
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
    transition: all 1s ease-in-out;
`

const Container = styled.div`
    height: 100vh;
    width: 600px;
    background-color: ${props => props.theme.colors.primary};
    float: right;
    padding: 40px 10px;
    position: relative;

    @media screen and (max-width:800px) {
        width: 415px;
        padding: 4px;
    }
`

const CloseButton = styled.button`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    gap: 2px;
    margin-left: 10px;
    border: none;
    background-color: transparent;

    span {
        margin-left: 10px;
    }

    span.itens{
        color: ${props => props.theme.colors.secondary};
        font-weight: 700;
    }

    @media screen and (max-width:800px) {
        margin-top: 35px;
    }
`

const EmptyCard = styled.div`
    margin: 40px;
    text-align: center;

    h3 {
        font-weight: 600;
        font-size: 20px;
    }
`

const Products = styled.div`
    margin-top: 15px;
    overflow: auto;
    max-height: 70vh;
    padding: 20px 10px;

    @media screen and (max-width:800px) {
        margin-top: 10px;
    }
`

const Product = styled.div`
    display: flex;
    gap: 30px;
    padding: 20px;

    @media screen and (max-width:800px) {
        padding: 20px 5px;
    }
`

const ProductImage = styled.img`
    width: 180px;
    height: 150px;
    border-radius: 15px;
    background-color: white;

    @media screen and (max-width:800px) {
        width: 25%;
        height: 25%;
    }
`

const ProductDescription = styled.div`
`

const ProductTitle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 350px;

    @media screen and (max-width:800px) {
        width: 200px;
    }

    h4 {
        font-size: 20px;

        @media screen and (max-width:800px) {
            font-size: 16px;
        }
    }

    h5 {
        font-size: 24px;

        @media screen and (max-width:800px) {
            font-size: 16px;
        }
    }
`

const CartBottom = styled.div`
    position: absolute;
    bottom: 12px;
    right: 5px;
    width: 100%;
    padding: 30px 65px;

    @media screen and (max-width:800px) {
        padding: 30px;
    }
`

const Total = styled.div`
    display: flex;
    justify-content: space-between;

    h3 {
        font-size: 22px;

        @media screen and (max-width:800px){
            font-size: 18px;   
        }
    }
`

const PaymentContainer = styled.div`
    width: 400px;
    margin: auto;

    @media screen and (max-width:800px) {
        width: 300px;
        margin: auto;
    }
`

const PaymentButton = styled(Button)``

const ProductDetails = styled.div`
    display: flex;
    justify-content: space-between;
    width: 350px;
    margin-top: 60px;

    @media screen and (max-width:800px) {
        margin-top: 20px;
        width: 200px;
    }
`

const QuantityDescriptionWrapper = styled.div`
   width: fit-content !important;
`

const RemoveProduct = styled.button`
    font-size: 24px;
    color: ${props => props.theme.colors.secondary};
    cursor: pointer;
    background: transparent;
    border: none;
    width: fit-content !important;
`

export default function Cart () {
    const cartRef = useRef();
    const { 
        totalPrice, 
        totalQuantities, 
        cartItems, 
        setShowCart, 
        toggleCartItemQuantity, 
        onRemove 
    } = useStateContext();
    
    const handleCheckout = async () => {
        const stripe = await getStripe();
        
        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        });
        
        if(response.statusCode === 500) return;
        
        const data = await response.json();
        
        toast.loading('Redirecionando...');
        
        stripe.redirectToCheckout({ sessionId: data.id });
    }
    
    return (
        <Wrapper ref={cartRef}>
            <Container>
                <CloseButton
                    type="button"
                    className="cart-heading"
                    onClick={() => setShowCart(false)}
                >
                    <AiOutlineLeft />
                    <span>Seu carrinho</span>
                    <span className="itens">({totalQuantities} itens)</span>
                </CloseButton>
        
                {cartItems.length < 1 && (
                <EmptyCard>
                    <AiOutlineShopping size={150} />
                    <h3>Seu carrinho está vazio</h3>
                </EmptyCard>
                )}
            
                <Products>
                    {cartItems.length >= 1 && cartItems.map((item) => (
                    <Product key={item._id}>
                        <ProductImage src={imageUrlFor(item?.image[0])} />
                        <ProductDescription>
                            <ProductTitle>
                                <h5>{item.name}</h5>
                                <h4>${item.price}</h4>
                            </ProductTitle>
                            <ProductDetails>
                                <QuantityDescriptionWrapper>
                                    <QuantityDescription 
                                        dec={() => toggleCartItemQuantity(item._id, 'dec')}
                                        inc={() => toggleCartItemQuantity(item._id, 'inc')} 
                                        quantity={item.quantity}
                                    />
                                </QuantityDescriptionWrapper>
                                <RemoveProduct
                                    type="button"
                                    onClick={() => onRemove(item)}
                                >
                                    <TiDeleteOutline />
                                </RemoveProduct>
                            </ProductDetails>
                        </ProductDescription>
                    </Product>
                    ))}
                </Products>
                {cartItems.length >= 1 && (
                <CartBottom>
                    <Total>
                        <h3>Subtotal:</h3>
                        <h3>${totalPrice}</h3>
                    </Total>
                    <PaymentContainer>
                        <PaymentButton type="button" onClick={handleCheckout}>
                            Realizar pagamento <BsBoxArrowUpRight style={{marginLeft: "2px"}} />
                        </PaymentButton>
                    </PaymentContainer>
                </CartBottom>
                )}
            </Container>
        </Wrapper>
    )
}
                