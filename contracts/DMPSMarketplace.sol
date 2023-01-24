// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DMPSMarketplace is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter ;

    Counters.Counter nft_counter ;
    Counters.Counter nft_sold_counter ;

    // address private owner ;
    uint256 private royalty_fee = 5 ;
    uint256 private max_supply = 5555 ;
    mapping(uint256 => nft) private nfts ;

    struct nft {
        uint256 nft_id ;
        string nft_name ;
        string nft_description ;
        string nft_uri ;
        uint256 nft_price ;
        address payable owner ;
        address payable seller ;
        bool sold ;
        // uint256 royalty ;
    }

    uint256 listing_price = 0.0035 ether ;

    constructor() ERC721("Deviants Silver Mint Pass", "DMPS") {
        // owner = payable(msg.sender) ;
    }

    function mintNFT(string memory name, string memory description, string memory uri, uint256 price) public payable returns(uint256){
        require(price > 0, "mintNFT: price is too low");
        require(msg.value == listing_price, "mintNFT: msg.value != listing_price") ;
        require(nft_counter.current() < max_supply, "mintNFT: overflow supply");

        nft_counter.increment() ;

        uint256 new_nft_id = nft_counter.current() ;

        _safeMint(msg.sender, new_nft_id) ;
        _setTokenURI(new_nft_id, uri);

        nfts[new_nft_id] = nft(
            new_nft_id,
            name,
            description,
            uri,
            price,
            payable(address(this)),
            payable(msg.sender),
            false
        );

        _transfer(msg.sender, address(this), new_nft_id);

        return new_nft_id ;
    }

    function fetchNFTs() public view returns(nft[] memory) {
        nft[] memory all_nfts = new nft[](nft_counter.current());

        for(uint256 i = 0 ; i < nft_counter.current() ; i++){
            all_nfts[i] = nfts[i+1] ;
        }

        return all_nfts ;
    }

}
