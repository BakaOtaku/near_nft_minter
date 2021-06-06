#### Github submission Dao Link - https://www.sputnik.fund/#/dao/nft-onboarding.sputnikdao.near/proposals/82
#### Project Video Dao Link - https://www.sputnik.fund/#/dao/nft-onboarding.sputnikdao.near/proposals/81
#### Project presentation Dao Link - https://www.sputnik.fund/#/dao/nft-onboarding.sputnikdao.near/proposals/80
#### Project Ideation Dao Link - https://www.sputnik.fund/#/dao/nft-onboarding.sputnikdao.near/proposals/79
#### NEAR Forum Link - https://gov.near.org/t/github-submission-minting-dynamic-nfts-for-donors-to-india-crypto-relief-fund-using-chainlink-and-near/2722

<p align="center"><img src="https://user-images.githubusercontent.com/42104907/120896987-aa768500-c641-11eb-9b43-1a48ced94c3f.png" align="center" width="450"></p>
<h1 align="center">Near Nft Minter</h1>
<h6 align="center">Minting dynamic NFTs for donors to India Crypto Relief Fund using Chainlink and Near</h6>

### Motivation

India is facing a huge covid crisis. So there was a covid crypto relief fund setup by Polygon’s co-founder Sandeep Nailwal. Currently the fund has received over 1 Billion $ in donation. So we decided to reward the donors by creating dynamic NFTs based on their addresses using Chainlink.

### Idea and Product

##### What are NFTs ?

Registering unique assets and freely trading them on a common decentralized platform (blockchain) has standalone value. The limitation is that the blockchain creates its value of decentralized security by disconnecting from all other systems, meaning NFT-based assets do not interface with data and systems outside the blockchain (static). Oracles have the ability to resolve this connectivity problem by allowing NFTs to interact with the outside world.
The blockchain acts as a standardized medium for listing and trading non-fungible assets that are transparent, globally accessible, and more liquid. It also provides a protected environment to store a trusted set of historical records about an asset dating back to its provenance

##### Why Chainlink?

Oracles play an extremely important role in facilitating the full potential of smart contract utility. Without a reliable connection to real-world conditions, smart contracts are unable to effectively serve the real-world.
Oracles provide a bridge between the real-world and on-chain smart contracts, by being a source of data that smart contracts can rely on, and act upon.
So we use chainlink to fetch the transaction details of Ethereum to Near and create a dynamic NFT for the user.

Chainlink is a decentralized oracle network that securely and reliably connects smart contracts to external data and systems. By using multiple independent oracles to verify data and/or aggregating data from multiple sources, Chainlink’s oracle framework allows users to source and deliver data to their smart contracts without a single point of failure.
The value of assets is not static and therefore requires consistent updates when traded or used as collateral for loans and accreditation processes. Chainlink oracles provide a gateway to access external data sources that bring reliable valuations to these on-chain assets, whether that be through a trusted API, an aggregation of multiple sources, or crowdsourced.

##### Dynamic NFTs:

Dynamic NFTs that Respond to Data and Interface with Existing Infrastructure
The next evolution in NFTs is moving from static NFTs to dynamic NFTs— perpetual smart contracts that use oracles to communicate with and react to external data and systems. The oracle allows the NFT to use external data/systems as a mechanism for minting/burning NFTs, trading peer-to-peer, and checking state. For example, a smart contract that automates the minting of a limited edition digital soccer card if the oracle informs it that a player scored a hat-trick.

##### Process:

We make the nft requester sign a message from his Ethereum Metamask wallet so that we can recover his wallet address to fetch whether he has donated or not. Then we generate a Unique NFT for him on IPFS.

### Running the project on your machine

```bash
git clone git clone https://github.com/BakaOtaku/near_nft_minter

# Start the server
cd client
yarn install
yarn start
```

### Tech Stack:

Near, Chainlink, Ethereum, Node.js, React

## Team

- [ 👨🏻‍💻 Aniket Dixit](https://github.com/dixitaniket)
- [ 👨🏻‍🎓 Arpit Srivastava](https://github.com/fuzious)
- [ 🌊 Aman Raj](https://github.com/AmanRaj1608)

---
