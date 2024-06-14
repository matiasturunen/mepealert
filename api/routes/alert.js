/* eslint-disable */
const { Router } = require('express')
const bodyParser = require('body-parser')

const dataValues = require('./data').dataValues;
const { parsePeLa, parsePSEH } = require('../parser')

const router = Router()

router.use(bodyParser.json())

const dd2dm = dd => {
  const degs = parseInt(dd);
  const mins = (dd - degs) * 60;

  return degs+'#'+mins.toFixed(4);
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
