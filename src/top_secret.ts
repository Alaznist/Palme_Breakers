// Metamask : R4g2aQ5&VURF

// wink indicate pipe short online expose legend uncover poem april capable genius

/*
Le contrat est déployé sur le testnet Goerli
Adresse du contrat: 0x3210ecB7A8Ea2E6595BE559f215a1Ff98828DfF7
Et l'abi ci joint
https://goerli.etherscan.io/address/0x3210ecB7A8Ea2E6595BE559f215a1Ff98828DfF7
*/


interface Window {
    ethereum: any
}

function handleAccountsChanged(accounts: any) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else {
    console.log(accounts[0]);
    // Do any other work!
  }
}

const ts = async () => {

    let abi = require("../assets/abi.json");
    let contractAddr = "0x3210ecB7A8Ea2E6595BE559f215a1Ff98828DfF7";
    let senderAddr = "0x5798c730fF0ac0e274f4400766bB0073626A252D";

    var Contract = require('web3-eth-contract');

    // set provider for all later instances to use
    const Web3 = require('web3');
    let web3 = new Web3("http://localhost:8545")
    const contractAccess = new Contract(abi, contractAddr);

    contractAccess.methods.getMessages().call({from: '0xdC0796927433994C69443050c2dBF05AA3921AFf'})
      .then(function(result: any){
        for (var val of result) {
          contractAccess.methods.getName(val['addrSender']).call({from: '0xdC0796927433994C69443050c2dBF05AA3921AFf'})
          .then(function(result: any){
            const p = document.createElement("p");
            p.textContent = val['addrSender'] + ' : ' + result + ' -> ' + val['msg'];
            document.body.appendChild(p);
          });
        }
      });


    if (window.ethereum != null) {

        web3 = new Web3(window.ethereum)
    
        try {
    
        // Request account access if needed
    
        await window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(handleAccountsChanged)
            .catch((err: any) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
            } else {
                console.error(err);
            }
            });
    
        // Acccounts now exposed
    
        } catch (error) {
    
        // User denied account access...
    
        }
    
    }



};

ts();
