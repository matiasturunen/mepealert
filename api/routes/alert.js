/* eslint-disable */
const { Router } = require('express')
const bodyParser = require('body-parser')

const dataValues = require('./data').dataValues;

const router = Router()

router.use(bodyParser.json())

const dm2dd = dm => {
  const deg = parseInt(dm[1]);
  const dec = parseFloat(dm[2])/60;
  return deg + dec;
}

const dd2dm = dd => {
  const degs = parseInt(dd);
  const mins = (dd - degs) * 60;

  return degs+'#'+mins.toFixed(4);
}

const findAlertCodeData = code => {
  for (var i = 0; i < dataValues.alertCodes.length; i++) {
    const c = dataValues.alertCodes[i];
    if (c.value == code) {
      return c;
    }
  }

  return null;
}

const parsePeLa = message => {
  const pieces = message.split(/^([A-Za-zäöåÄÖÅ]+ V [A-ZÄÖÅ]{2} [0-9]+) ([0-9]{2,3}):([ABCD]):(.+):(N[ ]?[0-9]{1,2}#[0-9]+\.[0-9]+) (E[ ]?[0-9]{1,2}#[0-9]+\.[0-9]+):(.*)$/);

  if (!pieces[1] || !pieces[2] || !pieces[3] || !pieces[4] || !pieces[5] || !pieces[6] || !pieces[7]) {
    console.error('Parse error!\nData was:',message);
    return {
      error: 400
    }
  }

  const missionCode = pieces[2] + ' ' + pieces[3];
  const description = pieces[4];
  const rawLat = pieces[5];
  const rawLon = pieces[6];
  const units = pieces[7];

  const latLonSplitter = /^[NE] ([0-9]+)#([0-9]+\.[0-9]+)$/;
  const lat = dm2dd(rawLat.split(latLonSplitter));
  const lon = dm2dd(rawLon.split(latLonSplitter));

  const acData = findAlertCodeData(pieces[2]);
  let missionDescription = '';
  if (acData != null) {
    missionDescription = acData.text;
  }

  console.log('Parse done!');

  return {
    lat: lat,
    lon: lon,
    missionCode: missionCode,
    missionDescription: missionDescription,
    description: description,
    units: units
  };
}

const parsePSEH = message => {
  const pieces = message.split(/^\d{2}:\d{2}:\d{2}_\d{2}\.\d{2}\.\/(N[ ]?[0-9]{1,2}#[0-9]+\.[0-9]+) (E[ ]?[0-9]{1,2}#[0-9]+\.[0-9]+)\/([\w ,.-]+)\/([A-ZÄÖÅ0-9]+)\/([ABCD])\/([A-ZÄÅÖ]{3}\d{2,5})\/(.+)$/);

  if (!pieces[1] || !pieces[2] || !pieces[3] || !pieces[4] || !pieces[5] || !pieces[6] || !pieces[7]) {
    console.error('Parse error!\nData was:',message);
    return {
      error: 400
    }
  }

  const missionCode = pieces[4] + ' ' + pieces[5];
  const description = pieces[3] + ', ' + pieces[7];
  const rawLat = pieces[1];
  const rawLon = pieces[2];
  const units = pieces[6];

  const latLonSplitter = /^[NE] ([0-9]+)#([0-9]+\.[0-9]+)$/;
  const lat = dm2dd(rawLat.split(latLonSplitter));
  const lon = dm2dd(rawLon.split(latLonSplitter));

  const acData = findAlertCodeData(pieces[4]);
  let missionDescription = '';
  if (acData != null) {
    missionDescription = acData.text;
  }

  console.log('Parse done!');

  return {
    lat: lat,
    lon: lon,
    missionCode: missionCode,
    missionDescription: missionDescription,
    description: description,
    units: units
  };
}

router.post('/alert/parse', (req, res) => {
  if (!req.body.alert) {
    res.sendStatus(400);
    return 400;
  }

  console.log('Started parse...');

  // Decide message type
  const message = req.body.alert;
  const pelaRegex = /^([A-Za-zäöåÄÖÅ]+ V [A-ZÄÖÅ]{2} [0-9]+).+/;
  const psehRegex = /^\d{2}:\d{2}:\d{2}_\d{2}\.\d{2}\.\/N/;

  if (pelaRegex.test(message)) {
    console.log('Parse pela message');
    const resp = parsePeLa(message);
    if (resp.error) {
      res.sendStatus(resp.error);
      return resp.error;
    } else {
      res.json(resp);
    }
  } else if (psehRegex.test(message)) {
    console.log('Parse pseh message');
    const resp = parsePSEH(message);
    if (resp.error) {
      res.sendStatus(resp.error);
      return resp.error;
    } else {
      res.json(resp);
    }
  } else {
    console.error('Unable to parse message', message);
    res.sendStatus(400);
    return 400;
  }
});

router.post('/alert/generate', (req, res) => {
  console.log(req.body);
  if (!req.body.code 
    || !req.body.units
    || !req.body.message
    || !req.body.urgency
    || !req.body.coordinates
    || !req.body.prefix
  ) {
    res.sendStatus(400);
    return 400;
  }

  console.log('Started generate...');

  // Alert starts with prefix
  let alert = req.body.prefix.trim();

  // Next is alert code and urgency
  alert += ' '+req.body.code+':'+req.body.urgency;

  // Then message 
  alert += ':'+req.body.message.trim()

  // Coordinates, need to convert first...
  const lat = dd2dm(req.body.coordinates.lat);
  const lng = dd2dm(req.body.coordinates.lng);
  alert += ':N '+lat+' E '+lng;

  // Units
  const units = req.body.units.join(', ');
  alert += ':'+units;

  res.json({
    alert: alert
  });
});

router.get('/token', (req, res) => {
  const accessToken = process.env.TOKEN || '';
  res.json({
    token: accessToken
  })
});

module.exports = router
