import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/images/logo_mobile.png";
// import logoDark from "../assets/logo/dexordi-dark.svg";

import ExchangeIcon from "../assets/icons/ExchangeIcon";
import DashboardIcon from "../assets/icons/DashboardIcon";
import DAOIcon from "../assets/icons/DAOIcon";
import SwapIcon from "../assets/icons/SwapIcon";
import PoolIcon from "../assets/icons/PoolIcon";
import NFTIcon from "../assets/icons/NFTIcon";
// import NFTCollectionIcon from "../assets/icons/NFTCollectionIcon";
// import NFTUploadIcon from "../assets/icons/NFTUploadIcon";
import LinkIcon from "../assets/icons/LinkIcon";
import twitterIcon from "../assets/icons/twitter.svg";
import mediumIcon from "../assets/icons/Medium.svg";
import telegramIcon from "../assets/icons/telegram.svg";
import discordIcon from "../assets/icons/discord.svg";
import lightIcon from "../assets/icons/light-icon.png";
import darkIcon from "../assets/icons/dark-icon.png";

import { useAuthState } from "../context/AuthContext";
import LPIcon from "../assets/icons/LPIcon";

function Aside({ setToggleMobileMenu }) {
  const navigate = useNavigate();
  const { unisatContext, authState } = useAuthState();

  const { connected, address, connectWallet } = unisatContext;

  const closeMenu = (e) => {
    // e.preventDefault();
    setToggleMobileMenu(false);
  };
  return (
    <aside className={`app__menu`}>
      <figure
        className="logo__container_aside hide-mobile flex items-center gap-4"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} alt="logo" width={25} />
        <p className="!text-[20px] text-white mt-2">Ordiswap</p>
      </figure>

      <ul className="nav__list">
        <li>
          <button className="btn w-full" onClick={connectWallet}>
            {!connected
              ? "Connect"
              : address?.slice(0, 5) + "..." + address?.slice(-5)}
          </button>
        </li>
        <li>
          <div className="d-divider"></div>
        </li>
        <li>
          <NavLink className="btn w-full" to={"/"} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="btn w-full" to={"/swap"} onClick={closeMenu}>
            Swap
          </NavLink>
        </li>
        <li>
          <NavLink className="btn w-full" to={"/liquidity"} onClick={closeMenu}>
            Liquidity
          </NavLink>
        </li>
        <li>
          <NavLink className="btn w-full" to={"/pool"} onClick={closeMenu}>
            Pool
          </NavLink>
        </li>
        <li>
          <NavLink className="btn w-full" to={"/reward"} onClick={closeMenu}>
            Reward
          </NavLink>
        </li>
        <li>
          <div className="d-divider"></div>
        </li>
        <li>
          <a
            className="btn w-full"
            href="https://ordiswap.gitbook.io/"
            target="_blank"
          >
            Doc
          </a>
        </li>
      </ul>

      <footer>
        {/* <p>Contact</p> */}

        <ul>
          <li>
            <a href="https://twitter.com/OrdiswapLabs" target="_blank">
              <img src={twitterIcon} alt="twitter" />
            </a>
          </li>
          <li>
            <a href="https://t.me/OrdiswapLabs" target="_blank">
              <img src={telegramIcon} alt="telegram" />
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@teamordiswap/ordiswap-revolutionizing-decentralized-finance-on-bitcoins-native-blockchain-295d7490d5c1"
              target="_blank"
            >
              <img src={mediumIcon} alt="medium" />
            </a>
          </li>
          {/* <li>
            <a href="https://discord.gg/" target="_blank">
              <img src={discordIcon} alt="discord" />
            </a>
          </li> */}
        </ul>

        {/* <div className="switch-theme" onClick={updateTheme}>
          <img
            src={authState.preferDark ? lightIcon : darkIcon}
            alt="dark theme"
          />
        </div> */}
      </footer>
    </aside>
  );
}

export default Aside;
