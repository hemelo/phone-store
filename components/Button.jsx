import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 100%;
    max-width: 400px;
    padding: 10px 12px;
    border-radius: 15px;
    border: none;
    font-size: 20px;
    margin-top: 20px;
    text-transform: uppercase;
    background-color: ${props => props.secondary ? "#fff" : props.theme.colors.secondary};
    color: ${props => !props.secondary ? "#fff" : props.theme.colors.secondary};
    cursor: pointer;
    transform: scale(1, 1);
    transition: transform 0.5s ease;

    :hover {
        transform: scale(1.1, 1.1);
    }

    @media screen and (max-width:800px) {
        font-size: 16px;
        margin-top: 16px;
    }
`

export default Button