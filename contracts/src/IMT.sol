// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Poseidon2,Field} from "../lib/poseidon2-evm/src/Poseidon2.sol";
contract IMT{
    uint32 public  immutable i_depth;
    Poseidon2 public immutable i_hasher;
    mapping(uint32=>bytes32) public s_roots;
    uint32 public constant ROOT_HISTORY_SIZE=30;
    uint32 public s_currentRootIndex;
    uint32 public s_nextLeafIndex;
    mapping(uint32=>bytes32) public s_cacheSubtrees;
    error IncrementalMerkleTree_DepthShouldBeGreaterThanZero();
    error IncrementalMerkleTree_DepthShouldBeLessThan32();
    error IncrementalMerkleTree_TreeIsFull(uint32 nextLeafIndex);
    constructor(uint32 _depth,Poseidon2 _hasher){
        if(_depth==0){
            revert IncrementalMerkleTree_DepthShouldBeGreaterThanZero();
        }
        if(_depth>=32){
            revert IncrementalMerkleTree_DepthShouldBeLessThan32();

        }
        i_depth = _depth;
        i_hasher = _hasher;
        //initialize the tree with zeros (precompute) the zero subtrees
        //store the initial root in storage
        s_roots[0]=zeros(_depth);//store the ID 0 root as the depth zero

    }

    function _insert(bytes32 _leaf) internal returns(uint32 insertedIndex){
        //add the leaf to the incremental merkle tree
        uint32 _nextLeafIndex=s_nextLeafIndex;
        //check that the index of the leaf is less than 2^depth(within the maximum index)
        if(_nextLeafIndex == (uint32(1)<<i_depth)){
            revert IncrementalMerkleTree_TreeIsFull(_nextLeafIndex);
        }
        //figure out if the index is even
        uint32 currentIndex=_nextLeafIndex;
        bytes32 currentHash=_leaf;
        bytes32 left;
        bytes32 right;
         for(uint32 i=0;i<i_depth;i++){
            // if even,we need to put it on the left the hash and a zero tree on the right store the result as a cached subtree
            if(currentIndex%2==0){
                left=currentHash;
                right=zeros(i);
                s_cacheSubtrees[i]=currentHash;

            }
            // if odd,we need to put it on the right the hash and a zero tree on the left store the result as a cached subtree
            else{
                left=s_cacheSubtrees[i];
                right=currentHash;
            }
            //do the hash
            //hash(left,right) 
            currentHash=Field.toBytes32(i_hasher.hash_2(Field.toField(left),Field.toField(right)));
            
            //update the current index
            currentIndex=currentIndex/2;


         }
         //store the root in storage
         uint32 newRootIndex=(s_currentRootIndex+1)%ROOT_HISTORY_SIZE;
         s_currentRootIndex=newRootIndex;
           s_roots[newRootIndex]=currentHash;
         //increment the next leaf index
            s_nextLeafIndex=_nextLeafIndex+1;
            return _nextLeafIndex;
        
        

    }
    function zeros(uint32 i) public  pure returns(bytes32){
        if (i==0) return bytes32( 0x27f647825f3fe6ddc3141d33da09d0f23093ffb0c9147c638ed0d2d377d118e3);
        else if(i==1) return bytes32(0x1c623a46645d41e0ede64cc1544ad96782569a874387c09c192e285738a67718);
        else if(i==2) return bytes32(0x2bf976a7412de58c78d4f62d09890475e0af18ea01a9a329231db0618e357846);
        else if(i==3) return bytes32(0x097046819a47fc8416cf3397bdbf079a4e6580b2a8fbde91b8924684d897abbf);
        else if(i==4) return bytes32(0x0e822453eace0707a92724fb9ad7686de2199da692eb9ae72a1aa1f25e77b1b0);
        else if(i==5) return bytes32(0x211373b15a320ba5af8176e9ecddcb541cc33e74ff76b49b279fec67a8b6e1c3);
        else if(i==6) return bytes32(0x1805e7c7acfa6d7a82b43ea4002b54b82d6b4ebecf5261be6bd441dbeb28c60f);
        else if(i==7) return bytes32(0x17c835882f2a07dae9720ed25f931dd418d5c3d607db918f39eaaf9ac5952a2b);
        else if(i==8) return bytes32(0x282c630dc123d1144cff0291e62d4060a7e20948f832b0ae18e17ee1d7a83f84);
        else if(i==9) return bytes32(0x1a4e7289a3ebb66ee54bdc58b91ada49159ebdc84541ae132f592d53aa5d4ef6);
        else if(i==10) return bytes32(0x1c69d680289eaa0efb757112d2f9871f85780222f3a129cb744540e4922596c7);
        else if(i==11) return bytes32(0x0430fdc4fb8b4fe2d6be580b48b0b0bbe7741dd63b90e12ec7d8f538e6048244);
        else if(i==12) return bytes32(0x2877e54efecb5d45298b0cd179f27b25317830fe0ad0cfc48dead9a3ed9f3b97);
        else if (i==13) return bytes32(0x09a4dbddb4900bcaafef31ca97a03fe378aaedec5057d17acada8e5962587a76);
        else if(i==14) return bytes32(0x16555f9bfe0477fd45a74ef77a93423186961c8a813c124d0e7efbdaea60c71e);
        else if(i==15) return bytes32(0x0d187a26dc35c465f374c034ed53d97ad1a52f5b649815e2c459c85389cd47bd);
        else if(i==16) return bytes32(0x00ece7b77915555671177b28434d0115e25e94633194fcc151a8192ab509e030);
        else if(i==17) return bytes32(0x086718641b844e9df1f56643a652336666d976dafe3baf36595df1a1d5567781);
        else if(i==18) return bytes32(0x2f2a03994ebfb58dfb088b6dc6f74b8ee0d5dc47b763e67c087afee01ba03dce);
        else if(i==19) return bytes32(0x2cc7b14efc110dfeea62883d7295f8a8b38f5766127ddc8f3d5008bacb03a1d9);
        else if(i==20) return bytes32(0x2dbf0465e74fded06d6209c88f603a05c91ab302f3d1a4db0c73c95aa7f72a0b);
        else if(i==21) return bytes32(0x15f5f077f1054d05cbdd70acdd435e10938fec921d9d687f27a04d74b09b0c09);
        else if(i==22) return bytes32(0x0447768f2d5a8e0adc1fd8964f1beade0ae97b7c45d8e749083ba9f512cd0d99);
        else if(i==23) return bytes32(0x2a5ace857d489511c368291d79a860a2c8f3a03d66acd02b21279056a454b7d9);
        else if(i==24) return bytes32(0x12cff3a281f301decc70934fa7436319da87a1aefc32984320db9515c520e7e5);
        else if(i==25) return bytes32(0x07f79ebedfb8addea36f1b8d693973d8ece0c47f7ea6598df94dba956c5a40d2);
        else if(i==26) return bytes32(0x2361904475b01c3660a8fb86fc50dc914d86547753a8c3219d15a38ed3c165ce);
        else if(i==27) return bytes32(0x1f2d2795774afa2fc7e3561b2bc774c9b80e8dbca05bd46389a0bd9bb90d0998);
        else if(i==28) return bytes32(0x030edac796752e246b25b4828b51568af34ea6f18b774d327d0a59a871d497b9);
        else if(i==29) return bytes32(0x1688c50fb1a8018fe1ad79891a8927f55b90cc8680070bb246f5bf995650e2e7);
        else if(i==30) return bytes32(0x0ad110c56608f359c964075b54208987e0e6d66a949d4573120bb6d4e3f3a18f);
        else if(i==31) return bytes32(0x2ec10ad6cd4f01d020de46902653aee22caafce28c68fb28aee4ebd798b49c30);
        else revert IncrementalMerkleTree_DepthShouldBeLessThan32();

    }
    function isKnownRoot(bytes32 _root) public view returns (bool){
        if(_root==bytes32(0)){
            return false;
        }
        //check if the root matches one in s_roots
        uint32 _currentRootIndex=s_currentRootIndex;
        uint32 i=_currentRootIndex;
        do{
            if(s_roots[i]==_root){
                return true;
            }
            if(i==0){
                i=ROOT_HISTORY_SIZE-1;
            }
            else{
                i--;
            }

        }while(i!=_currentRootIndex);
        return false;
    }
}