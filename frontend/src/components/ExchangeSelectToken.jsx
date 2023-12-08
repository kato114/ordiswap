import React, { useEffect, useState } from "react";
import DataList from "./DataList";
import { searchOptions } from "../assets/data";
import ordinalIcon from "../assets/icons/ordinals.svg";
import btcIcon from "../assets/icons/btc.png";
import reosIcon from "../assets/icons/reos.png";
import { useResponsiveView } from "../utils/customHooks";
import { useModalState } from "../context/ModalContext";

import down_img from "../assets/images/down.png";

function ExchangeSelectToken({
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
  ...props
}) {
  const isMobileView_500 = useResponsiveView(500);
  const { addModal, removeModal } = useModalState();
  const [toggleDataList, setToggleDataList] = useState(false);
  // const [selectedOption, setSelectedOption] = useState({
  //     tick: selectText,
  //     icon: btc,
  // });

  const [selectedOption, setSelectedOption] = useState(
    token ? token : { tick: selectText, icon: ordinalIcon }
  );

  useEffect(() => {
    if (!token) setSelectedOption({ tick: selectText, icon: ordinalIcon });
    else setSelectedOption(token);
  }, [token]);

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
    // console.log('SSSSSSSSSSS');
    const isNumber = /^[-+]?(\d+|\d*\.\d+|\d+\.\d*)([eE][-+]?\d+)?$/;
    let value = e.target.value;
    if (value == "" || isNumber.test(value)) {
      // console.log(value);
      if (value >= 21000000) value = "21000000";
      setAmount(value);
    }
  };

  return (
    <div className="w-full">
      {label && <p className="b-label text-[16px] mb-5">{label}</p>}
      <div
        className="select-item relative text-[14px] py-[10px] px-[10px] cursor-pointer w-full"
        onClick={handleToggleDataList}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="w-[22px] h-[22px] icon"
              src={
                selectedOption?.tick === "BTC"
                  ? btcIcon
                  : selectedOption?.tick === "reos"
                  ? reosIcon
                  : (() => {
                      const selectedItem = tokenDataList?.filter(
                        (item) =>
                          item.symbol.toLowerCase() ===
                          selectedOption?.tick.toLowerCase()
                      );
                      if (selectedItem && selectedItem.length > 0) {
                        return selectedItem[0].iconUrl + "?size=30x30";
                      }
                      return ordinalIcon;
                    })()
              }
              alt=""
              style={{ borderRadius: "50%" }}
            />
            <div className="pl-3">
              <div className="font-bold">
                {selectedOption?.tick || "Select"}
              </div>
              {/* <div className="text-[12px] text-[#6F767E]">
              {selectedOption?.tick === "BTC" ? "On Bitcoin" : "Ordinal"}
            </div> */}
            </div>
          </div>
          <img src={down_img} />
        </div>
        <div className="">
          {!disabled && (
            <DataList
              show={toggleDataList}
              options={list}
              handleBlur={handleDataListBlur}
              setSelectedOption={setSelectedOption}
              setToken={setToken}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ExchangeSelectToken;
