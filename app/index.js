
//Dependencies
const express = require('express');
const Joi = require('joi')
const sql = require("mssql");

//Express object
var app = express();

    // config for your database
    var config = {
        server : "DESKTOP-8HVUG6V",
        database : "Trading",
        user : "moon",
        password : "moon",
        options: {
            instanceName : "SQLSERVERDEV",
            trustedConnection: true,
            trustServerCertificate: true
        }
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

         
        let stocklist = []
//Routes
app.get('/trading/month/:id', function (req, res) {
   
    
        // create SQL Request object
        const sqlRequest = new sql.Request();

        // query to the database and get the records
        sqlRequest.query('SELECT  *   FROM [Trading].[dbo].[vw_PerformanceByMonth] ORDER BY Rank', function (err, recordset) {
            
            
            stocklist = recordset.recordsets[0]
            if (err) console.log(err)
            const resultlist = stocklist.filter(a=>a.Month ==req.params.id)
            if(resultlist.length ==0) res.status(404).send('The result for the given month was not found')
            
            res.send(resultlist)
        });
    });
});


app.get('/trading/year', function (req, res) {
   
    // create SQL Request object
    const sqlRequest = new sql.Request();

    
    // query to the database and get the records
    sqlRequest.query('SELECT  *   FROM [Trading].[dbo].[vw_PerformanceByYear] ORDER BY Rank', function (err, recordset) {
        
        if (err) console.log(err)
        
        stocklist = recordset.recordsets[0]
        
        // send records as a response
        res.send(stocklist);
        
    });
});


const port = process.env.port || 5000

var server = app.listen(port, function () {
    console.log(`Server is running at ${port}`);
});