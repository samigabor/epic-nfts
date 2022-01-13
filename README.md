# Epic Times

## Visible on Opeansea

1. https://testnets.opensea.io/collection/epic-v3 => with centralised hosted json and jpeg
2. https://testnets.opensea.io/collection/epic-v4 => with hard coded on-chain metadata
3. https://testnets.opensea.io/assets/epic-lg01hc4nut => with dynamic on-chain metadata

## Run project locally

Create a `.env` file at root level and add the following variables:

- `ALCHEMY_API_KEY`
- `ETHERSCAN_API_KEY`
- `METAMASK_PRIVATE_KEY`

## Deploy locally

`npx hardhat run scripts/deploy.js` - run the deploy script

## Depoy to Rinkeby

`npx hardhat run scripts/deploy.js --network rinkeby` - run the deploy script with network param

1. 0x2A9e3CC4d5ee5c6C50F9c47ED74a642E1F18a6f2
2. 0xB806dD81e19Ca6FAE4a5b3914e7442D40448f574
3. 0xF77777D11734798085965b94536DDb64DCA54159

## Verify & Publish to etherscan

`npm install --save-dev @nomiclabs/hardhat-etherscan`
`npx hardhat verify --network [network] [contract address] [constructor params, if any]`
