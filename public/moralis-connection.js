const serverUrl = 'https://cp3fbum5pnui.usemoralis.com:2053/server';
const appId = 'hxq9qTQo1Og5QLtOk0LxodiEC9WnPuprd8aMw2fe';
Moralis.start({ serverUrl, appId });
var counter = 0;
var speedMultiplier = 0;
var killCounter = 0;
// implement this as... upgrading your chicken speed
var stepTime = 200; // Miliseconds it takes for the chicken to take a step forward, backward, left or right
$(document).ready(async function () {
  let user = await Moralis.User.current();
  if (user) {
    setTimeout( await getScores(user.get('ethAddress')), 3000)
    console.log('Boosters: ', stepTime, killCounter);
  }
});
const sequence = window['0xsequence'];
const wallet = new sequence.Wallet('polygon');
$(document).ready(function () {
  const connect = async (authorize = false) => {
    const connectDetails = await wallet.connect({
      app: 'Symbals',
      authorize,
      keepWalletOpened: true
    });

    console.warn('connectDetails', { connectDetails });
    console.log(
      'users signed connect proof to valid their account address:',
      connectDetails.proof
    );
  };

  $('#btn-login2').click(async function () {

    await connect(true);
    const address = await wallet.getAddress();
    console.log(address);
    console.log('wallet', wallet);
    const signer = await wallet.getSigner();
   
    // Encode the transfer of the NFT tokenId to recipient
    // const recipientAddress = '0x594E50D46A6441E89125965D9aDB357902C1a7E5';
    // const tokenId = '365283783225248940146';
    
    // const erc721TokenAddress = '0xb2C8c173E6A44DcE16cFE0619bA6EDf66a07d8bB';
    // const contractAbi = [
    //   {
    //     inputs: [
    //       { internalType: 'string', name: '_name', type: 'string' },
    //       { internalType: 'string', name: '_symbol', type: 'string' },
    //       { internalType: 'address', name: 'owner', type: 'address' },
    //       { internalType: 'bool', name: '_metadataUpdatable', type: 'bool' },
    //       { internalType: 'bool', name: '_tokensBurnable', type: 'bool' },
    //       { internalType: 'bool', name: '_tokensTransferable', type: 'bool' },
    //       { internalType: 'string', name: '_initBaseURI', type: 'string' },
    //     ],
    //     stateMutability: 'nonpayable',
    //     type: 'constructor',
    //   },
    //   {
    //     anonymous: false,
    //     inputs: [
    //       {
    //         indexed: true,
    //         internalType: 'address',
    //         name: 'owner',
    //         type: 'address',
    //       },
    //       {
    //         indexed: true,
    //         internalType: 'address',
    //         name: 'approved',
    //         type: 'address',
    //       },
    //       {
    //         indexed: true,
    //         internalType: 'uint256',
    //         name: 'tokenId',
    //         type: 'uint256',
    //       },
    //     ],
    //     name: 'Approval',
    //     type: 'event',
    //   },
    //   {
    //     anonymous: false,
    //     inputs: [
    //       {
    //         indexed: true,
    //         internalType: 'address',
    //         name: 'owner',
    //         type: 'address',
    //       },
    //       {
    //         indexed: true,
    //         internalType: 'address',
    //         name: 'operator',
    //         type: 'address',
    //       },
    //       { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
    //     ],
    //     name: 'ApprovalForAll',
    //     type: 'event',
    //   },
    //   {
    //     anonymous: false,
    //     inputs: [
    //       {
    //         indexed: false,
    //         internalType: 'string',
    //         name: '_value',
    //         type: 'string',
    //       },
    //       { indexed: true, internalType: 'uint256', name: '_id', type: 'uint256' },
    //     ],
    //     name: 'PermanentURI',
    //     type: 'event',
    //   },
    //   { anonymous: false, inputs: [], name: 'PermanentURIGlobal', type: 'event' },
    //   {
    //     anonymous: false,
    //     inputs: [
    //       { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
    //       {
    //         indexed: true,
    //         internalType: 'bytes32',
    //         name: 'previousAdminRole',
    //         type: 'bytes32',
    //       },
    //       {
    //         indexed: true,
    //         internalType: 'bytes32',
    //         name: 'newAdminRole',
    //         type: 'bytes32',
    //       },
    //     ],
    //     name: 'RoleAdminChanged',
    //     type: 'event',
    //   },
    //   {
    //     anonymous: false,
    //     inputs: [
    //       { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
    //       {
    //         indexed: true,
    //         internalType: 'address',
    //         name: 'account',
    //         type: 'address',
    //       },
    //       {
    //         indexed: true,
    //         internalType: 'address',
    //         name: 'sender',
    //         type: 'address',
    //       },
    //     ],
    //     name: 'RoleGranted',
    //     type: 'event',
    //   },
    //   {
    //     anonymous: false,
    //     inputs: [
    //       { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
    //       {
    //         indexed: true,
    //         internalType: 'address',
    //         name: 'account',
    //         type: 'address',
    //       },
    //       {
    //         indexed: true,
    //         internalType: 'address',
    //         name: 'sender',
    //         type: 'address',
    //       },
    //     ],
    //     name: 'RoleRevoked',
    //     type: 'event',
    //   },
    //   {
    //     anonymous: false,
    //     inputs: [
    //       { indexed: true, internalType: 'address', name: 'from', type: 'address' },
    //       { indexed: true, internalType: 'address', name: 'to', type: 'address' },
    //       {
    //         indexed: true,
    //         internalType: 'uint256',
    //         name: 'tokenId',
    //         type: 'uint256',
    //       },
    //     ],
    //     name: 'Transfer',
    //     type: 'event',
    //   },
    //   {
    //     inputs: [],
    //     name: 'DEFAULT_ADMIN_ROLE',
    //     outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [],
    //     name: 'MINTER_ROLE',
    //     outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'address', name: 'to', type: 'address' },
    //       { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    //     ],
    //     name: 'approve',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    //     name: 'balanceOf',
    //     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [],
    //     name: 'baseURI',
    //     outputs: [{ internalType: 'string', name: '', type: 'string' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
    //     name: 'burn',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    //     name: 'freezeTokenUris',
    //     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    //     name: 'getApproved',
    //     outputs: [{ internalType: 'address', name: '', type: 'address' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    //     name: 'getRoleAdmin',
    //     outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'bytes32', name: 'role', type: 'bytes32' },
    //       { internalType: 'address', name: 'account', type: 'address' },
    //     ],
    //     name: 'grantRole',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'bytes32', name: 'role', type: 'bytes32' },
    //       { internalType: 'address', name: 'account', type: 'address' },
    //     ],
    //     name: 'hasRole',
    //     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'address', name: 'owner', type: 'address' },
    //       { internalType: 'address', name: 'operator', type: 'address' },
    //     ],
    //     name: 'isApprovedForAll',
    //     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [],
    //     name: 'metadataUpdatable',
    //     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'address', name: 'caller', type: 'address' },
    //       { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    //       { internalType: 'string', name: 'tokenURI', type: 'string' },
    //     ],
    //     name: 'mintToCaller',
    //     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [],
    //     name: 'name',
    //     outputs: [{ internalType: 'string', name: '', type: 'string' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [],
    //     name: 'owner',
    //     outputs: [{ internalType: 'address', name: '', type: 'address' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    //     name: 'ownerOf',
    //     outputs: [{ internalType: 'address', name: '', type: 'address' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'bytes32', name: 'role', type: 'bytes32' },
    //       { internalType: 'address', name: 'account', type: 'address' },
    //     ],
    //     name: 'renounceRole',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'bytes32', name: 'role', type: 'bytes32' },
    //       { internalType: 'address', name: 'account', type: 'address' },
    //     ],
    //     name: 'revokeRole',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'address', name: 'from', type: 'address' },
    //       { internalType: 'address', name: 'to', type: 'address' },
    //       { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    //     ],
    //     name: 'safeTransferFrom',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'address', name: 'from', type: 'address' },
    //       { internalType: 'address', name: 'to', type: 'address' },
    //       { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    //       { internalType: 'bytes', name: '_data', type: 'bytes' },
    //     ],
    //     name: 'safeTransferFrom',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'address', name: 'operator', type: 'address' },
    //       { internalType: 'bool', name: 'approved', type: 'bool' },
    //     ],
    //     name: 'setApprovalForAll',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    //     name: 'supportsInterface',
    //     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [],
    //     name: 'symbol',
    //     outputs: [{ internalType: 'string', name: '', type: 'string' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    //     name: 'tokenByIndex',
    //     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'address', name: 'owner', type: 'address' },
    //       { internalType: 'uint256', name: 'index', type: 'uint256' },
    //     ],
    //     name: 'tokenOfOwnerByIndex',
    //     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    //     name: 'tokenURI',
    //     outputs: [{ internalType: 'string', name: '', type: 'string' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [],
    //     name: 'tokensBurnable',
    //     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [],
    //     name: 'tokensTransferable',
    //     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [],
    //     name: 'totalSupply',
    //     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    //     stateMutability: 'view',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'address', name: '_to', type: 'address' },
    //       { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
    //     ],
    //     name: 'transferByOwner',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'address', name: 'from', type: 'address' },
    //       { internalType: 'address', name: 'to', type: 'address' },
    //       { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    //     ],
    //     name: 'transferFrom',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'string', name: '_newBaseURI', type: 'string' },
    //       { internalType: 'bool', name: '_tokensTransferable', type: 'bool' },
    //       { internalType: 'bool', name: '_freezeUpdates', type: 'bool' },
    //     ],
    //     name: 'update',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    //   {
    //     inputs: [
    //       { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
    //       { internalType: 'string', name: '_tokenUri', type: 'string' },
    //       { internalType: 'bool', name: '_isFreezeTokenUri', type: 'bool' },
    //     ],
    //     name: 'updateTokenUri',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    // ];
    // const tx = {
    //   to: erc721TokenAddress,
    //   data: new ethers.utils.Interface(contractAbi).encodeFunctionData('burn', [ address,
    //     recipientAddress,
    //     tokenId])
    // }
    // const txnResponse = await signer.sendTransaction(tx);
    // console.log(txnResponse);

    // // wait for the transaction to be mined
    // await txnResponse.wait();
  });
  //   $('#btn-logout').click(async function () {
  //     await Moralis.User.logOut();
  //     $('#btn-login').show();
  //     $('#btn-logout').hide();
  //     console.log('logged out');
  //   });
});
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    try {
      user = await Moralis.authenticate({
        signingMessage: 'Welcome to Crypto Chicken Run',
      });
      console.log(user.get('ethAddress'));
      $('#userId').val(user.get('ethAddress'));
      $('#btn-login').hide();
      $('#btn-logout').show();
      Moralis.enableWeb3();
    } catch (error) {
      console.log(error);
    }
  }
}

$(document).ready(function () {
  let user = Moralis.User.current();
  if (user) {
    Moralis.enableWeb3();

    $('#userId').val(user.get('ethAddress'));
    $('#btn-login').hide();
    $('#btn-logout').css('display', 'block');
  }
});

async function logOut() {
  await Moralis.User.logOut();
  $('#btn-login').show();
  $('#btn-logout').hide();
  console.log('logged out');
}

document.getElementById('btn-login').onclick = login;
document.getElementById('btn-logout').onclick = logOut;
