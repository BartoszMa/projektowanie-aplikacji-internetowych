import express from 'express';
import { MongoConnector } from './connector/db_connector';
import mockRoutes from './mockRoutes';
import cors from 'cors';

const app = express();
const port = 4200;

app.use(cors());
app.use(express.json());

// TODO: change to real data
app.use('/api', mockRoutes);

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
