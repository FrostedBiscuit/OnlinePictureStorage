const express = require(`express`);
const app = express();

const port = 3000;

const datastore = require(`nedb`);
const database = new datastore(`platforms.db`);

database.loadDatabase(err => {
    if (err) {
        console.log(`error!!!`);
    }
});

app.listen(port, () => { console.log(`Listening at ${port}`); });

app.use(express.static(`public`));
app.use(express.json());

app.get(`/api`, (request, response) => {

    database.find({}, (err, data) => {
        if (err) {
            console.log(err);
            response.end();
            return;
        }

        response.json(data);
    });
});

app.post(`/api`, (request, response) => {

    const platformData = request.body;
    platformData.timestamp = Date.now();

    database.insert(platformData);

    console.log(platformData.platform);

    response.json({ 
        status: 'success',
        platform: platformData.platform
    });
});