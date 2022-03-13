async function getScores(ethAddress) {
  const settings = {
    async: false,
    crossDomain: true,
    url: `/apiRoute/getScores/${ethAddress}`,
    method: 'get',
    processData: false,
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    if (response?.data?.rows && response.data.rows.length == 0) {
      stepTime = 200;
      killCounter = 0;
    } else if (response?.data?.rows) {
      stepTime = 130;
      killCounter = 200;
    }
    return true;
  });
}

async function setScores(ethAddress, score) {
  const settings = {
    async: false,
    crossDomain: true,
    url: `/apiRoute/updateScores/${ethAddress}/${score}`,
    method: 'get',
    processData: false,
  };
  $.ajax(settings).done(function (response) {
    alert('NFT Burned and Boosters Activated!');
    if (response) {
      return response;
    }
  });
}

async function delScores(ethAddress) {
  const settings = {
    async: false,
    crossDomain: true,
    url: `/apiRoute/delScores/${ethAddress}`,
    method: 'get',
    processData: false,
  };
  $.ajax(settings).done(function (response) {
    if (response) {
      killCounter = 0;
      stepTime = 200;
    }
  });
}
