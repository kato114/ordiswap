// export const host = 'http://95.217.106.211:443'
// export const host = 'http://94.130.34.216:443'
export const host = "https://ordiswap-api.proskillowner.com";
// export const host = 'https://65.108.203.216:443'

export const factoryWalletApi = `${host}/getvaultaddress/`;
export const getWeightApi = `${host}/getfee/`;
export const tokenListApi = `${host}/tokenlist/`;
export const poolTokenListApi = `${host}/pooltokenlist/`;
export const tokenInfoApi = `${host}/tokeninfo/pooltokenlist`;
export const tokenDataListApi = `https://api.coinranking.com/v2/coins?tags[]=brc-20&limit=99`;
export const poolListApi = `${host}/getpool/`;
export const createPoolApi = `${host}/createpool`;
export const addLiquidityApi = `${host}/addliquidity`;
export const addLiquidityAmountApi = `${host}/addliquidity/tokenamount`;
export const removeLiquidityApi = `${host}/removeliquidity`;
export const removeLiquidityAmountApi = `${host}/removeliquidity/tokenamount`;
export const swapApi = `${host}/swap`;
export const swapAmountApi = `${host}/swap/tokenamount`;
export const getOrderListApi = `${host}/getorder/`;
export const getBalanceApi = `${host}/gettokenbalance/`;
export const deployTokenApi = `${host}/deploy/`;
export const getWhitelistApi = `${host}/getwhitelisttoken`;
export const updateOrderApi = `${host}/updateorder/`;
export const getAdminApi = `${host}/getadmin`;
export const getRewardsApi = (add) => {
  return `${host}/getbtcbalance/platform/${add}/list`;
};
export const withdrawApi = `${host}/withdrawbtc`;

export const BTCTestExplorerUrl = "https://mempool.space/testnet/tx/";
export const getTXInfoUrl = "https://mempool.space/testnet/api/tx/";
export const feeRateUrl =
  "https://mempool.space/testnet/api/v1/fees/recommended";

export const dayilyURL =
  "https://api.coingecko.com/api/v3/coins/ordinals/market_chart?vs_currency=usd&days=1";
export const weeklyURL =
  "https://api.coingecko.com/api/v3/coins/ordinals/market_chart?vs_currency=usd&days=7";
export const monthlyURL =
  "https://api.coingecko.com/api/v3/coins/ordinals/market_chart?vs_currency=usd&days=31";
export const yearlyURL =
  "https://api.coingecko.com/api/v3/coins/ordinals/market_chart?vs_currency=usd&days=365";
