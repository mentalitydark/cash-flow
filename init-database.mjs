import 'dotenv/config'
import sqlite3 from "sqlite3"
import { open } from "sqlite"

let db
try {
    db = await open({
        filename: "./"+ process.env.DATABASE_FILE,
        driver: sqlite3.Database
    })

    db.exec(`
        CREATE TABLE IF NOT EXISTS cash_flow (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT(255) NOT NULL,
            type TEXT(1) NOT NULL,
            value REAL(10, 5) NOT NULL,
            date TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT NULL
        );
        CREATE TRIGGER IF NOT EXISTS update_cash_flow_updated_at
            BEFORE UPDATE ON cash_flow
            BEGIN
                UPDATE cash_flow
                SET updated_at = current_timestamp
                WHERE id = OLD.id;
            END;
    `)

    console.log("Banco de dados criado!")
} catch (err) {
    console.log(err)
} finally {
    if (db)
    await db.close()
}
