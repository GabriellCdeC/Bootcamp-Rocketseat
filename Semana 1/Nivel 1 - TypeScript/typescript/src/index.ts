import express from 'express'

const app = express()

app.get('/',(req, res, next) => {
    return res.json({message: 'Hello World'})
})

app.listen(3333)