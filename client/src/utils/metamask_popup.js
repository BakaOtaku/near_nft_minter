export const avalanche_testnet = async () => {
  window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [{
      chainId: '', // A 0x-prefixed hexadecimal chainId
      chainName: 'NEAR',
      nativeCurrency: {
        name: 'NEAR',
        symbol: 'NEAR',
        decimals: 18
      },
      rpcUrls: [''],
      blockExplorerUrls: ['']
    }],
  });
}