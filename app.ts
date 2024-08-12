import express from 'express'
import cors from 'cors'
import router from './router'

const app = express()

// 解决跨域
app.use(cors())
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'content-type')
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
    if (req.method === 'OPTIONS') res.send(200)
    else next()
})

app.use(router)

app.listen(80, () => console.log('Express server is running... 80'))