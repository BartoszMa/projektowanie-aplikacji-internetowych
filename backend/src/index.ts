import express from 'express';
import { MongoConnector } from './connector/db_connector';

const app = express();
const port = 4200;

(async function main() {
    const mongoConnector = MongoConnector.getInstance();

    try {
        await mongoConnector.init();
        console.log('MongoDB connected.');

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });

    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    } finally {
        await mongoConnector.close();
    }
})()
