import React from 'react';
import Link from 'next/link';
import styled from 'styled-components'

import { imageUrlFor } from '../services/sanity';

const ProductCard = styled.div`
    cursor: pointer;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
    color: ${props => props.theme.text.primary};

	:hover {
		transform: scale(1.1, 1.1)
	}
`

const ProductImage = styled.img`
	border-radius: 15px;
	background-color: white;
	transform: scale(1, 1);
	transition: transform 0.5s ease;
`

const ProductImageWrapper = styled.div`
	border-radius: 15px;
	background-color: white;
	height: 250px;
	width: 250px;
	margin-bottom: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
`

const ProductName = styled.p`
	font-weight: 500;
`

const ProductPrice = styled.p`
	font-weight: 800;
  	margin-top: 6px;
`

export default function Product({ product: { 
    image, 
    name, 
    slug, 
    price 
} }){
    return (
        <div>
            <Link href={`/produto/${slug.current}`}>
                <ProductCard>
					<ProductImageWrapper>
						<ProductImage
							src={imageUrlFor(image && image[0])}
							width={230}
							height={230}
						/>
					</ProductImageWrapper>
                    <ProductName>{name}</ProductName>
                    <ProductPrice>R$ {price}</ProductPrice>
                </ProductCard>
            </Link>
        </div>
    )
}
  