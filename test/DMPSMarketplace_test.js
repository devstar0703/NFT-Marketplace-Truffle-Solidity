const ethers = require('ethers') ;

const DMPSMarketplace = artifacts.require('./DMPSMarketplace.sol') ;

require('chai')
    .use(require('chai-as-promised'))
    .should() ;

contract('Marketplace Contract', async () => {
    let nftMarketplace ;

    before(async () => {
        nftMarketplace = await DMPSMarketplace.deployed() ;
    });

    it('nft', async () => {
        let listingPrice = ethers.utils.parseUnits('0.0035', 'ether') ;

        // -------- create NFT -------------
        let price = ethers.utils.parseUnits('1.25', 'ether') ;
        await nftMarketplace.createNFT("image", "Bottle", "Created By MISUKA", "http://misuka.com/1.png", price, { value :  listingPrice.toString() }) ;

        price = ethers.utils.parseUnits('7.39', 'ether') ;
        await nftMarketplace.createNFT("video", "Bag", "Created By Dragon", "http://dragon.com/2.png", price, { value :  listingPrice.toString() }) ;

        price = ethers.utils.parseUnits('17.95', 'ether') ;
        await nftMarketplace.createNFT("sport", "Messi", "Created By Mickey", "http://mickey.com/messi.png", price, { value :  listingPrice.toString() }) ;
        
        // --------- operate Royalty Fee ------------
        await nftMarketplace.updateRoyaltyFee(7) ;
        let new_royalty_fee = await nftMarketplace.getRoyaltyFee() ;
        console.log("Royalty Fee: ", new_royalty_fee.toString()) ;

        let buyPrice = ethers.utils.parseUnits('7.39', 'ether') ;
        await nftMarketplace.buyNFT(2, {value : buyPrice.toString()}) ;

        let tokenUri = await nftMarketplace.tokenURI(1) ;
        console.log(tokenUri) ;

        let contract_balance = await nftMarketplace.getContractBalance() ;
        console.log(ethers.utils.formatUnits(contract_balance.toString())) ;

        let owner = await nftMarketplace.getOwnerAddress() ;
        console.log(owner) ;


        // -------- operate collection -----------
        let collection_names = await nftMarketplace.getCollectionNames() ;

        collection_names = await Promise.all(
            collection_names.map(async name => {
                return name ;
            })
        );

        console.log("---------- Collection Names ----------- \n", collection_names) ;

        let check_cname = await nftMarketplace.checkCollectionName('video') ;

        console.log("---------- Check Collection Name --------- \n", check_cname) ;

        let all_nfts = await nftMarketplace.fetchNFTs() ;

        all_nfts = await Promise.all(
            all_nfts.map(async nft => {
                let item = {
                    nft_id : nft.nft_id,
                    collection_name : nft.collection_name,
                    nft_name : nft.nft_name,
                    nft_description :  nft.nft_description,
                    nft_uri : nft.nft_uri,
                    nft_price : ethers.utils.formatUnits(nft.nft_price.toString(), 'ether') ,
                    owner : nft.owner,
                    seller : nft.seller,
                    sold : nft.sold
                }

                return item ;
            })
        );

        console.log("---------- All NFTs ------------- \n",all_nfts) ;

        let sold_nfts = await nftMarketplace.fetchSoldNFTs() ;

        sold_nfts = await Promise.all(
            sold_nfts.map(async nft => {
                let item = {
                    nft_id : nft.nft_id,
                    collection_name : nft.collection_name,
                    nft_name : nft.nft_name,
                    nft_description :  nft.nft_description,
                    nft_uri : nft.nft_uri,
                    nft_price : ethers.utils.formatUnits(nft.nft_price.toString(), 'ether') ,
                    owner : nft.owner,
                    seller : nft.seller,
                    sold : nft.sold
                }

                return item ;
            })
        );

        console.log("---------- Sold NFTs ---------- \n",sold_nfts) ;

        let unsold_nfts = await nftMarketplace.fetchUnsoldNFTs() ;

        unsold_nfts = await Promise.all(
            unsold_nfts.map(async nft => {
                let item = {
                    nft_id : nft.nft_id,
                    collection_name : nft.collection_name,
                    nft_name : nft.nft_name,
                    nft_description :  nft.nft_description,
                    nft_uri : nft.nft_uri,
                    nft_price : ethers.utils.formatUnits(nft.nft_price.toString(), 'ether') ,
                    owner : nft.owner,
                    seller : nft.seller,
                    sold : nft.sold
                }

                return item ;
            })
        );

        console.log("---------- Unsold NFTs ------------ \n",unsold_nfts) ;

        let my_nfts = await nftMarketplace.fetchMyNFTs() ;

        my_nfts = await Promise.all(
            my_nfts.map(async nft => {
                let item = {
                    nft_id : nft.nft_id,
                    collection_name : nft.collection_name,
                    nft_name : nft.nft_name,
                    nft_description :  nft.nft_description,
                    nft_uri : nft.nft_uri,
                    nft_price : ethers.utils.formatUnits(nft.nft_price.toString(), 'ether') ,
                    owner : nft.owner,
                    seller : nft.seller,
                    sold : nft.sold
                }

                return item ;
            })
        );

        console.log("---------- My NFTs ----------- \n",my_nfts) ;

    });
});