use borsh::{BorshDeserialize, BorshSerialize};
use near_sdk::{env, ext_contract, near_bindgen, AccountId};
use near_sdk::collections::TreeMap;
use near_sdk::collections::UnorderedMap;
use near_sdk::collections::UnorderedSet;

use base64::{decode};
use std::str;
use near_sdk::json_types::U128;
use std::collections::HashMap;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
const SINGLE_CALL_GAS: u64 = 200_000_000_000_000;

pub type Base64String = String;
// let mut uri


#[ext_contract(ext_oracle)]
pub trait ExtOracleContract {
    fn request(&mut self, payment: U128, spec_id: Base64String, callback_address: AccountId, callback_method: String, nonce: U128, data_version: U128, data: Base64String);
}

// #[near_bindgen]
// #[derive(BorshDeserialize, BorshSerialize)]
// struct ClientContract {
//     // Note: for this simple demo we'll store the oracle node in state like this
//     // There's no reason why client contracts can't call various oracle contracts.
//     oracle_account: AccountId,
//     nonce: u128,
//     received: TreeMap<u128, String>,
// }

// impl Default for ClientContract {
//     fn default() -> Self {
//         panic!("Oracle client should be initialized before usage")
//     }
// }

// #[near_bindgen]
// impl ClientContract {
//     #[allow(dead_code)]
//     #[init]
//     pub fn new(oracle_account: AccountId) -> Self {
//         Self {
//             oracle_account,
//             nonce: 0_u128,
//             received: TreeMap::new(b"r".to_vec()),
//         }
//     }

//     /// symbol: Base64-encoded token symbol
//     #[allow(dead_code)] // This function gets called from the oracle
//     pub fn get_token_price(&mut self, symbol: String, spec_id: Base64String) -> U128 {
//         // For the sake of demo, a few hardcoded values
//         let payment = U128(1);
//         self.nonce += 1;
//         let nonce: U128 = self.nonce.into();
//         ext_oracle::request(payment, spec_id, env::current_account_id(), "token_price_callback".to_string(), nonce, U128(1), symbol, &self.oracle_account, 0, SINGLE_CALL_GAS);
//         U128(self.nonce)
//     }
    


//     #[allow(dead_code)] // This function gets called from the oracle
//     pub fn token_price_callback(&mut self, nonce: U128, answer: Base64String) {
//         let ipfs_hash = match str::from_utf8(answer.as_bytes()) {
//             Ok(val) => val,
//             Err(_) => env::panic(b"Invalid UTF-8 sequence provided from oracle contract."),
//         };
        
//         let decoded_ipfs_hash = decode(ipfs_hash).unwrap();
//         let readable_hash = match str::from_utf8(decoded_price_vec.as_slice()) {
//             Ok(val) => val,
//             Err(_) => env::panic(b"Invalid UTF-8 sequence in Base64 decoded value."),
//         };

//         env::log(format!("Client contract ipfs hash returned: {:?}",readable_hash ).as_bytes());
//         self.received.insert(&nonce.0, &price_readable.to_string());
        

//     }

//     // using String instead of U128 because
//     // the trait `std::cmp::Eq` is not implemented for `near_sdk::json_types::integers::U128`
//     #[allow(dead_code)]
//     pub fn get_received_vals(&self, max: U128) -> HashMap<String, String> {
//         let mut counter: u128 = 0;
//         let mut result: HashMap<String, String> = HashMap::new();
//         for answer in self.received.iter() {
//             if counter == max.0 || counter > self.received.len() as u128 {
//                 break;
//             }
//             result.insert(answer.0.to_string(), answer.1);
//             counter += 1;
//         }
//         result
//     }

//     #[allow(dead_code)]
//     pub fn get_received_val(&self, nonce: U128) -> String {
//         let nonce_u128: u128 = nonce.into();
//         self.received.get(&nonce_u128).unwrap_or("-1".to_string())
//     }
// }

pub trait NEP4 {
    // Grant the access to the given `accountId` for the given `tokenId`.
    // Requirements:
    // * The caller of the function (`predecessor_id`) should have access to the token.
    fn grant_access(&mut self, escrow_account_id: AccountId);

    // Revoke the access to the given `accountId` for the given `tokenId`.
    // Requirements:
    // * The caller of the function (`predecessor_id`) should have access to the token.
    fn revoke_access(&mut self, escrow_account_id: AccountId);

    // Transfer the given `tokenId` to the given `accountId`. Account `accountId` becomes the new owner.
    // Requirements:
    // * The caller of the function (`predecessor_id`) should have access to the token.
    fn transfer_from(&mut self, owner_id: AccountId, new_owner_id: AccountId, token_id: TokenId); 

