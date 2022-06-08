import React from 'react';
import Link from 'next/link';
import styled from 'styled-components'

import Button from './Button';
import { imageUrlFor } from '../services/sanity';

const Container = styled.div`
    padding: 100px 40px;
    border-radius: 15px;
    position: relative;
    height: 500px;
    line-height: 0.9;
    width: 100%;
	background-image: url(${props => props.src});
	background-position: right bottom;
	background-repeat: no-repeat;
	background-size: contain;
	background-color: white;

	p {
		font-size: 20px;
	}

	h3 {
		font-size: 3rem;
  		margin-top: 20px;
		

		@media screen and (max-width:800px) {
			font-size: 40px;
		}
	}

	h1 {
		color: white;
		font-size: 5em;
		margin-top: 5px;
		font-weight: 900;
		text-transform: uppercase;
		color: ${props => props.theme.colors.secondary};  

		@media screen and (max-width:800px) {
			font-size: 50px;
		}
	}

	@media screen and (max-width:800px) {
		height: 560px;
		line-height: 1.3;
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

const Description = styled.div`
	position: absolute;
	right: 10%;
	bottom: 5%;
	width: 300px;
	line-height: 1.3;
	display: flex;
	flex-direction: column;


	p {
		font-weight: 400;
		text-align: end;

		@media screen and (max-width:800px) {
			font-size: 16px;
		}
	}

	h5 {
		margin-bottom: 12px;
		font-weight: 700;
		font-size: 16px;
		/* color: black; */
		align-self: flex-end;
	}
`

export default function HeroBanner({ heroBanner: {
    smallText,
    midText,
    largeText1,
    description,
    image,
    buttonText,
    product,
} }){
	return (
		<Container src={imageUrlFor(image[0])}>
			<div>
				<p>{smallText}</p>
				<h3>{midText}</h3>
				<h1>{largeText1}</h1>
				<div>
					<Link href={`/produto/${product}`}>
						<CustomButton type="button">{buttonText}</CustomButton>
					</Link>
					<Description>
						<h5>Descrição</h5>
						<p>{description}</p>
					</Description>
				</div>
			</div>
		</Container>
	)
}
