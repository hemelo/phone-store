import React from 'react';
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from "swiper";

import { client } from '../services/sanity';
import { Product, BottomBanner, HeroBanner, SectionHeader } from '../components';

import "swiper/css";
import "swiper/css/effect-fade";

const Products = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    width: 100%;
`

export default function Home({ products, bannerData }) {
    return (
        <div>
            {bannerData.length > 0 &&
            <Swiper
                effect={"fade"}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay,EffectFade]}  
            >
                {bannerData.map((banner) => (
                    <SwiperSlide>
                        <HeroBanner heroBanner={banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
            }

            <SectionHeader>
                <h2>Mais vendidos</h2>
                <p>Compre já o seu celular baseado na escolha dos nossos clientes!</p>
            </SectionHeader>

            <Products>
                {products?.map((product) => <Product key={product._id} product={product} />)}
            </Products>

            {bannerData.length > 0 &&
            <Swiper
                effect={"fade"}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay,EffectFade]}
            >
                {bannerData.map((banner) => (
                    <SwiperSlide>
                        <BottomBanner bottomBanner={banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
            }
        
        </div>
    )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);
  
    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);
  
    return {
      props: { products, bannerData }
    }
}