    // Transfer the given `tokenId` to the given `accountId`. Account `accountId` becomes the new owner.
    // Requirements:
    // * The caller of the function (`predecessor_id`) should be the owner of the token. Callers who have
    // escrow access should use transfer_from.
    fn transfer(&mut self, new_owner_id: AccountId, token_id: TokenId); 

    // Returns `true` or `false` based on caller of the function (`predecessor_id) having access to the token
    fn check_access(&self, account_id: AccountId) -> bool;

    // Get an individual owner by given `tokenId`.
    fn get_token_owner(&self, token_id: TokenId) -> String;
}

/// The token ID type is also defined in the NEP
pub type TokenId = u64;
pub type Hash = String;
pub type AccountIdHash = Vec<u8>;

// Begin implementation
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]

pub struct NonFungibleTokenBasic {
    pub token_to_account: UnorderedMap<TokenId, AccountId>,
    pub token_to_hash : UnorderedMap<TokenId,Hash>,
    pub account_gives_access: UnorderedMap<AccountIdHash, UnorderedSet<AccountIdHash>>,
     // Vec<u8> is sha256 of account, makes it safer and is how fungible token also works
    oracle_account: AccountId,
    owner_oracle_id:AccountId,
    nonce: u128,
    received: TreeMap<u128, String>,
}


#[near_bindgen]
impl NonFungibleTokenBasic {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        assert!(env::is_valid_account_id(owner_id.as_bytes()), "Owner's account ID is invalid.");
        assert!(!env::state_exists(), "Already initialized");
        Self {
            token_to_account: UnorderedMap::new(b"token-belongs-to".to_vec()),
            token_to_hash: UnorderedMap::new(b"hash-here".to_vec()),
            account_gives_access: UnorderedMap::new(b"gives-access".to_vec()),
            owner_oracle_id: owner_id.clone(),
            oracle_account : owner_id.clone(),
            nonce: 0_u128,
            received: TreeMap::new(b"r".to_vec()),
            
        }
        
    }



}

#[near_bindgen]
impl NonFungibleTokenBasic {
    fn grant_access(&mut self, escrow_account_id: AccountId) {
        let escrow_hash = env::sha256(escrow_account_id.as_bytes());
        let predecessor = env::predecessor_account_id();
        let predecessor_hash = env::sha256(predecessor.as_bytes());

        let mut access_set = match self.account_gives_access.get(&predecessor_hash) {
            Some(existing_set) => {
                existing_set
            },
            None => {
                UnorderedSet::new(b"new-access-set".to_vec())
            }
        };
        access_set.insert(&escrow_hash);
        self.account_gives_access.insert(&predecessor_hash, &access_set);
    }

    fn revoke_access(&mut self, escrow_account_id: AccountId) {
        let predecessor = env::predecessor_account_id();
        let predecessor_hash = env::sha256(predecessor.as_bytes());
        let mut existing_set = match self.account_gives_access.get(&predecessor_hash) {
            Some(existing_set) => existing_set,
            None => env::panic(b"Access does not exist.")
        };
        let escrow_hash = env::sha256(escrow_account_id.as_bytes());
        if existing_set.contains(&escrow_hash) {
            existing_set.remove(&escrow_hash);
            self.account_gives_access.insert(&predecessor_hash, &existing_set);
            env::log(b"Successfully removed access.")
        } else {
            env::panic(b"Did not find access for escrow ID.")
        }
    }

    fn transfer(&mut self, new_owner_id: AccountId, token_id: TokenId) {
        let token_owner_account_id = self.get_token_owner(token_id);
        let predecessor = env::predecessor_account_id();
        if predecessor != token_owner_account_id {
            env::panic(b"Attempt to call transfer on tokens belonging to another account.")
        }
        self.token_to_account.insert(&token_id, &new_owner_id);
    }

    fn transfer_from(&mut self, owner_id: AccountId, new_owner_id: AccountId, token_id: TokenId) {
        let token_owner_account_id = self.get_token_owner(token_id);
        if owner_id != token_owner_account_id {
            env::panic(b"Attempt to transfer a token from a different owner.")
        }

        if !self.check_access(token_owner_account_id) {
            env::panic(b"Attempt to transfer a token with no access.")
        }
        self.token_to_account.insert(&token_id, &new_owner_id);
    }

