/* eslint-disable */
const { Router } = require('express')
const bodyParser = require('body-parser')

const router = Router()

router.use(bodyParser.json())

const dm2dd = dm => {
  const deg = parseInt(dm[1]);
  const dec = parseFloat(dm[2])/60;
  return deg + dec;
}

router.post('/alert/parse', (req, res) => {
  if (!req.body.alert) {
    res.sendStatus(400);
    return;
  }
  const data = req.body.alert;
  const pieces = data.split(/^([A-Za-zäöåÄÖÅ]+ V [A-ZÄÖÅ]{2} [0-9]+) ([0-9]{2,3}):([ABCD]):(.+) :(N[ ]?[0-9]{1,2}#[0-9]+\.[0-9]+) (E[ ]?[0-9]{1,2}#[0-9]+\.[0-9]+):(.*)$/);

  if (!pieces[1] || !pieces[2] || !pieces[3] || !pieces[4] || !pieces[5] || !pieces[6] || !pieces[7]) {
    res.sendStatus(400);
    return;
  }
  const missionCode = pieces[2] + ' ' + pieces[3];
  const description = pieces[4];
  const rawLat = pieces[5];
  const rawLon = pieces[6];
  const units = pieces[7];

  const latLonSplitter = /^[NE] ([0-9]+)#([0-9]+\.[0-9]+)$/;
  const lat = dm2dd(rawLat.split(latLonSplitter));
  const lon = dm2dd(rawLon.split(latLonSplitter));

  res.json({
    lat: lat,
    lon: lon,
    missionCode: missionCode,
    description: description,
    units: units
  });
});

router.get('/token', (req, res) => {
  const accessToken = process.env.TOKEN || '';
  res.json({
    token: accessToken
  })
});

module.exports = router
