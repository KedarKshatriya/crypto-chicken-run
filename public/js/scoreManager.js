async function getScores(ethAddress) {
  const settings = {
    async: false,
    crossDomain: true,
    url: `/apiRoute/getScores/${ethAddress}`,
    method: 'get',
    processData: false,
  };
  $.ajax(settings).done(function (response) {
    // console.log("reponse of vrf",response);
    if (response?.data?.rows && response.data.rows.length == 0) {
      stepTime = 200;
      killCounter = 0;
    } else if (response?.data?.rows) {
      console.log("response.randVRFNumber", response.randVRFNumber);
      stepTime = 200 - ((response.randVRFNumber == 0 ? 1 : response.randVRFNumber) * 10);
      console.log("stepTime", stepTime);
      killCounter = (response.randVRFNumber == 0 ? 1 : response.randVRFNumber) * 100;
      console.log("killCounter", killCounter);
      $('#perksString').text(`Perks Enabled:`);
      $('#perksString2').text(`Speed Increase of ${200 % stepTime}%`);
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
      $('#perksString').text(`Perks Disabled`);
      $('#perksString2').text(``);
    }
  });
}
