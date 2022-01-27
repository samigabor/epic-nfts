const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("EpicNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  const name = "Ideas to be remembered!";
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
