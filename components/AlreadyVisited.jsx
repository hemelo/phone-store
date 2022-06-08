import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';
import { MdWeb } from 'react-icons/md'

import socials from '../socials';
import Button from './Button';

const Description = styled.p`
    color: white;
    line-height: 1.8;
    font-weight: 500;
    margin-bottom: 10px;
    text-align: justify;

    a {
        font-weight: 600;
        color: rgb(0,90, 255);
    }
`

const Icon = styled.div`
    .icon{ 
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 100%;
        background-color: white;
        color: ${props => props.theme.colors.secondary};
        transform: scale(1, 1);
        transition: transform .3s;
        top: -.4rem;
        right: -.4rem;
        cursor: pointer;

        :hover {
            transform: scale(1.1, 1.1)
        }
    }
`

const CustomButton = styled(Button)`
    width: fit-content;
`

const Socials = styled.div`
    color: white;

    a {
        display: flex;
        align-items: center;
        justify-items: center;
        gap: 4px;
        font-weight: 700;
        text-decoration: underline;
        text-underline-offset: 2px;

        transform: scale(1, 1);
        transition: transform .3s;

        :hover {
            transform: scale(1.03, 1.03)
        }
    }

    a *{ 
        width: 30px;
        height: 30px;
    }
`

export default function AlreadyVisited({ props }) {
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            let visited = localStorage["alreadyVisited"];
            if(!visited) {
                setIsOpen(true)
                localStorage["alreadyVisited"] = true;
            }
        }, 1000)
    }, [])

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} className="modal" overlayClassName="modal-overlay">
            <Description>
                Este foi um site desenvolvido para fins de prática utilizando Next.js, React, 
                Swiper, Styled Components, Sanity.io e Stripe. 
            </Description>
            <Description>
                As vendas do site são fictícias. No formulário de pagamento do Stripe 
                você pode preencher quaisquer dados de cartão, pois está configurado no 
                <a href="https://stripe.com/docs/testing" target="_blank" rel="noreferrer"> modo Teste</a>.
            </Description>
            <Socials>
                <a href={socials.github.url} target="_blank" rel="noreferrer">
                    <AiFillGithub role="button"/>
                    {socials.github.label}
                </a>
                
            </Socials>
            <CustomButton onClick={() => setIsOpen(false)} secondary>
                Entendi
            </CustomButton>
            <Icon role="button" onClick={() => setIsOpen(false)}>
               <IoMdClose className="icon" />
            </Icon>
        </Modal>
    )
}