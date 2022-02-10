const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("EpicNFT");
  const royaltyToken = "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D"; // Rinkeby DAI
  const royaltyAmount = ethers.utils.parseUnits("1", "ether"); // 1 ERC20 token (e.g. 1 DAI/USDC/WETH)
  const nftContract = await nftContractFactory.deploy(
    royaltyToken,
    royaltyAmount
  );
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  const name = "Genesis NFT";
  const description =
    "Remember your thoughts and ideas by creating an unique NFT, personalized as you wish. Mark memorable events by minting your customized NFT on the Polygon network. Fully on-chain.";
  const txn = await nftContract.mintCustomNFT(name, description);
  // Wait for it to be mined.
  await txn.wait();
  console.log("Minted NFT");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
