import sqlite3 from "sqlite3"
import { open } from "sqlite"

open({
    filename: "./test.db",
    driver: sqlite3.Database
}).then(connection => {
    connection.exec(`
        CREATE TABLE IF NOT EXISTS cash_flow (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT(255) NOT NULL,
            type TEXT(1) NOT NULL,
            value REAL(10, 5) NOT NULL,
            date TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT NULL
        );
    `).then(() => {
        connection.exec(`
            CREATE TRIGGER IF NOT EXISTS update_cash_flow_updated_at
            BEFORE UPDATE ON cash_flow
            BEGIN
                UPDATE cash_flow
                SET updated_at = current_timestamp
                WHERE id = OLD.id;
            END;
        `).then(() => {
            console.log("Criado com sucesso.")
        })
    }).catch(err => console.error(err))
})