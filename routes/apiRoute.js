const router = require('express').Router();
const axios = require('axios');
const { Wallet, providers } = require('ethers');
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
