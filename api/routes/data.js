/* eslint-disable */
const { Router } = require('express')
const bodyParser = require('body-parser')

const router = Router()

router.use(bodyParser.json())

router.get('/data/alertcodes', (req, res) => {
  res.json({
    codes: alertCodes
  })
});

const alertCodes = [
  { value: "700", text: "Eloton", urgency: "ABC" },
  { value: "701", text: "Elvytys", urgency: "A" },
  { value: "702", text: "Tajuttomuus", urgency: "AB" },
  { value: "703", text: "Hengitysvaikeus", urgency: "ABCD" },
  { value: "704", text: "Rintakipu", urgency: "ABCD" },
  { value: "705", text: "Rytmihäiriö", urgency: "ABC" },
  { value: "706", text: "Aivoverenkierron häiriö", urgency: "ABC" },
  { value: "707", text: "Ensihoitopalveluun kuuluva hoitolaitossiirto", urgency: "BCD" },
  { value: "711", text: "Ilmatie-este", urgency: "AB" },
  { value: "713", text: "Hirttäytyminen, kuristuminen", urgency: "AB" },
  { value: "714", text: "Hukkuminen", urgency: "AB" },
  { value: "741", text: "Putoaminen", urgency: "ABC" },
  { value: "744", text: "Haava", urgency: "ABCD" },
  { value: "745", text: "Kaatuminen", urgency: "ABCD" },
  { value: "746", text: "Isku", urgency: "ABCD" },
  { value: "747", text: "Puristuminen / muu vamma", urgency: "ABCD" },
  { value: "751", text: "Kaasumyrkytys", urgency: "ABC" },
  { value: "752", text: "Myrkytys", urgency: "ABC" },
  { value: "753", text: "Sähköisku", urgency: "ABC" },
  { value: "754", text: "Palovamma", urgency: "ABC" },
  { value: "755", text: "PalovammAlämpöhalvaus", urgency: "ABC" },
  { value: "756", text: "Alilämpöisyys", urgency: "ABC" },
  { value: "757", text: "Onnettomuus, muu", urgency: "ABC" },
  { value: "761", text: "Verenvuoto; Suusta", urgency: "ABC" },
  { value: "762", text: "Verenvuoto; Gynekologinen / urologinen", urgency: "ABCD" },
  { value: "763", text: "Verenvuoto; korva / nenä", urgency: "ABCD" },
  { value: "764", text: "Säärihaava / muu", urgency: "ABCD" },
  { value: "770", text: "Epäselvä sairauskohtaus", urgency: "B" },
  { value: "771", text: "Sokeritasapainon häiriö", urgency: "ABCD" },
  { value: "772", text: "Kouristelu", urgency: "ABCD" },
  { value: "773", text: "Yliherkkyysreaktio", urgency: "ABCD" },
  { value: "774", text: "Heikentynyt yleistilAmuu sairaus", urgency: "ABCD" },
  { value: "775", text: "Oksentelu, ripuli", urgency: "BCD" },
  { value: "781", text: "Vatsakipu", urgency: "ABCD" },
  { value: "782", text: "Pää- / niskasärky", urgency: "ABCD" },
  { value: "783", text: "Selkä- / lonkkakipu", urgency: "ABCD" },
  { value: "784", text: "Raajakipu", urgency: "BCD" },
  { value: "785", text: "Mielenterveysongelma", urgency: "CD" },
  { value: "786", text: "Vartalokipu", urgency: "BCD" },
  { value: "790", text: "Hälytys puhelun aikana", urgency: "B" },
  { value: "791", text: "Synnytys", urgency: "ABC" },
  { value: "792", text: "Varallaolo, valmiussiirto", urgency: "BC" },
  { value: "793", text: "Hoitolaitossiirto", urgency: "D" },
  { value: "794", text: "Muu sairaankuljetustehtävä / aikatilaustehtävä", urgency: "D" },
  { value: "796", text: "Monipotilastilanne / suuronnettomuus", urgency: "A" },
  { value: "49", text: "Onnettomuustilanne; muu", urgency: "ABCD" },
  { value: "103", text: "Automaattinen palohälytys", urgency: "ABCD" },
  { value: "104", text: "Ilmoitinlaitehälytys: säteilyhälytys", urgency: "ABCD" },
  { value: "105", text: "Ilmoitinlaitehälytys: hissihälytys", urgency: "ABCD" },
  { value: "106", text: "Ilmoitinlaitehälytys: laitevika", urgency: "ABCD" },
  { value: "107", text: "Ilmoitinlaitehälytys: yhteysvika", urgency: "ABCD" },
  { value: "108", text: "Ilmoitinlaitehälytys: huolto", urgency: "ABCD" },
  { value: "200", text: "Tieliikenneonnettomuus: muu tai onnettomuuden uhka", urgency: "ABCD" },
  { value: "201", text: "Tieliikenneonnettomuus; peltikolari, suistuminen", urgency: "ABCD" },
  { value: "202", text: "Tieliikenneonnettomuus; Pieni", urgency: "ABC" },
  { value: "203", text: "Tieliikenneonnettomuus; Keskisuuri", urgency: "ABC" },
  { value: "204", text: "Tieliikenneonnettomuus; Suuri", urgency: "AB" },
  { value: "205", text: "Tieliikenneonnettomuus; eläin osallisena", urgency: "ei henkilövahinkoja" },
  { value: "206", text: "Tieliikenneonnettomuus maan alla; Pieni", urgency: "ABCD" },
  { value: "207", text: "Tieliikenneonnettomuus maan alla; Keskisuuri", urgency: "ABCD" },
  { value: "208", text: "Tieliikenneonnettomuus maan alla; Suuri", urgency: "ABCD" },
  { value: "210", text: "Raideliikenneonnettomuus; muu", urgency: "ABCD" },
  { value: "211", text: "Raideliikenneonnettomuus; peltikolari", urgency: "ABCD" },
  { value: "212", text: "Raideliikenneonnettomuus; Pieni", urgency: "AB" },
  { value: "213", text: "Raideliikenneonnettomuus; Keskisuuri", urgency: "AB" },
  { value: "214", text: "Raideliikenneonnettomuus; Suuri", urgency: "A" },
  { value: "215", text: "Raideliikenneonnettomuus; eläin osallisena", urgency: "ABCD" },
  { value: "216", text: "Raideliikenneonnettomuus maan alla; Pieni", urgency: "ABCD" },
  { value: "217", text: "Raideliikenneonnettomuus maan alla; Keskisuuri", urgency: "ABCD" },
  { value: "218", text: "Raideliikenneonnettomuus maan alla; Suuri", urgency: "ABCD" },
  { value: "220", text: "Vesiliikenneonnettomuus; Muu", urgency: "AB" },
  { value: "221", text: "Vesiliikenneonnettomuus; Pieni", urgency: "AB" },
  { value: "222", text: "Vesiliikenneonnettomuus; Keskisuuri", urgency: "AB" },
  { value: "223", text: "Vesiliikenneonnettomuus; Suuri", urgency: "AB" },
  { value: "231", text: "Ilmaliikenneonnettomuus; Pieni", urgency: "A 1-4 henkeä", urgency: "ABCD" },
  { value: "232", text: "Ilmaliikenneonnettomuus; Keskisuuri", urgency: "A 5-10 henkeä", urgency: "ABCD" },
  { value: "233", text: "Ilmaliikenneonnettomuus; Suuri", urgency: "A yli kymmenen henkeä", urgency: "ABCD" },
  { value: "234", text: "Ilmaliikenneonnettomuusvaara; Pieni", urgency: "B 1-4 henkeä", urgency: "ABCD" },
  { value: "235", text: "Ilmaliikenneonnettomuusvaara; Keskisuuri", urgency: "B 5-10 henkeä", urgency: "ABCD" },
  { value: "236", text: "Ilmaliikenneonnettomuusvaara; Suuri", urgency: "B yli kymmenen henkeä", urgency: "ABCD" },
  { value: "271", text: "Maastoliikenneonnettomuus", urgency: "AB" },
  { value: "401", text: "Rakennuspalo; Pieni", urgency: "AB" },
  { value: "402", text: "Rakennuspalo; Keskisuuri", urgency: "AB" },
  { value: "403", text: "Rakennuspalo; Suuri", urgency: "AB" },
  { value: "404", text: "Rakennuspalo maan alla; pieni", urgency: "ABCD" },
  { value: "405", text: "Rakennuspalo maan alla; keskisuuri", urgency: "ABCD" },
  { value: "406", text: "Rakennuspalo maan alla; suuri", urgency: "ABCD" },
  { value: "411", text: "Liikennevälinepalo; Pieni", urgency: "ABCD" },
  { value: "412", text: "Liikennevälinepalo;Keskisuuri", urgency: "ABCD" },
  { value: "413", text: "Liikennevälinepalo;Suuri", urgency: "ABCD" },
  { value: "414", text: "Liikennevälinepalo maan alla; pieni", urgency: "ABCD" },
  { value: "415", text: "Liikennevälinepalo maan alla; keskisuuri", urgency: "ABCD" },
  { value: "416", text: "Liikennevälinepalo maan alla; suuri", urgency: "ABCD" },
  { value: "420", text: "savuhavainto/tarkastustehtävä", urgency: "ABCD" },
  { value: "421", text: "Maastopalo ; Pieni", urgency: "ABC" },
  { value: "422", text: "Maastopalo ; Keskisuuri", urgency: "AB" },
  { value: "423", text: "Maastopalo ; Suuri", urgency: "AB" },
  { value: "424", text: "Turvetuotantoaluepalo: pieni", urgency: "ABCD" },
  { value: "425", text: "Turvetuotantoaluepalo: keskisuuri", urgency: "ABCD" },
  { value: "426", text: "Turvetuotantoaluepalo: suuri", urgency: "ABCD" },
  { value: "431", text: "Tulipalo muu ; Pieni", urgency: "AB" },
  { value: "432", text: "Tulipalo muu ; Keskisuuri", urgency: "AB" },
  { value: "433", text: "Tulipalo muu ; Suuri", urgency: "AB" },
  { value: "434", text: "Tulipalo muu, maan alla; pieni", urgency: "ABCD" },
  { value: "435", text: "Tulipalo muu, maan alla; keskisuuri", urgency: "ABCD" },
  { value: "436", text: "Tulipalo muu, maan alla; suuri", urgency: "ABCD" },
  { value: "441", text: "Räjähdys / sortuma; Pieni", urgency: "AB" },
  { value: "442", text: "Räjähdys / sortuma; Keskisuuri", urgency: "AB" },
  { value: "443", text: "Räjähdys / sortuma; Suuri", urgency: "AB" },
  { value: "444", text: "Räjähdys- / sortumavaara", urgency: "B" },
  { value: "451", text: "Vaarallisen aineen onnettomuus; Pieni", urgency: "AB" },
  { value: "452", text: "Vaarallisen aineen onnettomuus; Keskisuuri", urgency: "AB" },
  { value: "453", text: "Vaarallisen aineen onnettomuus; Suuri", urgency: "A" },
  { value: "455", text: "Vaarallisen aineen onnettomuus; vaara", urgency: "ABCD" },
  { value: "456", text: "Ydinvoimalaitos: varautumistilanne", urgency: "ABCD" },
  { value: "457", text: "Ydinvoimalaitos: laitoshätätilanne", urgency: "ABCD" },
  { value: "458", text: "Ydinvoimalaitos: yleishätätilanne", urgency: "ABCD" },
  { value: "461", text: "Vahingontorjunta; Pieni", urgency: "BCD" },
  { value: "462", text: "Vahingontorjunta; Keskisuuri", urgency: "BCD" },
  { value: "463", text: "Vahingontorjunta; Suuri", urgency: "BCD" },
  { value: "471", text: "Öljyvahinko / ympäristöonnettomuus; maallA pieni", urgency: "ABCD" },
  { value: "472", text: "Öljyvahinko / ympäristöonnettomuus; maallA keskisuuri", urgency: "ABCD" },
  { value: "473", text: "Öljyvahinko / ympäristöonnettomuus; maallA suuri", urgency: "ABCD" },
  { value: "474", text: "Öljyvahinko / ympäristöonnettomuus; vesistössä, pieni", urgency: "ABCD" },
  { value: "475", text: "Öljyvahinko / ympäristöonnettomuus; vesistössä, keskisuuri", urgency: "ABCD" },
  { value: "476", text: "Öljyvahinko / ympäristöonnettomuus; vesistössä, suuri", urgency: "ABCD" },
  { value: "477", text: "Öljyvahinko / ympäristöonnettomuus; vaara", urgency: "ABCD" },
  { value: "480", text: "Ihmisen pelastaminen; Muu", urgency: "AB" },
  { value: "481", text: "Ihmisen pelastaminen; Etsintä", urgency: "AB" },
  { value: "482", text: "Ihmisen pelastaminen; Avunanto", urgency: "AB" },
  { value: "483", text: "Ihmisen pelastaminen; Vedestä", urgency: "AB" },
  { value: "484", text: "Ihmisen pelastaminen; Pintapelastus", urgency: "AB" },
  { value: "485", text: "Ihmisen pelastaminen; Maastosta", urgency: "AB" },
  { value: "486", text: "Ihmisen pelastaminen; Puristuksista", urgency: "AB" },
  { value: "487", text: "Ihmisen pelastaminen; ylhäältä/Alhaalta", urgency: "AB" },
  { value: "490", text: "Onnettomuustilanne maanpäällä", urgency: "epäselvä tilanne, koodi tarkentuu" },
  { value: "550", text: "Avunanto; muu", urgency: "ABCD" },
  { value: "551", text: "Avunanto; Virka-apu toiselle viranomaiselle", urgency: "ABCD" },
  { value: "552", text: "Avunanto; tarkistus tms. tehtävä", urgency: "ABCD" },
  { value: "553", text: "Avunanto; uhka- / varuillaolotehtävä", urgency: "ABCD" },
  { value: "554", text: "Avunanto; Tarkistus- / varmistustehtävä", urgency: "ABCD" },
  { value: "580", text: "Eläintehtävä; muu", urgency: "ABCD" },
  { value: "581", text: "Eläintehtävä; eläimen pelastaminen", urgency: "ABC" }
];

module.exports = router;
module.exports.dataValues = {
  alertCodes
}