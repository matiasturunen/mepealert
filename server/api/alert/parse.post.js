import { parsePeLa, parsePSEH } from '../../parser'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!body.alert) {
        setResponseStatus(event, 400)
        return
    }

    console.log('Started parse...');

    // Decide message type
    const message = body.alert;
    const pelaRegex = /^([A-Za-zäöåÄÖÅ]+ V [A-ZÄÖÅ]{2} [0-9]+).+/;
    const psehRegex = /^\d{2}:\d{2}:\d{2}_\d{2}\.\d{2}\.\/N/;

    if (pelaRegex.test(message)) {
        console.log('Parse pela message');
        const resp = parsePeLa(message);
        if (resp.error) {
            setResponseStatus(event, resp.error)
            return
        } else {
            return resp
        }
    } else if (psehRegex.test(message)) {
        console.log('Parse pseh message');
        const resp = parsePSEH(message);
        if (resp.error) {
            setResponseStatus(event, resp.error)
            return
        } else {
            return resp
        }
    } else {
        console.error('Unable to parse message', message);
        setResponseStatus(event, 400)
        return
    }
})
