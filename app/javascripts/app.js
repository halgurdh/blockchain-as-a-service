// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
import docs_artifacts from '../../build/contracts/Docs.json'
import accounts_artifacts from '../../build/contracts/Accounts.json'
import docs2_artifacts from '../../build/contracts/Docs2.json'

const base64url = require('base64url'); 
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('BaaSApp');
  
var Skip32 = require("skip-32");
var cipher = new Skip32([0x1a, 0xcf, 0x24]);

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);
var Docs = contract(docs_artifacts);
var Accounts = contract(accounts_artifacts);
var Docs2 = contract(docs2_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

var Xorc = function(salt){
    var randomMax = 100,
        randomMin = -100;
    
    var saltInt = parseInt(salt);
    if ( salt ) {
        if ( !saltInt ) {
            throw new Error('Salt is not a Number');
        }
        this.salt = saltInt;
    }
    else {
        //this.salt = Math.round(Math.random()*(randomMax-randomMin)+randomMin);
        this.salt = 21;
    }
}

Xorc.prototype.encrypt = function(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
        result += String.fromCharCode( this.salt ^ str.charCodeAt(i) );
        
    }
    return result;
}

Xorc.prototype.decrypt = function(hash) {
    var result = '';
    for (var i=0; i<hash.length; i++) {
        result += String.fromCharCode( this.salt ^ hash.charCodeAt(i) );
    }
    return result;
}


window.App = {
  start: function() {
    document.getElementById('uploadDocDiv').style.display = 'none';  
    document.getElementById('logoutDiv').style.display = 'none';
    document.getElementById('delenDocDiv').style.display = 'none';
    document.getElementById('showDocDiv').style.display = 'none';
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);
    Docs.setProvider(web3.currentProvider);
    Accounts.setProvider(web3.currentProvider);
    Docs2.setProvider(web3.currentProvider);
    
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
    });
  },

  login: function() {
    var self = this;

    var meta;
    Accounts.deployed().then(function(instance) {
      meta = instance;
      var address = document.getElementById("address").value;
      if(address != null){
        if(meta.login.call(address, {from: account}).then(function(value) {
          if (value==true){
                document.getElementById('loginDiv').style.display = 'none';
                document.getElementById('logoutDiv').style.display = 'block';
              if(meta.isRole.call(address, {from: account}).then(function(value2){
              if(value2['c'][0] == 0){
                document.getElementById('delenDocDiv').style.display = 'block';
              } 
              else if(value2['c'][0] == 1){

                document.getElementById('showDocDiv').style.display = 'block';
              }
              else if(value2['c'][0] == 2){
                document.getElementById('uploadDocDiv').style.display = 'block';
              }else {
                alert ("Unknown role");
              }
            })){

            }
          } 
            if (value == false) {
              alert ("Unknown address")
              document.getElementById('loginDiv').style.display = 'block';
              document.getElementById('logoutDiv').style.display = 'none'; 
              document.getElementById('delenDocDiv').style.display = 'none'; 
              document.getElementById('showDocDiv').style.display = 'none';
              document.getElementById('uploadDocDiv').style.display = 'none';
          } else {
            alert ("Succes")
          }
        }));
      }
    });
  },

  logout: function() {
    var self = this;

    var meta;
    Accounts.deployed().then(function(instance) {
      meta = instance;
      if(meta.logout.call({from: account})){
        if (document.getElementById('loginDiv').style.display === 'none') {
              document.getElementById('loginDiv').style.display = 'block';
              document.getElementById('logoutDiv').style.display = 'none';
              document.getElementById('delenDocDiv').style.display = 'none'; 
              document.getElementById('showDocDiv').style.display = 'none';
              document.getElementById('uploadDocDiv').style.display = 'none'; 
        }
      }
    });
    
  },
  register: function() {
      var self = this;

      var role = document.getElementById("role");
      var roleSel = role.options[role.selectedIndex].value;

      var meta;
      Accounts.deployed().then(function(instance) {
      meta = instance;
      var address = document.getElementById("address").value;
      return meta.register(address, roleSel, {from: account});
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  uploadDoc2: function() {
    var xor = new Xorc();
    var self = this;
    var content = "empty";
    var fileInput = document.getElementById('file');
    var address = document.getElementById('Uaddress').value;
        var file = fileInput.files[0];
        var textType = /text.*/;
        var reader = new FileReader();
      reader.onload = function(e) {
        content = reader.result;
        //Here the content has been read successfuly
        var encrypted = xor.encrypt(content);
        var shortencrp = cryptr.encrypt(encrypted);

        console.log("encr: "+shortencrp)
        alert("You're data is encrypted: " + shortencrp);
        var meta;
      Docs2.deployed().then(function(instance) {
        meta = instance;
        meta.sendDocs(address, shortencrp, {from: account})
        
      }).catch(function(e) {
      console.log(e);
    });
  }
  reader.readAsText(file);	
},

delenDoc: function() {
    var xor = new Xorc();
    var self = this;
    var content = "empty";
    var Uaddress = document.getElementById('Faddress').value;
    var Daddress = document.getElementById('Taddress').value;
    
    var address = document.getElementById('address').value;

    var meta;
    
    Docs2.deployed().then(function(instance) {
        meta = instance;
        meta.isAllowed(Daddress)
        meta.sendDocs(address, meta.getDocs(Uaddress), {from: account})
        
      }).catch(function(e) {
      console.log(e);
    });
    
},

  getDocs: function() {
    var xor = new Xorc();
    var self = this;

    var address = document.getElementById("address").value;

    function downloadContent(name, content) {
      var atag = document.createElement("a");
      var file = new Blob([content], {type: 'text/plain'});
      atag.href = URL.createObjectURL(file);
      atag.download = name;
      atag.click();
    }

    var meta;
    Docs2.deployed().then(function(instance) {
      meta = instance;
      meta.checkIfAllowed(address).then(function(value){
        console.log("bool: "+value)
        if(value){
          meta.getDocs(address);
        }else {
          alert ("You are not allowed to download from this address!")
        }
      });
      
    }).then(function(value) {
      console.log('val: '+value)

      var shortencrp = cryptr.decrypt(value);
      var encrypted = xor.decrypt(shortencrp);
      

      console.log("encr: "+encrypted)
      downloadContent("document.txt", encrypted);
    });
  },

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://13.84.173.162:8545"));
  }

  App.start();
});
