const VINTOKEN = artifacts.require("VINTOKEN");

module.exports = async function (deployer) {
  await deployer.deploy(VINTOKEN);

  const deployedVINTOKEN = await VINTOKEN.deployed() ;

  console.log("VIN Token Address:", deployedVINTOKEN.address);
};