const createHandler = require("azure-function-express").createHandler;
const express = require('express');
const bodyParser = require('body-parser');
const documentClient = require("documentdb").DocumentClient;
const connectionString = "AccountEndpoint=https://cosmosdbtimer.documents.azure.com:443/;AccountKey=dpLkjXTKaUN1ATEzX0j8CIzntU4JYObuVe6ZDZdFQ0hScMajJKFg6wOSZQyIIPCfm3A3JHXv5SlXEP2K9Ted0Q==;"
const arr = connectionString.split(';');
const endpoint = arr[0].split('=')[1];
const primaryKey = arr[1].split('=')[1] + "==";
const collectionUrl = 'dbs/tasks/colls/users';
const client = new documentClient(endpoint, { "masterKey": primaryKey });
const app = express();
//const router = express.Router();
app.get('/users', function(context, req, res){
        const allResults = queryCollection();
        context.log("Hello");
        allResults.toArray((err, results) => {
            if (err)throw err;
            //console.log(results);
           // context.log("HI");
           // context.log(results);
            res.json({"AllItems": results});
            
        })
    });

function queryCollection(){
    const result = client.queryDocuments(
        collectionUrl,
        //"SELECT * FROM docs d WHERE d.id = 'item1'"
        "SELECT * FROM docs"
    );
    return result;
}

module.exports = createHandler(app);