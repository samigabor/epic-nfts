const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EpicToken", async () => {
  let owner, wallet1, wallet2;

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
  });

  it("owner should have 100 tokens", async () => {
    const balanceOwner = await tokenContract.balanceOf(owner.address);
    expect(balanceOwner.toString()).to.equal(
      ethers.utils.parseUnits("100", "ether").toString()
    );
  });

  it("wallet1 shound have 500 tokens", async () => {
    const balanceWallet1 = await tokenContract.balanceOf(wallet1.address);
    expect(balanceWallet1.toString()).to.equal(
      ethers.utils.parseUnits("500", "ether").toString()
    );
  });

  it("should transfer 400 tokens to wallet2", async () => {
    const balanceWallet2 = await tokenContract.balanceOf(wallet2.address);
    expect(balanceWallet2.toString()).to.equal(
      ethers.utils.parseUnits("400", "ether").toString()
    );
  });
});
