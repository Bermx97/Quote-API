const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes)
    res.send({ quote: randomQuote })
})

 let allQuotes = () => {
    const all = []
    for (let quote of quotes){
        all.push(quote)
    } return all
 }
    


app.get('/api/quotes', (req, res, next) => {
    const name = req.query.person
    const personQuotes = []
    const indexPerson = quotes.findIndex(x => x.person === name)
    if (name) {
        if (indexPerson !== -1) {
            for (let object of quotes) {
                if (object.person === name) {
                    personQuotes.push(object)
                }
            } res.send({ quotes: personQuotes })
        } else res.status(404).send()
    } else {
        res.send({ quotes: allQuotes() })
    }
})

app.listen(PORT, () => {
    console.log('server is working')
    })
    
