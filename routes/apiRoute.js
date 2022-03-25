const router = require('express').Router();
const axios = require('axios');
const { ethers,Wallet, providers } = require('ethers');
const { connect } = require('@textile/tableland');
const fetch = require('node-fetch');

globalThis.fetch = fetch;

// Since we don't have Metamask, you need to supply a private key directly
let privKey = process.env.PRIV_KEY2;
const wallet = new Wallet(privKey);
const provider = new providers.AlchemyProvider(
  'rinkeby',
  process.env.ALCHEMY_KEY
);
const signer = wallet.connect(provider);
let scoreTableRes, highTableRes;
const contract_address = "0x873C456f308F91e47aC6284b9a785Ccf62ccC0b3";
const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "subscriptionId",
				"type": "uint64"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "have",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "want",
				"type": "address"
			}
		],
		"name": "OnlyCoordinatorCanFulfill",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "randomWords",
				"type": "uint256[]"
			}
		],
		"name": "rawFulfillRandomWords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestRandomWords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "s_randomWords",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_requestId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

router.route('/createScoreTable').get(async (req, res) => {
  const tbl = await connect({ network: 'testnet', signer });
  scoreTableRes = await tbl.create(
    `CREATE TABLE scoreBoard (address text, score int, primary key (address));`
  );
  console.log(scoreTableRes);
});

router.route('/listTables').get(async (req, res) => {
  const tbl = await connect({ network: 'testnet', signer });
  const tables = await tbl.list();
  console.log(tables);
});

router.route('/createHighTable').get(async (req, res) => {
  const tbl = await connect({ network: 'testnet', signer });
  highTableRes = await tbl.create(
    `CREATE TABLE highBoard (address text, score int, primary key (address));`
  );
});

router.route('/updateScores/:address/:score').get(async (req, res) => {
  try {
    const tbl = await connect({ network: 'testnet', signer });
    const address = req.params.address;
    const score = req.params.score;

    const queryableName = 'scoreboard_450';
    console.log(queryableName);

    const queryRes = await tbl.query(
      `SELECT * FROM ${queryableName} WHERE address = '${address}';`
    );
    console.log('before update', queryRes);
    if (queryRes?.data?.rows && queryRes.data.rows.length > 0) {
      const deleteRes = await tbl.query(
        `DELETE FROM ${queryableName} WHERE address = '${address}';`
      );
    }
    queryToSend =
      `INSERT INTO ${queryableName} (address, score) VALUES ('${address}', ` +
      Number(score) +
      `);`;

    const insertRes = await tbl.query(queryToSend);
    console.log('Insert Rest', insertRes);
    // add contract calling here
    let contract = new ethers.Contract(contract_address, contractAbi, signer);
    let transaction = await contract.requestRandomWords();
    let tx = await transaction.wait()
    // console.log(tx);

    res.send('Success');
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
});

router.route('/getScores/:address').get(async (req, res) => {
  try {
    const tbl = await connect({ network: 'testnet', signer });
    const address = req.params.address;

    const queryableName = 'scoreboard_450';
    console.log(queryableName);
    const queryRes = await tbl.query(
      `SELECT * FROM ${queryableName} WHERE address = '${address}';`
    );
    if (queryRes.length !== 0) {
      let contract = new ethers.Contract(contract_address, contractAbi, signer);
      let transaction = await contract.s_requestId();
      // console.log(transaction);
      let randomNum = String(parseInt(transaction._hex));
      // console.log(randomNum.length);
      console.log(randomNum[11]);
      queryRes.randVRFNumber = randomNum[11];
      res.send(queryRes);
    } else {
      res.send('Not Available');
    }
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
});

router.route('/delScores/:address').get(async (req, res) => {
  try {
    const tbl = await connect({ network: 'testnet', signer });
    const address = req.params.address;

    const queryableName = 'scoreboard_450';
    console.log(queryableName);
    const queryRes = await tbl.query(
      `DELETE FROM ${queryableName} WHERE address = '${address}';`
    );
    if (queryRes.length !== 0) {
      res.send(queryRes);
    } else {
      res.send('Not Available');
    }
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
});

module.exports = router;
