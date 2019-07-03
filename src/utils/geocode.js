const request = require('request')
/*
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGFwcHlsaW05OSIsImEiOiJjanhpdXI5eTMxNXRuM3lvOGxuMTYwd3o1In0.e_a8dgNB2ns3Y9m0D_35bw&limit=1`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}
*/

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGFwcHlsaW05OSIsImEiOiJjanhpdXI5eTMxNXRuM3lvOGxuMTYwd3o1In0.e_a8dgNB2ns3Y9m0D_35bw&limit=1`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const loc = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            }
            const {longitude, latitude, location} = loc
            callback(undefined, {
                longitude, latitude, location
            })
        }
    })
}

module.exports = geocode