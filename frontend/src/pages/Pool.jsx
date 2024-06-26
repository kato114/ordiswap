import React, { useEffect, useState } from "react";
import SettingsIcon from "../assets/icons/SettingsIcon";
import RefreshIcon from "../assets/icons/RefreshIcon";
import arrowDown from "../assets/icons/arrowDown.svg";
import ordinals from "../assets/icons/ordinals.svg";
import ExchangeSelect from "../components/ExchangeSelect";
import DataTable from "../components/DataTable";
import { useAuthState } from "../context/AuthContext";
import { useModalState } from "../context/ModalContext";
import ReactPortal from "../components/ReactPortal";
import { useToast } from "../hooks/useToast";
import { createPoolApi } from "../utils/apiRoutes";
import axios from "axios";
import { fakeOrderList } from "../utils/fakeData";
import { createColumnHelper } from "@tanstack/react-table";
import { formatOrderStatus, formatTime, sleep } from "../utils/constants";
import Filters from "../components/Filters";
import OrderStatus from "../components/customComponents/OrderStatus";
import PoolRender from "../components/customComponents/PoolRender";
import BlockScan from "../components/customComponents/BlockScan";
import ArrowDownIcon from "../components/customComponents/ArrowDownIcon";
import ExchangeSelectToken from "../components/ExchangeSelectToken";
import Modal from "../components/Modal";

