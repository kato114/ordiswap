import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FailedMessage, SuccessMessage, WarningMessage } from "./Notifications";

import { useAuthState } from "../context/AuthContext";

import ClipIcon from "../assets/icons/ClipIcon";
import RightArrow from "../assets/icons/RightArrow";

import logo from "../assets/images/logo_mobile.png";
import MobileMenuOpenIcon from "../assets/icons/MobileMenuOpenIcon";
import MobileMenuCloseIcon from "../assets/icons/MobileMenuCloseIcon";
import Aside from "./Aside";
import { useResponsiveView } from "../utils/customHooks";
import WalletIcon from "../assets/icons/WalletIcon";
import { useToast } from "../hooks/useToast";
import ReactPortal from "./ReactPortal";

function Header({
  toggleWalletList,
  toggleNetworkList,
  toggleMobileMenu,
  setToggleMobileMenu,
}) {
  const { unisatContext, authState } = useAuthState();
  const { messageApi } = useToast();
  const {
    unisatWallet,
    connected,
    setUnisatInstalled,
    address,
    network,
    balance,
    connectWallet,
  } = unisatContext;
  const isMobileView_800 = useResponsiveView();
  const isMobileView_500 = useResponsiveView(500);
  const navigate = useNavigate();

  const toastRef = useRef();

  const handleConnect = () => {
    unisatContext.connectWallet();
  };

  useEffect(() => {
    if (toggleMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggleMobileMenu]);

  useEffect(() => {
    if (toggleMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggleMobileMenu]);

  return (
    <>
      {toggleMobileMenu && isMobileView_800 && (
        <section className="mobile__menu-container">
          <Aside setToggleMobileMenu={setToggleMobileMenu} />
        </section>
      )}
      <header
        className={`header dark-theme ${!isMobileView_800 ? "ml-[312px]" : ""}`}
      >
        <figure
          className="logo__container hide-desktop"
          onClick={() => {
            navigate("/");
          }}
        >
          <img className="w-[30px] !object-contain" src={logo} alt="logo" />
        </figure>

        {isMobileView_800 && (
          <button
            className="btn flex items-center gap-6"
            onClick={connectWallet}
          >
            <WalletIcon viewBox="0 0 22 22" classes="icon-xs" />
            {connected
              ? address?.slice(0, 4) + "..." + address?.slice(-4)
              : "Connect"}
          </button>
        )}

        {/* <button className="d-btn d-btn-profile" onClick={toggleNetworkList}>
                    <ClipIcon width="40px" height="40px" />

                    <span className="hide-mobile-s">BTC Testnet</span>
                </button> */}
        {/* {connected && balance && (
          <p className="!text-[2rem]">{`BTC : ${balance.total / 1e8}`}</p>
        )} */}

        {/* {!isMobileView_800 && (
          <button
            className="d-btn d-btn-outline d-btn-narrow flex items-center gap-6"
            onClick={connectWallet}
          >
            <WalletIcon viewBox="0 0 22 22" classes="icon-xs" />
            {!connected
              ? "Connect"
              : address?.slice(0, 5) + "..." + address?.slice(-5)}
          </button>
        )} */}

        {!toggleMobileMenu && isMobileView_800 && (
          <button
            onClick={() => setToggleMobileMenu(true)}
            className="hide-desktop"
          >
            <MobileMenuOpenIcon classes="icon-xs" viewBox="0 0 42 37" />
          </button>
        )}

        {toggleMobileMenu && isMobileView_800 && (
          <button
            onClick={() => setToggleMobileMenu(false)}
            className="hide-desktop"
          >
            <MobileMenuCloseIcon classes="icon-xs" viewBox="0 0 36 37" />
          </button>
        )}
      </header>
    </>
  );
}

export default Header;
