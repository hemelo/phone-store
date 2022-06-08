import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill, BsArrowRight } from 'react-icons/bs';
import styled from 'styled-components'

import Button from '../components/Button';
import { useStateContext } from '../context/AppContext';
import fireworks from '../services/firework';

const Wrapper = styled.div`
    min-height: 60vh;

    @media screen and (max-width:800px) { 
        min-height: 69vh;
    }
`

const Container = styled.div`
    width: 1000px;
    margin: auto;
    margin-top: 160px;
    padding: 50px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media screen and (max-width:800px) { 
        width: 370px;
        margin-top: 100px;
        padding: 20px;
        height: 350px;
    }
`

const Title = styled.h2`
    text-transform: capitalize;
    margin-top: 15px 0px;
    font-weight: 900;
    font-size: 40px;

    @media screen and (max-width:800px) { 
        font-size: 17px; 
    }
`

const Icon = styled.p`
    color: white;
    font-size: 40px;
    background-color: ${props => props.theme.colors.secondary};
    padding: 4px 10px 0px 10px;
    border-radius: 100%;
`

const Description = styled.p`
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin-top: 10px;
    line-height: 2.0;

    a {
        margin-left: 5px;
        color: ${props => props.theme.colors.secondary};
    }
`

export default function Success(){
    const { 
        setCartItems, 
        setTotalPrice, 
        setTotalQuantities 
    } = useStateContext();
    
    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        fireworks();
    }, []);

    return (
        <Wrapper>
            <Container>
                <Icon>
                    <BsBagCheckFill />
                </Icon>
                <Title>Obrigado pela confiança!</Title>
                <Description>
                    Mais detalhes sobre seu pedido foram enviados no seu email. <br />
                    Se você tem alguma dúvida envie emails para:
                    <a className="email" href="mailto:hmelo2509@gmail.com">
                        hmelo2509@gmail.com
                    </a>
                </Description>
                <Link href="/">
                    <Button type="button" width="300px">
                        Continuar comprando <BsArrowRight style={{paddingTop: "3px"}} />
                    </Button>
                </Link>
            </Container>
        </Wrapper>
    )
}
