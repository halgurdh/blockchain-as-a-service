pragma solidity ^0.4.8;

contract Docs {

    string public document;
    bool private isAutorized;

    function Docs() {
        document = "empty";
    }

    function uploadDocs(string documenten) {
        document = documenten;
    }

    function Autorized () returns(bool){
        if (isAutorized) {
            //mag het zien
            return true;
        }else {
            //mag het niet zien
            return false;
        }
    }

}