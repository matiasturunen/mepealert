const parser = require('../api/parser.js')

describe('PELA message', () => {
	const expected = {
		lat: 61.225,
		lon: 28.24,
		missionCode: '500 B',
		missionDescription: '',
		description: 'Unknown Island, Finland',
		units: 'UNI12, UNI23, UNI344'
	};

	it('Parse message with hash at coordinate', () => {
		const data = 'ALERT V PS 1234 500:B:Unknown Island, Finland:N 61#13.5000 E 28#14.40:UNI12, UNI23, UNI344'

		const result = parser.parsePeLa(data)
		expect(result).toEqual(expected)
	});

	it('Parse message with questionmark at coordinate', () => {
		const data = 'ALERT V PS 1234 500:B:Unknown Island, Finland:N 61?13.5000 E 28?14.40:UNI12, UNI23, UNI344'

		const result = parser.parsePeLa(data)
		expect(result).toEqual(expected)
	});

	it('Parse message without spaces and hash at coordinate', () => {
		const data = 'ALERT V PS 1234 500:B:Unknown Island, Finland:N61#13.5000 E28#14.40:UNI12, UNI23, UNI344'

		const result = parser.parsePeLa(data)
		expect(result).toEqual(expected)
	});
});

describe('PSEH message', () => {
	const expected = {
		lat: 61.225,
		lon: 28.24,
		missionCode: 'H17 C',
		missionDescription: '',
		description: 'Unknown Island, Finland, 0 warnings',
		units: 'UNI123'
	};

	it('Parse message with hash at coordinate', () => {
		const data = '18:11:40_04.07./N 61#13.5000 E 28#14.40/Unknown Island, Finland/H17/C/UNI123/0 warnings'
	
		const result = parser.parsePSEH(data)
		expect(result).toEqual(expected)
	});

	it('Parse message with questionmark at coordinate', () => {
		const data = '18:11:40_04.07./N 61?13.5000 E 28?14.40/Unknown Island, Finland/H17/C/UNI123/0 warnings'
	
		const result = parser.parsePSEH(data)
		expect(result).toEqual(expected)
	});
});
