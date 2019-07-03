const path = require('path') // core node module
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'index name'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is about page',
        name: 'about name'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help page',
        name: 'help name'
    })
})

/*
app.get('', (req, res) => {
    res.send('<h1>hello world</h1>')
})

app.get('/help', (req, res) => {
    res.send([
        {
            name: 'sean',
            age: 30
        },
        {
            name: 'melissa',
            age: 25
        }
    ])
})

app.get('/about', (req, res) => {
    res.send('<h3>Glad day</h3>')
})
*/
app.get('/weather', (req, res) => {
    address = req.query.address
    if(!address) {
        return res.send({
            error: 'No address'
        })
    }
    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if(error) {
            return res.send({
                error: 'Connection error'
            })
        }

        forecast(longitude, latitude, (error, data) => {
            if(error) {
                return res.send({
                    error: 'Connection error'
                })
            }
            res.send({
                address: address,
                data: data,
                location: location
            })
        })
    })
})
    /*
    res.send({
        address: 'Boston'
    })
    */

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('file_not_found', {
        code: '404-1',
        errorMsg: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        code: '404',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})