import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/images/logo.png";
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
  const { authState, updateTheme } = useAuthState();
  const closeMenu = (e) => {
    // e.preventDefault();
    setToggleMobileMenu(false);
  };
  return (
    <aside className={`app__menu`}>
      <figure
        className="logo__container_aside hide-mobile"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} alt="logo" width={150} height={48} />
      </figure>

      <ul className="nav__list">
        <li>
          <NavLink className="d-btn d-btn-primary" to={"/"} onClick={closeMenu}>
            <DashboardIcon />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="d-btn d-btn-primary"
            to={"/swap"}
            onClick={closeMenu}
          >
            <ExchangeIcon />
            Swap
          </NavLink>
        </li>
        <li>
          <NavLink
            className="d-btn d-btn-primary"
            to={"/liquidity"}
            onClick={closeMenu}
          >
            <SwapIcon />
            Liquidity
          </NavLink>
        </li>
        <li>
          <NavLink
            className="d-btn d-btn-primary"
            to={"/pool"}
            onClick={closeMenu}
          >
            <LPIcon />
            Pool
          </NavLink>
        </li>
        <li>
          <NavLink
            className="d-btn d-btn-primary"
            to={"/reward"}
            onClick={closeMenu}
          >
            <PoolIcon />
            Reward
          </NavLink>
        </li>

        {/* <li>
                    <NavLink className="d-btn d-btn-primary" to={"/nft-collection"}>
                        <NFTCollectionIcon />
                        NFT Collection
                    </NavLink>
                </li>
                <li>
                    <NavLink className="d-btn d-btn-primary" to={"/nft-upload"}>
                        <NFTUploadIcon />
                        NFT Upload
                    </NavLink>
                </li> */}
        <li>
          <button className="d-btn d-btn-primary noeffect" onClick={closeMenu}>
            <LinkIcon />
            Test Build V2.0.5
          </button>

          <ul>
            <li>
              <a href="https://ordiswap.gitbook.io/" target="_blank">
                Doc
              </a>
            </li>
            {/* <li>
                            <a href="#" target="_blank">Vote</a>
                        </li> */}
            <li>
              <a href="https://github.com/" target="_blank">
                Github
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <footer>
        {/* <p>Contact</p> */}

        <ul>
          <li>
            <a href="https://twitter.com/" target="_blank">
              <img src={twitterIcon} alt="twitter" />
            </a>
          </li>
          <li>
            <a href="https://t.me/" target="_blank">
              <img src={telegramIcon} alt="telegram" />
            </a>
          </li>
          {/* <li>
                        <a href="https://medium.com/@Ordiswap" target="_blank">
                            <img src={mediumIcon} alt="medium" />
                        </a>
                    </li> */}
          <li>
            <a href="https://discord.gg/" target="_blank">
              <img src={discordIcon} alt="discord" />
            </a>
          </li>
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
