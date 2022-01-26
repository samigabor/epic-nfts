# Epic Times

## Visible on Opeansea (Rinkeby)

1. https://testnets.opensea.io/collection/epic-v3 => with centralised hosted json and jpeg
2. https://testnets.opensea.io/collection/epic-v4 => with hard coded on-chain metadata
3. https://testnets.opensea.io/assets/epic-lg01hc4nut => with dynamic on-chain metadata
4. https://testnets.opensea.io/collection/epic-8i0glg1mky
5. https://testnets.opensea.io/collection/epic-ig9chy9fzd
6. https://testnets.opensea.io/collection/epicmoments-v3
7. 0xaBca23F52Dc35B3aDFFb0B7238A940108fc96aB2
8. https://testnets.opensea.io/collection/casual-thoughts-ideas-v2

## Run project locally

Create a `.env` file at root level and add the following variables:

- `ALCHEMY_API_KEY`
- `ALCHEMY_API_KEY_POLYGON`
- `ETHERSCAN_API_KEY`
- `METAMASK_PRIVATE_KEY`

## Deploy locally

`npx hardhat run scripts/deploy.js` - run the deploy script

## Depoy to Rinkeby

`npx hardhat run scripts/deploy.js --network rinkeby` - run the deploy script with network param

1. 0x2A9e3CC4d5ee5c6C50F9c47ED74a642E1F18a6f2
2. 0xB806dD81e19Ca6FAE4a5b3914e7442D40448f574
3. 0xF77777D11734798085965b94536DDb64DCA54159
4. 0x71902369D03Ec25D462fC1b69140e2DceFA06FdD => account 3
5. 0xf5B02FeeE91D85Ab9945598A2DBAb7783E5D487C => removed ownable
6. 0xBCB786a56709250bc72697d0E51308760d20A36E => refactor
7. 0xaBca23F52Dc35B3aDFFb0B7238A940108fc96aB2 => removed random feature
8. 0x60B09733238B21E856F3fB5c50EcB7dA98Ac711b

## Verify & Publish to [Etherscan](https://rinkeby.etherscan.io/address/0xf5B02FeeE91D85Ab9945598A2DBAb7783E5D487C#code)

```
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network [network] [contract address] [constructor params, if any]
```

## Deploy to GitHub pages

```
cd frontend
npm install gh-pages --save-dev
npm run deploy
```

## Add toast notifications

```
cd frontend
npm install --save react-toastify
```
