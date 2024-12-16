const dd2dm = dd => {
    const degs = parseInt(dd);
    const mins = (dd - degs) * 60;
  
    return degs+'#'+mins.toFixed(4);
  }

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.code 
        || !body.units
        || !body.message
        || !body.urgency
        || !body.coordinates
        || !body.prefix
    ) {
        setResponseStatus(event, 400)
        return
    }

    console.log('Started generate...');

    // Alert starts with prefix
    let alert = body.prefix.trim();

    // Next is alert code and urgency
    alert += ' '+body.code+':'+body.urgency;

    // Then message 
    alert += ':'+body.message.trim()

    // Coordinates, need to convert first...
    const lat = dd2dm(body.coordinates.lat);
    const lng = dd2dm(body.coordinates.lng);
    alert += ':N '+lat+' E '+lng;

    // Units
    const units = body.units.join(', ');
    alert += ':'+units;

    return { alert }
})
