import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from 'react-icons/fi'
import { CgClose, CgMenu } from "react-icons/cg";
import { useGlobalCartProvider } from "./context/cartContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../styles/Button";


const Nav = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const [Menu, setMenu] = useState();
  const { total_Item } = useGlobalCartProvider()

  const Nav = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }

      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #fff;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
      display: inline-block;
      top: 3%;
      right: 6%;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;

        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }

        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;


  return (
    <Nav>
      <div className={Menu ? "Navbar active" : "Navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink className="navbar-link home-link" to="/" onClick={() => setMenu(false)}>Home</NavLink>

          </li>
          <li>
            <NavLink className="navbar-link" to="/About" onClick={() => setMenu(false)}>About </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/Products" onClick={() => setMenu(false)}>Products</NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/Contact" onClick={() => setMenu(false)}>Contact</NavLink>
          </li>
          {isAuthenticated && <h3>{user.name}</h3>}

          {isAuthenticated ? (
            <li>
              <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</Button></li>
          ) : (
            <li>
              <Button onClick={() => loginWithRedirect()}>Log In</Button>;
            </li>
          )}


          <li>
            <NavLink className="navbar-link cart-trolley--link" to="/cart" onClick={() => setMenu(false)}>
              <FiShoppingCart className="cart-trolley" />
              <span className="cart-total--item">{total_Item}</span>
            </NavLink>
          </li>
        </ul>
        <div className="mobile-navbar-btn">

          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => { setMenu(true) }} />

          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => { setMenu(false) }} />

        </div>
      </div>
    </Nav>
  );
};

export default Nav;