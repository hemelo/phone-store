import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Button from './Button'
import { imageUrlFor } from '../services/sanity';

const Container = styled.div`
    padding: 70px 40px;
    background-color:${props => props.theme.colors.secondary};  
    border-radius: 15px;
    position: relative;
    min-height: 400px;

    line-height: 1;
    color: white;
    width: 100%;
    margin-top: 100px;

    @media screen and (max-width:1280px) {
        margin-top: 80px;
        padding: 35px 40px;
    }

    @media screen and (max-width:1024px) {
        margin-top: 60px;
        padding: 30px 35px;
        min-height: 300px;
    }

    @media screen and (max-width:800px) {
        margin-top: 60px;
        padding: 20px 30px;
        min-height: 300px;
    }

    @media screen and (max-width:600px) {
        margin-top: 60px;
        padding: 10px 20px;
        min-height: 200px;
    }
`

const Description = styled.div`
    display: grid;
`

const LeftXl = styled.div`
    grid-column: 1;

    @media screen and (max-width: 1280px) {
        display: none;
    }

    h3 {
        font-weight: 900;
        font-size: 80px;

        @media screen and (max-width:1280px) {
            font-size: 50px;
        }
    }

    p {
        margin-bottom: 18px;
    }
`

const RightXl = styled.div`
    grid-column: 2 / span 12;
    line-height: 1.4;
    background-image: url(${props => props.src});
	background-position: right center;
	background-repeat: no-repeat;
	background-size: contain;

    @media screen and (max-width: 1280px) {
        display: none;
    }

    h3 {
        font-weight: 800;
        font-size: 60px;

        @media screen and (max-width:800px) {
            font-size: 40px;
        }

        @media screen and (max-width:1280px) {
            font-size: 50px;
        }
    }

    p {
        font-size: 18px;
        width: 55%;

        @media screen and (max-width:1280px) {
            font-size: 18px;
        }
    }
`

const Left = styled.div`
    grid-column: 1 / 10;

    @media screen and (min-width: 1280px) {
        display: none;
    }


    margin: 20px 0;
    

    h2 {
        font-weight: 900;
        font-size: 60px;

        @media screen and (max-width:800px) {
            font-size: 45px;
        }

        @media screen and (max-width:600px) {
            font-size: 30px;
        }
    }

    h3 {
        font-weight: 900;
        font-size: 40px;

        @media screen and (max-width:800px) {
            font-size: 25px;
            margin-bottom: 5px;
        }

        @media screen and (max-width:600px) {
            font-size: 15px;
        }
    }

    p {
        margin-top: 18px;
    }
`

const Right = styled.div`
    grid-column: 11 / 12;
    display: flex;
    align-items: center;
    justify-content: end;

    @media screen and (min-width: 1280px) {
        display: none;
    }
`

const ProductImage = styled.img`
    width: 400px;
    height: 400px;

    @media screen and (max-width:800px) {
        width: 300px;
        height: 300px;
    }

    @media screen and (max-width:600px) {
        width: 200px;
        height: 200px;
    }

`

const CustomButton = styled(Button)`
	width: fit-content !important;
	padding: 10px 20px !important;
	margin-top: 40px !important;

	@media screen and (max-width:800px) {
		margin-top: 90px;
		z-index: 10000;
	}
`

export default function BottomBanner({ bottomBanner: { 
    discount, 
    largeText1, 
    largeText2, 
    saleTime, 
    smallText, 
    midText, 
    description, 
    product, 
    buttonText, 
    image 
} }){
  return (
    <Container>
        <Description>
            <LeftXl>
                <p>-- {discount} R$ durante {saleTime}</p>
                <h3>{largeText2}</h3>
            </LeftXl>
            <RightXl src={imageUrlFor(image[1])}>
                <p>{smallText}</p>
                <h3>{midText}</h3>
                <p>{description}</p>
                <Link href={`/produto/${product}`}>
                    <CustomButton secondary type="button">{buttonText}</CustomButton>
                </Link>
            </RightXl>

            <Left>
                <h3>{midText}</h3>
                <h2>{largeText2}</h2>
                <p>{smallText}</p>
                <Link href={`/produto/${product}`}>
                    <CustomButton secondary type="button">{buttonText}</CustomButton>
                </Link>
            </Left>
            <Right>
                <ProductImage  src={imageUrlFor(image[1])} />
            </Right>
        </Description>
    </Container>
  )
}