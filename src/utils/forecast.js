const request = require('request')
/*
const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/8ec396387a31ff7b7c9e79fe6e7d1407/${latitude},${longitude}`
    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect weather service', undefined)
        } else if(response.body.error) {
            callback('Unable to search location', undefined)
        } else {
            const temperature = response.body.currently.temperature
            const chanceOfRain = response.body.currently.precipProbability
            callback(undefined, `It is currently ${temperature} degrees out. There is a ${chanceOfRain}% chance of rain.`)
        }
    })
}
*/

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/8ec396387a31ff7b7c9e79fe6e7d1407/${latitude},${longitude}`
    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect weather service', undefined)
        } else if(body.error) {
            callback('Unable to search location', undefined)
        } else {
            const data = {
                temperature: body.currently.temperature,
                chanceOfRain: body.currently.precipProbability,
                high: body.daily.data[0].temperatureHigh,
                low: body.daily.data[0].temperatureLow
            }
            const {temperature, chanceOfRain, high, low} = data

            callback(undefined, `It is currently ${temperature} degrees out. There is a ${chanceOfRain}% chance of rain. Temperature high ${high}, temperature low ${low}`)
        }
    })
}

module.exports = forecast