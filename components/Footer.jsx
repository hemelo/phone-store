import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';
import styled from 'styled-components'

const Wrapper = styled.div`
    text-align: center;
    margin-top: 20px;
    padding: 30px 10px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    justify-content: center;
	color:  ${props => props.theme.text.primary};
`

const Copyright = styled.h6`
	font-size: 1rem;
`

const Icons = styled.p`
	font-size: 30px;
	display: flex;
	gap: 10px;
`

export default function Footer() {
    return (
        <Wrapper>
            <Copyright>{new Date().getFullYear()} Ape Phones. Desenvolvido por Henrique Melo.</Copyright>
            <Icons>
                <AiFillInstagram />
                <AiOutlineTwitter />
            </Icons>
        </Wrapper>
    )
}

