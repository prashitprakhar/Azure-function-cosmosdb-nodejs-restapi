const express = require('express');
const bodyParser = require('body-parser');
const documentClient = require("documentdb").DocumentClient;
const connectionString = process.env["restapicosmosdb_DOCUMENTDB"];
const arr = connectionString.split(';');
const endpoint = arr[0].split('=')[1];
const primaryKey = arr[1].split('=')[1] + "==";
const collectionUrl = 'dbs/tasks/colls/users';
const client = new documentClient(endpoint, { "masterKey": primaryKey });
const app = express();
const router = express.router();
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    router.get('/', function(req, res){
        const allResults = queryCollection();
        allResults.toArray((err, results) => {
            if (err)throw err;
            //console.log(results);
            context.res.status(200).json({"AllItems": results});
            
        })
    });

    /*if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
    /*        body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    } */
    context.done(null, context.res);
};

function queryCollection(){
    const result = client.queryDocuments(
        collectionUrl,
        //"SELECT * FROM docs d WHERE d.id = 'item1'"
        "SELECT * FROM docs"
    );
    return result;
}