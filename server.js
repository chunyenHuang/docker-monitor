const express = require('express');
const { printStats, logStats } = require('./printStats');
const app = express();
const port = process.env.PORT || 8888;

app.use(express.static('./public/build'))
app.get('/', (req, res) => {
    res.send('ok');
});
app.get('/stats', (req, res) => {
    printStats().then((data) => {
        res.json(data);
    });
});
app.listen(port, ()=>{
    console.log(`listening to port: ${port}`);
});