import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/icons/search.svg";
import ordinalIcon from "../assets/icons/ordinals.svg";
import btcIcon from "../assets/icons/btc.png";
import reosIcon from "../assets/icons/reos.png";

function useOutsideAlerter(ref, show, cb) {
  useEffect(() => {
    if (!show) return;
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, show]);
}
import { useAuthState } from "../context/AuthContext";
import CancelIcon from "../assets/icons/CancelIcon";

function DataList({
  options = [],
  placeholder = "Search",
  handleBlur,
  typeRadio = false,
  show,
  key = "",
  setToken,
  setSelectedOption,
}) {
  const [keyword, setKeyword] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options.slice(0, 100));
  const { authState, appContext } = useAuthState();
  const inputRef = useRef();
  const searchRef = useRef();
  const handleSearch = (e) => {
    const value = e.target.value.trim();
    if (value.length <= 4) {
      setKeyword(value);
      setFilteredOptions(
        options.filter((option) =>
          option.tick.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else if (value == "" || value.length == 0) {
      setFilteredOptions(options.slice(0, 100));
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    searchRef.current.focus();
    setKeyword("");
    setFilteredOptions(options.slice(0, 100));
  }, [show]);

  useEffect(() => {
    setFilteredOptions(options.slice(0, 100));
  }, [options]);

  useOutsideAlerter(inputRef, show, handleBlur);
  return (
    <section
      className="datalist__container"
      style={{ display: show ? "inline" : "none" }}
      ref={inputRef}
    >
      <div className="datalist__input">
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder={placeholder}
          value={keyword}
          onChange={handleSearch}
          ref={searchRef}
        />

        {typeRadio ? (
          <CancelIcon />
        ) : (
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        )}
      </div>

      <div className="datalist__options">
        {filteredOptions.map((option, index) => (
          <div
            className={`datalist__option ${
              typeRadio && option.value === authState.network ? "active" : ""
            }`}
            key={index}
            onClick={(e) => {
              setSelectedOption(option);
              handleBlur(e);
              setToken(option);
            }}
          >
            {option && (
              <>
                <div className="flex justify-between w-[100%]">
                  <div className="flex" style={{ alignItems: "center" }}>
                    <img
                      src={
                        option.tick === "BTC"
                          ? btcIcon
                          : option.tick === "REOS"
                          ? reosIcon
                          : (() => {
                              const selectedItem =
                                appContext?.tokenDataList?.filter(
                                  (item) =>
                                    item.symbol.toLowerCase() ===
                                    option.tick.toLowerCase()
                                );
                              if (selectedItem && selectedItem.length > 0) {
                                return selectedItem[0].iconUrl + "?size=30x30";
                              }
                              return ordinalIcon;
                            })()
                      }
                      alt={option.value}
                    />
                    <p className="px-[3px]">{option.tick}</p>
                  </div>
                  <div className="flex" style={{ alignItems: "center" }}>
                    <p>
                      {option.tick == "BTC"
                        ? option.balance.toFixed(4)
                        : option.balance.toFixed(1)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default DataList;
