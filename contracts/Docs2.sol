pragma solidity ^0.4.2;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract Docs2 {
	mapping (address => string) documents;
	mapping (address => bool) allowed;

    function Docs2 () {
        allowed[msg.sender] = false;
    }

	function sendDocs(address addr, string document) { 
		documents[addr] = document;
    }

    function getDocs(address addr) constant returns (string)  { 
        if(allowed[addr]){
            return documents[addr]; 
        } else if(addr == msg.sender){
            return documents[addr]; 
        }
    }

    function isAllowed (address addr) {
        allowed[addr] = true;
    }

    function checkIfAllowed (address addr) constant returns (bool){
        if (addr == msg.sender){
            allowed[addr] = true;
        }
        return allowed[addr];
    }
}