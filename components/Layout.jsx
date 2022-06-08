import React from 'react';
import Head from 'next/head';
import styled from 'styled-components'
import { motion } from 'framer-motion';

import Navbar from './Navbar';
import Footer from './Footer';

const Body = styled.div`
    background-color: ${props => props.theme.colors.primary};
`

const Wrapper = styled.div`
	width: 100%;
	margin-right: auto;
	margin-left: auto;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	align-items: stretch;
	padding: 0 5px;

	@media (min-width: 576px) {
		max-width: 540px;
	}
	@media (min-width: 768px) {
		max-width: 720px;
	}

	@media (min-width: 992px) {
		max-width: 960px;
	}
	@media (min-width: 1200px) {
		max-width: 1140px;
	}
	@media (min-width: 1400px) {
		max-width: 1320px;
	}
`

const HeaderWrapper = styled.header`
	flex-shrink: 0;
`

const Main = styled.main`
	margin-top: 30px;
	flex-grow: 1;
`

const pageVariants = {
	initial: {
	  opacity: 0,
	},
	in: {
	  opacity: 1,
	},
	out: {
	  opacity: 0,
	},
}

export default function Layout({ children }){
	return (
		<Body>
			<motion.div  initial="initial" animate="in" exit="out" variants={pageVariants}>
				<Wrapper>
					<Head>
						<title>Ape Phones</title>
						<meta name="description" content="A small ecommerce application made with Next.js, React, Sanity and Stripe" />
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<HeaderWrapper>
						<Navbar />
					</HeaderWrapper>
					<Main>
						{children}
					</Main>
					<Footer />
				</Wrapper>
			</motion.div>
		</Body>
	)
}