    fn check_access(&self, account_id: AccountId) -> bool {
        let account_hash = env::sha256(account_id.as_bytes());
        let predecessor = env::predecessor_account_id();
        if predecessor == account_id {
            return true;
        }
        match self.account_gives_access.get(&account_hash) {
            Some(access) => {
                let predecessor = env::predecessor_account_id();
                let predecessor_hash = env::sha256(predecessor.as_bytes());
                access.contains(&predecessor_hash)
            },
            None => false
        }
    }

    fn get_token_owner(&self, token_id: TokenId) -> String {
        match self.token_to_account.get(&token_id) {
            Some(owner_id) => owner_id,
            None => env::panic(b"No owner of the token ID specified")
        }
    }

    fn mint_token(&mut self, owner_id: AccountId, token_id: TokenId,eth_hash: Base64String) {
        // make sure that only the owner can call this funtion
        // self.only_owner();
        // Since Map doesn't have `contains` we use match
        let token_check = self.token_to_account.get(&token_id);
        if token_check.is_some() {
            env::panic(b"Token ID already exists.")
        }

        let payment = U128(1);
        self.nonce += 1;
        let nonce: U128 = self.nonce.into();
        self.token_to_account.insert(&token_id, &owner_id);
        
        ext_oracle::request(payment, eth_hash.clone(), env::current_account_id(), "mint_token_fallback".to_string(), nonce, U128(1), eth_hash.clone(), &self.oracle_account, 0, SINGLE_CALL_GAS);
        
        U128(self.nonce);
        // No token with that ID exists, mint and add token to data -to_hashstructures
        
        
    }


    #[allow(dead_code)] // This function gets called from the oracle
    pub fn mint_token_fallback(&mut self, answer: Base64String, owner_id:AccountId,token_id: TokenId) {
        
        self.nonce += 1;
        let nonce: U128 = self.nonce.into();

        if(owner_id!=self.oracle_account){
            env::panic(b"this call is not made by ")
        }
        let ipfs_hash = match str::from_utf8(answer.as_bytes()) {
            Ok(val) => val,
            Err(_) => env::panic(b"Invalid UTF-8 sequence provided from oracle contract."),
        };
        
        let decoded_ipfs_hash = decode(ipfs_hash).unwrap();
        let readable_hash = match str::from_utf8(&decoded_ipfs_hash.as_slice()) {
            Ok(val) => val,
            Err(_) => env::panic(b"Invalid UTF-8 sequence in Base64 decoded value."),
        };

        env::log(format!("Client contract ipfs hash returned: {:?}",readable_hash ).as_bytes());
        self.received.insert(&nonce.0, &readable_hash.to_string());
        self.token_to_hash.insert(&token_id,&readable_hash.to_string());
        
        

    }

    // fn only_owner(&mut self) {
    //     assert_eq!(env::predecessor_account_id(), self., "Only contract owner can call this method.");
    // }

}

/// Methods not in the strict scope of the NFT spec (NEP4)
// #[near_bindgen]
// impl NonFungibleTokenBasic {
//     /// Creates a token for owner_id, doesn't use autoincrement, fails if id is taken

// }



#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::{MockedBlockchain, StorageUsage};
    use near_sdk::{testing_env, VMContext};
    use base64::{encode};

    fn link() -> AccountId { "link_near".to_string() }

    fn alice() -> AccountId { "alice_near".to_string() }

    fn bob() -> AccountId { "bob_near".to_string() }
    fn oracle() -> AccountId { "oracle.testnet".to_string() }

    fn get_context(signer_account_id: AccountId, storage_usage: StorageUsage) -> VMContext {
        VMContext {
            current_account_id: alice(),
            signer_account_id,
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: alice(),
            input: vec![],
            block_index: 0,
            block_timestamp: 0,
            epoch_height: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view: false,
            output_data_receivers: vec![],
        }
    }

    // #[test]
    // fn test_token_price() {
    //     let context = get_context(alice(), 0);
    //     testing_env!(context);
    //     let mut contract = ClientContract::new(oracle() );
    //     let mut returned_nonce = contract.get_token_price("eyJnZXQiOiJodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS9wcmljZT9mc3ltPUVUSCZ0c3ltcz1VU0QiLCJwYXRoIjoiVVNEIiwidGltZXMiOjEwMH0".to_string(), "dW5pcXVlIHNwZWMgaWQ=".to_string());
    //     assert_eq!(U128(1), returned_nonce);
    //     returned_nonce = contract.get_token_price("eyJnZXQiOiJodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS9wcmljZT9mc3ltPUVUSCZ0c3ltcz1VU0QiLCJwYXRoIjoiVVNEIiwidGltZXMiOjEwMH0".to_string(), "dW5pcXVlIHNwZWMgaWQ=".to_string());
    //     assert_eq!(U128(2), returned_nonce);
    // }
}
