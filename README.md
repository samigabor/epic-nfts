# Epic Times

## Visible on Opeansea

- [Rinkeby Test Network](https://testnets.opensea.io/collection/casual-thoughts-ideas-v2)
- [Polygon Mainnet](https://opensea.io/collection/randomthoughts-v2)

## Latest deployments:

`npx hardhat run scripts/deploy.js [--network]`

- [Rinkeby Test Network](https://rinkeby.etherscan.io/address/0x60B09733238B21E856F3fB5c50EcB7dA98Ac711b)
- [Matic Mainnet](https://polygonscan.com/address/0xE286EEB19839E6FE1df4EaAF773f7941211efEcE)

## Verified & Published On:

`npm install --save-dev @nomiclabs/hardhat-etherscan`

`npx hardhat verify --network [network] [contract address] [constructor params, if any]`

- [Rinkeby Test Network](https://rinkeby.etherscan.io/address/0x60b09733238b21e856f3fb5c50ecb7da98ac711b#code)

## Run project locally

Create a `.env` file at root level and add the following variables:

- `ALCHEMY_API_KEY`
- `ALCHEMY_API_KEY_ROPSTEN`
- `ALCHEMY_API_KEY_POLYGON`
- `ETHERSCAN_API_KEY`
- `METAMASK_PRIVATE_KEY`
