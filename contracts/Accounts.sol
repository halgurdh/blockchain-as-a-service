pragma solidity ^0.4.8;

contract Accounts {

    address public addr;
    mapping (address => uint) roles;
    bool private loggedin;

    function Accounts() {
        roles[tx.origin] = 0;
    }

    function login(address addr) returns(bool){
        if(addr == msg.sender){
            return loggedin = true;
        }else {
            return loggedin = false;
        }
        return loggedin;
    }

    function isRole(address addr) returns(uint){
        return roles[addr];
    }

    function register(address addr, uint role) returns(bool) {
        if(addr == msg.sender){
		    roles[msg.sender] = role;
            return loggedin = true;
        }else {
            return loggedin = false;
        }
        return loggedin;
	}

    function logout() {
        loggedin = false;
    }
}