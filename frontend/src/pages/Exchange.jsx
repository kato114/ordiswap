import React, { useEffect, useState } from "react";
import ExchangeSwap from "../components/ExchangeSwap";
import ExchangeAddLiquidity from "../components/ExchangeAddLiquidity";
import ExchangeRemoveLiquidity from "../components/ExchangeRemoveLiquidity";
import { useModalState } from "../context/ModalContext";

function Exchange() {
  const [exchange, setExchange] = useState("addLiquidity");
  const { modalState, openModal, closeModal } = useModalState();
  useEffect(() => {
    closeModal();
  }, []);

  const handleExchangeAction = (val) => {
    setExchange(val);
  };

  return (
    <section className="exchange__container">
      <section className="top relative">
        {exchange === "addLiquidity" && (
          <ExchangeAddLiquidity
            exchange={exchange}
            handleExchangeAction={handleExchangeAction}
          />
        )}
        {exchange === "removeLiquidity" && (
          <ExchangeRemoveLiquidity
            exchange={exchange}
            handleExchangeAction={handleExchangeAction}
          />
        )}
      </section>
    </section>
  );
}

export default Exchange;
