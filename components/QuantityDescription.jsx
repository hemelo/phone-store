import React from 'react'
import styled from 'styled-components'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Wrapper = styled.div`
    border: 1px solid gray;
    padding: 6px;
   
    span {
        font-size: 16px;
        padding: 6px 12px;
        cursor: pointer;
    }

    .minus {
        border-right: 1px solid gray;
        color: #f02d34;
    }

    .num {
        border-right: 1px solid gray;
        font-size: 20px;
    }

    .plus {
        color: rgb(49, 168, 49);
    }
`

export default function QuantityDescription ({ inc, dec, quantity }) {
    return (
        <Wrapper>
            <span className="minus" onClick={dec}><AiOutlineMinus /></span>
            <span className="num">{quantity}</span>
            <span className="plus" onClick={inc}><AiOutlinePlus /></span>
        </Wrapper>
    )
}
