pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Docs2.sol";

contract Docstest {

  function testInitialBalanceUsingDeployedContract() {
    Docs2 meta = Docs2(DeployedAddresses.Docs2());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testInitialBalanceWithNewDocs2() {
    Docs2 meta = new Docs2();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

}
