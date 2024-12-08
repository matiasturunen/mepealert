import { alertCodes } from "./alertcodes";

const dm2dd = dm => {
  const deg = parseInt(dm[1]);
  const dec = parseFloat(dm[2])/60;
  return deg + dec;
}

const parseCoordinates = data => {
	const coordinateParts = data.split(/N[ ]?(.+) E[ ]?(.+)/);
	rawLat = coordinateParts[1];
	rawLon = coordinateParts[2];

	const latLonSplitter = /([0-9]+)[?#]([0-9]+\.[0-9]+)/;
	const lat = dm2dd(rawLat.split(latLonSplitter));
	const lon = dm2dd(rawLon.split(latLonSplitter));

	return {
		lat, lon
	}
}

export const parsePeLa = message => {
  const pieces = message.split(/^([A-Za-z0-9 åäöÅÄÖ]+) (\d{2,3}):([ABCD]):(.+):(N.+):(.+)/);

  mustHavePieces = [1,2,3,4,5,6];
  mustHavePieces.forEach(idx => {
  	if (!pieces[idx]) {
  		console.error('Parse error!\nData was:',message);
  		console.log('missing idx', idx);
  		console.log(pieces);
  		return {
  		  error: 400
  		}
  	}
  })

  const missionCode = pieces[2] + ' ' + pieces[3];
  const description = pieces[4];
  const coordinates = pieces[5];
  const units = pieces[6];

  // Parse coordinates separately
  const { lat, lon } = parseCoordinates(coordinates);

  const acData = data.findAlertCodeData(pieces[2]);
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

export const parsePSEH = message => {
  const pieces = message.split(/.+\/(N.+)\/(.+)\/([A-Z0-9]+)\/([ABCD])\/(.+)\/(.+)/);

  mustHavePieces = [1,2,3,4,5,6];
  mustHavePieces.forEach(idx => {
  	if (!pieces[idx]) {
  		console.error('Parse error!\nData was:',message);
  		console.log('missing idx', idx);
  		console.log(pieces);
  		return {
  		  error: 400
  		}
  	}
  })

  const missionCode = pieces[3] + ' ' + pieces[4];
  const description = pieces[2] + ', ' + pieces[6];
  const coordinates = pieces[1];
  const units = pieces[5];

  // Parse coordinates separately
  const { lat, lon } = parseCoordinates(coordinates);

  const acData = data.findAlertCodeData(pieces[4]);
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

