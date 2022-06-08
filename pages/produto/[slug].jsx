import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import { client, imageUrlFor } from '../../services/sanity';
import { Product, QuantityDescription, SectionHeader } from '../../components';
import { useStateContext } from '../../context/AppContext';

const ProductContainer = styled.div`
	display: flex;
	gap: 40px;
	margin: 40px;
  	margin-top: 60px;

  	@media screen and (max-width:800px) {
		flex-wrap: wrap;
	}
`

const BigImageContainer = styled.div`
	
`

const ProductBigImage = styled.img`
    border-radius: 15px;
    background-color: white;
    width: 400px;
    height: 400px;
    cursor: pointer;
    transition: .3s ease-in-out;

	:hover {
		background-color: ${props => props.theme.colors.secondary};
	}

	@media screen and (max-width:1024px) {
		width: 350px;
    	height: 350px;
	}
`

const SmallImageContainer = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 20px;
`

const ProductSmallImage = styled.img`
	border-radius: 8px;
	background-color:  ${props => props.selected ? props.theme.colors.secondary : "white"};
	width: 70px;
	height: 70px;
	cursor: pointer;

	:hover {
		background-color: ${props => props.theme.colors.secondary};
	}
`

const ProductDetail = styled.div`
	p, h4{
		margin-top: 10px;
	}
`

const Reviews = styled.div`
	margin-top: 10px;
  	display: flex;
  	gap: 5px;
  	align-items: center;
	color: ${props => props.theme.colors.secondary};

	p{
		margin-top: 0px;
	}
`

const Quantity = styled.div`
	display: flex;
	gap: 20px;
	margin-top: 10px;
	align-items: center;
`

const Price = styled.p`
	font-weight: 700;
	font-size: 26px;
	margin-top: 30px;
	color: ${props => props.theme.colors.secondary};

	span {
		color: gray;
  		text-decoration: line-through;
	}
`

const Products = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    width: 100%;
`

const ActionButtons = styled.div`
	display: flex;
 	gap: 30px;

	button {
		margin-top: 40px;
		font-size: 18px;
		font-weight: 500;
		padding: 10px 20px;
		cursor: pointer;
		width: 200px;
		transform: scale(1, 1);
		transition: transform 0.5s ease;

		@media screen and (max-width:1024px) {
			padding: 10px 0;
			font-size: 16px;
			width: 150px;
		}
	}

	button:hover {
		transform: scale(1.1, 1.1)
	}
`

const AddToCartButton = styled.button`
	border: 1px solid ${props => props.theme.colors.secondary};
	background-color: white;
	color: ${props => props.theme.colors.secondary};
`

const BuyButton = styled.button`
	border: 1px solid ${props => props.theme.colors.secondary};
	background-color: ${props => props.theme.colors.secondary};
	color: white;
`

export default function ProductDetails ({ product, products }){
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const { decQuantity, incQuantity, quantity, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(product, quantity);

        setShowCart(true);
    }

    return (
        <div>
            <ProductContainer>
                <div>
                    <BigImageContainer>
                        <ProductBigImage src={imageUrlFor(image && image[index])} />
                    </BigImageContainer>
                    <SmallImageContainer>
                        {image?.map((item, i) => (
                        <ProductSmallImage 
                            key={i}
                            src={imageUrlFor(item)}
                            selected={i === index}
                            onMouseEnter={() => setIndex(i)}
                        />
                        ))}
                    </SmallImageContainer>
                </div>

                <ProductDetail>
                    <h1>{name}</h1>
                    <Reviews>
                        <div>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
                        </div>
                        <p>
                        	(20)
                        </p>
                    </Reviews>
                    <h4>Detalhes: </h4>
                    <p>{details}</p>
                    <Price>R$ {price}</Price>
                    <Quantity>
                        <h3>Quantidade:</h3>
                        <QuantityDescription dec={decQuantity} inc={incQuantity} quantity={quantity} />
                    </Quantity>
                    <ActionButtons>
                        <AddToCartButton type="button" onClick={() => onAdd(product, quantity)}>Adicionar</AddToCartButton>
                        <BuyButton type="button" onClick={handleBuyNow}>Comprar agora</BuyButton>
                    </ActionButtons>
                </ProductDetail>
            </ProductContainer>

            <SectionHeader>
                <h3>Você também pode gostar</h3>
            </SectionHeader>

            <Products>
                {products.map((item) => (
                    <Product key={item._id} product={item} />
                ))}
            </Products>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
        current
        }
    }
    `;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: { 
        slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query);
    let products = await client.fetch(productsQuery);
    
    products = products.slice(0, 4)

    if (!product) {
        return {
            notFound: true
        }
    }

    return {
        props: { products, product }
    }
}