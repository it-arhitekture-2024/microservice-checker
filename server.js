const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

const id = '6660433ca017b03692ce3621';

const services = [
    { name: 'User Service', url: `http://localhost:3000/web/users/${id}` },
    { name: 'Grades Service', url: 'http://localhost:3000/web/grades' },
    { name: 'Subjects Service', url: 'http://localhost:3000/web/subjects' },
];

app.get('/', async (req, res) => {
    const results = await Promise.all(
        services.map(async service => {
            return axios.get(service.url)
                .then(() => ({ name: service.name, status: 'UP' }))
                .catch(() => ({ name: service.name, status: 'DOWN' }));
        })
    );

    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Microservices checker service running on port ${PORT}`);
});