import liquidity_img from "../assets/images/liquidity.png";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("no", {
    header: () => <span>No</span>,
    cell: (info) => info.getValue(),
    width: "20px",
  }),
  columnHelper.accessor("fee_txid", {
    header: () => "Transaction",
    cell: (info) => <BlockScan transaction={info.getValue()} />,
  }),
  columnHelper.accessor("fee_rate", {
    header: () => <span>Fee Rate</span>,
  }),
  columnHelper.accessor((row) => row.ordered_time, {
    header: () => <span>Ordered Time</span>,
    id: "orderedTime",
    cell: (info) => <i>{formatTime(info.getValue())}</i>,
  }),
  columnHelper.accessor("token1", {
    header: "Token Pair",
    cell: (props) => <PoolRender record={props.row.original} />,
  }),
  columnHelper.accessor("lp_token", {
    header: "LP Token",
  }),
  columnHelper.accessor("order_status", {
    header: "Order Status",
    cell: (info) => <OrderStatus status={info.getValue()} />,
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
];

function Pool() {
  const { messageApi } = useToast();
  const { unisatContext, appContext } = useAuthState();
  const {
    unisatWallet,
    connected,
    setUnisatInstalled,
    address,
    network,
    balance,
    connectWallet,
    checkConnect,
  } = unisatContext;
  const {
    factoryWallet,
    calculateFee,
    tokenList,
    tokenSelectList,
    tokenOne,
    tokenTwo,
    setTokenOne,
    setTokenTwo,
    orderList,
    loadOrderList,
    currentPool,
    whiteist,
    tokenDataList,
  } = appContext;

  const [lPTokenTick, setLPTokenTick] = useState("");
  const [lPMax, setLPMax] = useState("");

  const { modalState, openModal, closeModal } = useModalState();
  const [isLoading, setIsLoading] = useState(false);
  const [posChange, setPosChange] = useState(false);
  const [hint, setHint] = useState("LP Token to Deploy");
  const [showFeeReteModal, setShowFeeRateModal] = useState(false);
  const [feeRate, setFeeRate] = useState(1);
  useEffect(() => {
    closeModal();
    return async () => {
      closeModal();
      await sleep(0.1);
    };
  }, []);

  useEffect(() => {
    // console.log('currentPool :>> ', currentPool);
    if (currentPool) {
      setLPTokenTick(currentPool.lp_token);
    } else {
      setLPTokenTick("");
    }
  }, [currentPool]);

  const handleLPTokenTick = (e) => {
    const value = e.target.value.trim();
    if (value.length <= 4) setLPTokenTick(value);
  };

  const handleLPMax = (e) => {
    const isNumber = /^-?\d*\.?\d+$/;
    let value = e.target.value;
    if (value == "" || isNumber.test(value)) {
      if (value >= 21000000) value = "21000000";
      setLPMax(value);
    }
  };

  const handleCreatePool = async () => {
    setIsLoading(true);
    const walletCheck = await checkConnect();
    // console.log('walletCheck :>> ', walletCheck);

    if (!walletCheck) return;
    if (!tokenOne || !tokenTwo) {
      messageApi.notifyWarning("Please Select tokens");
      return;
    }
    try {
      const closer = messageApi.notifyWarning(
        `Ordering new liquidity pool for ${tokenOne.tick.toUpperCase()}/${tokenTwo.tick.toUpperCase()}`,
        6
      );

      const tx_id = await unisatWallet.sendBitcoin(
        factoryWallet,
        calculateFee(feeRate).create_pool_fee
      );
      const body = {
        sender_address: address,
        fee_txid: tx_id,
        fee_rate: feeRate,
        token1: tokenOne.tick,
        token2: tokenTwo.tick,
        lp_token: lPTokenTick,
        lp_token_max_supply: Number(lPMax),
      };
      // console.log('window.unisat :>> ', body);
      const { data } = await axios({
        method: "post",
        url: createPoolApi,
        withCredentials: false,
        data: body,
      });
      // console.log('createPool', data);
      if (data.status == "success") {
        closer();
        messageApi.notifySuccess(
          "Create pool order is successfully listed!",
          5
        );
        await loadOrderList();
        await sleep(1);
      } else {
        messageApi.notifyFailed("Faile!" + data.message);
      }
    } catch (error) {
      console.log(error);
      messageApi.notifyFailed("User canceled order");
    }
    setIsLoading(false);
    closeModal();
  };

  const handleCreatePoolBtn = (e) => {
    let hint;
    e.preventDefault();
    if (currentPool) {
      messageApi.notifyWarning("Pool already exists!");
      return;
    }
    if (!tokenOne || !tokenTwo) {
      messageApi.notifyWarning("Please Select tokens.");
      return;
    }

    if (lPTokenTick.length < 4) {
      messageApi.notifyWarning("Please input LP token tick.");
      return;
    }
    if (
      tokenList.find(
        (token) => token.tick.toUpperCase() === lPTokenTick.toUpperCase()
      )
    ) {
      messageApi.notifyWarning(`${lPTokenTick} was already deployed`);
      return;
    }
    if (lPMax == "") {
      messageApi.notifyWarning("Please input LP token max supply.");
      return;
    }
    // openModal();
    setShowFeeRateModal(true);
  };

  const CreatePoolBtn = () => {
    if (!connected)
      return (
        <button
          className="btn w-full mt-[20px] center-margin active"
          onClick={(e) => {
            e.preventDefault();
            connectWallet();
          }}
        >
          Connect wallet
        </button>
      );
    return (
      <button
        className="btn w-full mt-[20px] center-margin active"
        onClick={handleCreatePoolBtn}
      >
        Create a new pool
      </button>
    );
  };

  useEffect(() => {
    let hint = "";
    if (!tokenTwo || !tokenOne) {
      hint = "LP Token to Deploy";
    } else {
      if (currentPool) hint = "Pool already exists.";
    }
    setHint(hint);
  }, [tokenOne, tokenTwo, currentPool]);

  const onCloseFeeRateModal = (e) => {
    setShowFeeRateModal(false);
  };

  const onConfirmFeeRate = (feeRate) => {
    setFeeRate(feeRate);
    openModal();
    setShowFeeRateModal(false);
  };

  return (
    <>
      {showFeeReteModal && (
        <Modal onClose={onCloseFeeRateModal} onConfirm={onConfirmFeeRate} />
      )}
      {modalState.open && (
        <ReactPortal>
          <section className="modal__content">
            <p>
              Are you sure to create a new pool for {tokenOne?.tick}/
              {tokenTwo.tick} with a service fee of{" "}
              {calculateFee(feeRate).create_pool_fee / 1e8} BTC?
            </p>

            <div className="btn-group">
              <button className="btn w-full" onClick={handleCreatePool}>
                {isLoading && <span className="loader-animation"></span>}
                Yes
              </button>
              <button
                className="btn w-full"
                onClick={() => {
                  closeModal();
                  setIsLoading(false);
                }}
              >
                No
              </button>
            </div>
          </section>
        </ReactPortal>
      )}
      <section className="pool__container">
        <section className="pool__content center-margin">
          <h3 className="text-center">Create a new pool</h3>

          <div className="swap__form center-margin mt-16">
            <div className="mb-3 flex flex-col md:flex-row gap-0 md:gap-8 relative">
              {!posChange && (
                <ExchangeSelectToken
                  token={tokenOne}
                  setToken={setTokenOne}
                  list={tokenSelectList[0]}
                  selectText={"Select Token"}
                  bordered={true}
                  value={false}
                  label="from"
                  selectIcon={ordinals}
                  tokenDataList={tokenDataList}
                />
              )}
              {!posChange && (
                <div className="flex items-center justify-center mt-3 md:mt-[30px]">
                  <img
                    className="cursor-pointer min-w-[32px]"
                    src={liquidity_img}
                    onClick={() => {
                      setPosChange((prev) => !prev);
                      const temp = tokenOne;
                      setTokenOne(tokenTwo);
                      setTokenTwo(temp);
                      const tempAmount = tokenOneAmount;
                      setTokenOneAmount(tokenTwoAmount);
                      setTokenTwoAmount(tempAmount);
                    }}
                  />
                </div>
              )}
              <ExchangeSelectToken
                token={posChange ? tokenOne : tokenTwo}
                setToken={posChange ? setTokenOne : setTokenTwo}
                list={posChange ? tokenSelectList[0] : tokenSelectList[1]}
                selectText={"Select Token"}
                bordered={true}
                label={posChange ? "from" : "to"}
                value={false}
                inputDisabled={true}
                tokenDataList={tokenDataList}
              />
              {posChange && (
                <div className="flex items-center justify-center mt-3 md:mt-[30px]">
                  <img
                    className="cursor-pointer min-w-[32px]"
                    src={liquidity_img}
                    onClick={() => {
                      setPosChange((prev) => !prev);
                      const temp = tokenOne;
                      setTokenOne(tokenTwo);
                      setTokenTwo(temp);
                      const tempAmount = tokenOneAmount;
                      setTokenOneAmount(tokenTwoAmount);
                      setTokenTwoAmount(tempAmount);
                    }}
                  />
                </div>
              )}
              {posChange && (
                <ExchangeSelectToken
                  token={tokenTwo}
                  setToken={setTokenTwo}
                  list={tokenSelectList[1]}
                  selectText={"Select Token"}
                  bordered={true}
                  label="to"
                  value={false}
                  selectIcon={ordinals}
                  tokenDataList={tokenDataList}
                />
              )}
            </div>
            <div
              className="d-divider w-full"
              style={{ borderColor: "#2c2e37" }}
            ></div>
            <div className="token__container">
              <div className="token__container__input">
                <input
                  type="text"
                  name="tokenName"
                  id="tokenName"
                  placeholder="Token Tick"
                  autoComplete="off"
                  value={lPTokenTick}
                  onChange={handleLPTokenTick}
                  disabled={currentPool}
                />
                <input
                  type="text"
                  name="maxSupply"
                  id="maxSupply"
                  placeholder="Max Supply"
                  autoComplete="off"
                  value={lPMax}
                  onChange={handleLPMax}
                  disabled={currentPool}
                />
              </div>
            </div>
            <CreatePoolBtn />
          </div>
        </section>

        <section className="table__container mb-14">
          {/* <header className="flex items-center">
                    <Filters />
                </header> */}

          <DataTable
            type={1}
            dataSource={orderList}
            columns={columns}
            title="Create new pool Order List"
          />
        </section>
      </section>
    </>
  );
}

export default Pool;
