import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import styled from 'styled-components'

import socials from '../socials'

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
                <a href={socials.github.url} target="_blank" rel="noreferrer">
                    <AiFillGithub />
                </a>
            </Icons>
        </Wrapper>
    )
}

