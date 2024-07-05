const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (request, response) => {
    fs.readFile('./home.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500).send('Error: ' + err)
        }
        response.send(html);
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App available on http://localhost:${port}`))

