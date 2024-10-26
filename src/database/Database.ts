import { Database as _Database } from "sqlite3"

export abstract class Database {

    private static instance: _Database|null = null

    public static getConnection(): _Database {
        if (Database.instance) {
            return Database.instance
        }

        Database.instance = new _Database("./cash-flow.db", function (error) {
            if (error) {
                throw error
            }
        })

        return Database.instance
    }

    public static closeConnection(): boolean {
        if (!Database.instance) {
            return true
        }

        Database.instance.close(function (error) {
            if (error) {
                console.error(error)
            }
        })

        return true
    }

    public static getNewConnection(): _Database {
        return new _Database("./cash-flow.db", function (error) {
            if (error) {
                throw error
            }
        })
    }

}