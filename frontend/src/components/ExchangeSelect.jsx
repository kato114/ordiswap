import React, { useEffect, useState } from "react";
import DataList from "./DataList";
import { searchOptions } from "../assets/data";
import ordinalIcon from "../assets/icons/ordinals.svg";
import btcIcon from "../assets/icons/btc.png";
import reosIcon from "../assets/icons/reos.png";
import { useResponsiveView } from "../utils/customHooks";
import { useModalState } from "../context/ModalContext";

function ExchangeSelect({
  amount,
  setAmount,
  token,
  setToken,
  list,
  tokenDataList,
  selectIcon,
  selectText,
  bordered,
  filled,
  label,
  value = true,
  disabled = false,
  inputDisabled = false,
  showBalance = false,
  page = "other",
  ...props
}) {
  const isMobileView_500 = useResponsiveView(500);
  const { addModal, removeModal } = useModalState();
  const [toggleDataList, setToggleDataList] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    token ? token : { tick: selectText, icon: ordinalIcon }
  );
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!token)
      setSelectedOption({ tick: selectText, icon: ordinalIcon, balance: 0 });
    else setSelectedOption(token);
  }, [token]);

  useEffect(() => {
    if (token) {
      setBalance(token.balance);
    }
  }, [list, token]);

  const handleToggleDataList = (e) => {
    e.preventDefault();
    if (isMobileView_500 && !toggleDataList) {
      addModal();
    }
    if (isMobileView_500 && toggleDataList) {
      removeModal();
    }

    setToggleDataList(!toggleDataList);
  };

  const handleDataListBlur = (e) => {
    setTimeout(() => {
      setToggleDataList(false);
      isMobileView_500 && removeModal();
    }, 100);
  };

  const handleChange = (e) => {
    const isNumber = /^[-+]?(\d+|\d*\.\d+|\d+\.\d*)([eE][-+]?\d+)?$/;
    let value = e.target.value;
    if (value == "" || isNumber.test(value)) {
      if (value >= 21000000) value = "21000000";
      if (token.tick == "BTC" && value < 1e-7 && value > 0)
        value = "0.00000001";
      setAmount(value);
    }
  };

  return (
    <div>
      {showBalance && (
        <div className="flex justify-between">
          <p className="b-label !font-medium !text-[14px] mb-2">amount</p>
          {token && (
            <div className="flex justify-between">
              <p
                className="b-label !font-medium !text-[14px] cursor-pointer"
                onClick={() => setAmount(selectedOption.balance)}
              >
                bal: {balance}
              </p>
            </div>
          )}
        </div>
      )}
      <div className={`exchange__select relative ${!value ? "full-w" : ""}`}>
        {page !== "swap" && (
          <div className="flex gap-3">
            <img
              src={
                selectedOption.tick == "BTC"
                  ? btcIcon
                  : selectedOption?.tick === "REOS"
                  ? reosIcon
                  : (() => {
                      const selectedItem = tokenDataList?.filter(
                        (item) =>
                          item.symbol.toLowerCase() ===
                          selectedOption.tick.toLowerCase()
                      );
                      if (selectedItem && selectedItem.length > 0) {
                        // console.log(selectedItem)
                        return selectedItem[0].iconUrl + "?size=30x30";
                      }
                      return ordinalIcon;
                    })()
              }
              alt=""
              className="icon"
              style={{ borderRadius: "50%" }}
            />
            <p>{selectedOption.tick}</p>
          </div>
        )}
        {value && (
          <input
            type="text"
            className={`value ${page !== "swap" ? "text-right" : "text-left"}`}
            placeholder={page !== "swap" ? 0 : "tokens to sell"}
            value={amount}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}

export default ExchangeSelect;
