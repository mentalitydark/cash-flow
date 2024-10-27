import sqlite3 from "sqlite3"
import { open, Database as _Database } from "sqlite"

export abstract class Database {

    private static instance: _Database|null = null

    public static async get() {
        if (Database.instance) {
            return Database.instance
        }

        try {
            const connection = await open({
                filename: "./cash-flow.db",
                driver: sqlite3.Database
            }) as _Database

            Database.instance = connection
    
            return Database.instance
        } catch (error) {
            throw error
        }
    }

    public static async close(): Promise<boolean> {
        if (!Database.instance) {
            return true
        }

        try {
            await Database.instance.close()
            Database.instance = null
        } catch (error) {
            throw error
        }

        return true
    }

}