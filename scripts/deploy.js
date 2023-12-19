const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("EpicNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);
};

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
