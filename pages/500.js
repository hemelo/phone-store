import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
    color:  ${props => props.theme.text.primary}; 
    font-size: 40px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70vh;
`
export default function Custom404() {
    return <Title>500 - Erro interno</Title>
}