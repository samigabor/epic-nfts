const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EpicNFT", async () => {
  let owner, wallet1, wallet2;
  let nftContract;

  beforeEach(async () => {
    [owner, wallet1, wallet2] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("EpicNFT");
    nftContract = await NFT.deploy();
    await nftContract.deployed();
  });

  it("should create the NFT contract", async () => {
    let contractName, contractSymbol;
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

  it("should mint an NFT to wallet1 and transfer it to wallet2", async () => {
    let nftOwner;
    // connect wallet1 to contract and mint NFT to wallet1
    nftContract = nftContract.connect(wallet1);
    await nftContract.mintCustomNFT("test name 0", "test description 0");

    // verify that NFT now belongs to wallet1
    nftOwner = await nftContract.ownerOf(0);
    expect(nftOwner).to.equal(wallet1.address);

    // transfer NFT from wallet1 to wallet2
    await nftContract.transferFrom(wallet1.address, wallet2.address, 0);

    // verify that NFT now belongs to wallet2
    nftOwner = await nftContract.ownerOf(0);
    expect(nftOwner).to.equal(wallet2.address);
  });
});
