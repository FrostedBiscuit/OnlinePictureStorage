const express = require(`express`);
const app = express();

const port = 3000;

const datastore = require(`nedb`);
const database = new datastore(`platforms.db`);

const fs = require(`fs`);

database.loadDatabase(err => {
    if (err) {
        console.log(`error!!!`);
    }
});

app.listen(port, () => { console.log(`Listening at ${port}`); });

app.use(express.static(`public`));
app.use(express.json({limit: '10mb', extended: 'true'}));

app.get(`/api`, (request, response) => {

    let outData = [];

    database.find({}, (err, data) => {
        if (err) {
            console.log(err);
            response.end();
            return;
        }

        for (entry of data) {
            
            const img64 = fs.readFileSync(entry.imagePath, { encoding: 'utf8' });

            entry.image64 = img64;
            delete entry.imagePath;

            console.log(entry);

            outData.push(entry);
        }

        console.log(outData);

        response.json(outData);
    });
});

let picNumber = 0;

app.post(`/api`, (request, response) => {

    const userData = request.body;
    userData.timestamp = Date.now();

    if (userData.image64 != null) {
        
        picNumber++;

        const picPath = `images/${picNumber}.txt`;
        
        fs.writeFile(picPath, userData.image64, (error) => {
            
            if (error) {
                throw error;
            }

            delete userData.image64;
            userData.imagePath = picPath;

            console.log(`writing to db, data: ${userData}`);

            database.insert(userData);
        });
    }

    response.json({ 
        status: 'success',
    });
});