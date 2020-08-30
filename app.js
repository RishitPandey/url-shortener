const express  = require('express'),
      mongoose = require('mongoose'),
      app      = express(),
      ShortUrl = require('./models/shorturl')

mongoose.connect('mongodb://localhost/urlshortners', {
    useNewUrlParser: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    var shorturls = await ShortUrl.find()
    res.render('index', { shorturls: shorturls })
})

app.post('/shorturls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullurl })
    res.redirect('/')
})

app.get('/:shorturl', async (req, res) => {
    var shorturl = await ShortUrl.findOne({ short: req.params.shorturl })

    if(shorturl === null) return res.sendStatus(404)

    shorturl.clicks++
    shorturl.save()

    res.redirect(shorturl.full)
})

app.listen(process.env.port || 3000, () => {
    console.log('Server started go...')
})