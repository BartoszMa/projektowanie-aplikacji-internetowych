import 'dotenv/config';
import {MongoClient, Db} from 'mongodb';

export class MongoConnector {
    private static instance: MongoConnector;
    private client: MongoClient;
    private db: Db | null = null;
    private connected: boolean = false;

    private constructor(
        private readonly uri: string,
        private readonly dbName: string
    ) {
        this.client = new MongoClient(this.uri);
    }

    static getInstance(): MongoConnector {
        if (!MongoConnector.instance) {
            const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
            const dbName = process.env.DB_NAME || 'test';
            MongoConnector.instance = new MongoConnector(uri, dbName);
        }
        return MongoConnector.instance;
    }

    async init() {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        this.connected = true;
    }

    getDb(): Db {
        if (!this.db) throw new Error('Database not initialized. Call init() first.');
        return this.db;
    }

    async close() {
        if (!this.connected) return;
        await this.client.close();
        this.db = null;
        this.connected = false;
        MongoConnector.instance = null!;
    }
}
