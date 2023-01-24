const NFTMarketplace = artifacts.require("NFTMarketplace");

module.exports = async function (deployer) {
  await deployer.deploy(NFTMarketplace);

  const deployedNFTMarketplace =  await NFTMarketplace.deployed() ;

  const nftMarketplace_address = deployedNFTMarketplace.address ;

  console.log("NFT Marketplace Address:", nftMarketplace_address);
};