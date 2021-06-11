const express = require ('express')
require('dotenv').config()
const sqlite = require('sqlite3').verbose()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const fs = require('fs')

//DB CONNECTION
let db = new sqlite.Database('./db/us-census.db', (err) => {
    if (err) {
        console.log(err.message) 
    }
    console.log('Connected to db')
})

// Start Express
const app = express()

app.use(express.json())
app.use(cors())

// APIs

//GET: GET COLUMNS NAME FROM DATABASE
app.get('/api/fitle', (_, res) => {
    db.all('PRAGMA table_info(census_learn_sql)', (err,data) => {
        var output = []
        if (err) {
            throw err
        } else {
            if(data.length === 0){
                res.send('Empty db')
            } else {
                data.forEach((row) => {
                    output.push({value: row.name, label: row.name})
                })
                res.send(output)
            }
        }
    })
    
})
//POST: GET FROM REQ THE SELECTED VALUE AND THEN SEND THE RESULT FROM THE SQL REQUEST
app.post('/api/select', (req, res) =>{
    const column = req.body.value
    const sql= 'SELECT DISTINCT "' + column + '" AS Value, COUNT("'+ column +'") AS Iteration, AVG(age) AS Average_age FROM census_learn_sql WHERE "'+ column +'" IS NOT NULL GROUP BY "'+ column +'" ORDER BY "'+ column + '" DESC;'
    db.all(sql, (err,data) => {
        if (err) {
            throw err
        } else {
            if (data.length === 0){
                res.send('Empty response')
            } else {
                const output_data=[]
                var id =  -1
                data.forEach((row) => {
                    ++id
                    output_data.push({id:id,Value:row.Value, Iteration:row.Iteration, Average_age:row.Average_age})
                })
                res.send(output_data)
            }
        }
    })
})
// LAUNCH
app.listen(PORT,() => {
    console.log(`Server successfully launched on port : ${PORT}`)
})