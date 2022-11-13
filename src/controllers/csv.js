const { Parser } = require('json2csv');
const fs = require('fs');
const http = require('http');
const { response } = require('express');

let data;

let options = {
    host: 'localhost',
    path: '/api/cars',
    port: '1337'
};

const callback = (response) => {
    let str = '';

    response.on('data', (chunk) => {
        str += chunk
    });
    response.on('end', () => {
        data = str;
    })
}

http.request(options, callback).end();


try {
    const fields = ['id', 'currentKilometers', 'geofenceRadius', 'velocityLimit', 'image', 'description', 'insurancePolicyValidity', 'verificationValidity', 'circulationCardValidity', 'active', 'modelId', 'clientId'];
    const opts = { fields, };

    const parser = new Parser(opts);
    const csv = parser.parse(data);

    fs.writeFileSync('./data.csv', csv);
    console.log(csv);
}
catch (err){
    console.log(err);
}
