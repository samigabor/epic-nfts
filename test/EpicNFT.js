const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EpicNFT", async () => {
  let owner, wallet1, wallet2;
  const royaltyAmount = ethers.utils.parseUnits("1", "ether"); // 1 * 10 ** 18
  let tokenContract, nftContract;

  beforeEach(async () => {
    [owner, wallet1, wallet2] = await ethers.getSigners();
    const EpicToken = await ethers.getContractFactory("EpicToken");
    tokenContract = await EpicToken.deploy();
    await tokenContract.deployed();

    await tokenContract.transfer(
      wallet1.address,
      ethers.utils.parseUnits("500", "ether")
    );
    await tokenContract.transfer(
      wallet2.address,
      ethers.utils.parseUnits("400", "ether")
    );

    const royaltyToken = tokenContract.address;
    const NFT = await ethers.getContractFactory("EpicNFT");
    nftContract = await NFT.deploy(royaltyToken, royaltyAmount);
    await nftContract.deployed();
  });

  it("should transfer 500 tokens to wallet1 and 400 tokens to wallet2", async () => {
    const balanceOwner = await tokenContract.balanceOf(owner.address);
    expect(balanceOwner.toString()).to.equal(
      ethers.utils.parseUnits("100", "ether").toString()
    );
    const balanceWallet1 = await tokenContract.balanceOf(wallet1.address);
    expect(balanceWallet1.toString()).to.equal(
      ethers.utils.parseUnits("500", "ether").toString()
    );
    const balanceWallet2 = await tokenContract.balanceOf(wallet2.address);
    expect(balanceWallet2.toString()).to.equal(
      ethers.utils.parseUnits("400", "ether").toString()
    );
  });

  it("should create the NFT contract", async () => {
    contractName = await nftContract.name();
    expect(contractName).to.equal("Random Thoughts");
    contractSymbol = await nftContract.symbol();
    expect(contractSymbol).to.equal("RT");
  });

  it("should mint an NFT for owner", async () => {
    let nftOwner;
    nftContract = nftContract.connect(owner);
    await nftContract.mintCustomNFT("test name", "test description");
    nftOwner = await nftContract.ownerOf(0);
    expect(nftOwner).to.equal(owner.address);
  });

  it("should transfer NFT from owner to wallet1 and NOT pay royalty", async () => {
    let nftOwner, balanceSender, balanceReceiver;

    // connect owner to contract and mint NFT to owner
    nftContract = nftContract.connect(owner);
    await nftContract.mintCustomNFT("test name 0", "test description 0");
    // transfer NFT from owner to wallet1
    await nftContract.transferFrom(owner.address, wallet1.address, 0);
    // verify that NFT now belongs to wallet1
    nftOwner = await nftContract.ownerOf(0);
    expect(nftOwner).to.equal(wallet1.address);
  });

  it("should transfer NFT from wallet1 to wallet2 and pay royalty", async () => {
    let nftOwner, balanceSender, balanceReceiver;

    // connect wallet1 to contract and mint NFT to wallet1
    nftContract = nftContract.connect(wallet1);
    await nftContract.mintCustomNFT("test name 1", "test description 1");

    // verify that NFT was minted to wallet1
    nftOwner = await nftContract.ownerOf(0);
    expect(nftOwner).to.equal(wallet1.address);

    // approve the NFT contract to spend royalty amount from wallet1 and transfer NFT to wallet2
    await tokenContract
      .connect(wallet1)
      .approve(nftContract.address, royaltyAmount);
    await nftContract
      .connect(wallet1)
      .transferFrom(wallet1.address, wallet2.address, 0);

    // verify that NFT now belongs to wallet2
    nftOwner = await nftContract.ownerOf(0);
    expect(nftOwner).to.equal(wallet2.address);

    // verify that owner received 1 token in royalty from NFT transfer
    const balanceOwner = await tokenContract.balanceOf(owner.address);
    expect(balanceOwner.toString()).to.equal(
      ethers.utils.parseUnits("101", "ether").toString()
    );
    // verify that wallet1 paid 1 token in royalty for NFT transfer
    const balanceWallet1 = await tokenContract.balanceOf(wallet1.address);
    expect(balanceWallet1.toString()).to.equal(
      ethers.utils.parseUnits("499", "ether").toString()
    );
  });
});
