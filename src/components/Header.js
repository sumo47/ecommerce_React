import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Nav from './Nav'

function Header() {
    return (
        <MainHeader>
            <NavLink to="/">
                <img style={{ width: "10rem" }} src="./image/logo.png" alt="Logo of store" />
            </NavLink>
            <Nav />
        </MainHeader>
    )
}
const MainHeader = styled.header`
padding : 0 4.8rem;
height : 10rem;
background-color:${({ theme }) => theme.colors.bg};
display:flex;
justify-content:space-between;
align-items:center;
`;
export default Header
