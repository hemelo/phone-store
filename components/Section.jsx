import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
    text-align: center;
    margin: 40px 0px;
    color:  ${props => props.theme.text.primary}; 

    h2 {
        font-size: 40px;
        font-weight: 800;
    }

    h3 { 
        font-size: 28px;
        font-weight: 800;
    }

    p {
        font-size: 16px;
        font-weight: 400;
    }
`

export default Section