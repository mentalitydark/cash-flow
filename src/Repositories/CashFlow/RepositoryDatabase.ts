import { CashFlow } from "@/classes";
import { RepositoryBase } from "../RepositoryBase";
import { EntityNotFound } from "@/errors";
import { IGenericRepository } from "@/interfaces";
import { Database } from "@/database";

export class RepositoryDatabase extends RepositoryBase<CashFlow> implements IGenericRepository<CashFlow> {

    private _table = "cash_flow"

    public async getAll(): Promise<CashFlow[]> {
        try {
            const entities: CashFlow[] = [];

            const db = await Database.get()
    
            await db.each<CashFlow>(`SELECT * FROM ${this._table}`, (error, row) => {
                    if (error) {
                        throw error
                    }
    
                    entities.push(CashFlow.createFromJson(row))
                })

            return entities
        } catch (error) {
            throw error

        } finally {
            await Database.close()
        }
    }
    
    public async getOne(id: number): Promise<CashFlow> {
        try {
            const db = await Database.get()

            const result = await db.get(`SELECT * FROM ${this._table} WHERE id = :id`, { ':id': id })

            if (!result) {
                throw new EntityNotFound(id)
            }

            return CashFlow.createFromJson(result)
        } catch (error) {
            throw error
        } finally {
            await Database.close()
        }
    }

    public async insert(entity: CashFlow): Promise<CashFlow> {
        try {
            entity = super.insert(entity) as CashFlow

            const db = await Database.get()

            const result = await db.run(`
                INSERT INTO ${this._table} (description, type, value, date, created_at)
                VALUES (?, ?, ?, ?, ?)
            `, [entity.description, entity.type, entity.value, entity.date, entity.created_at])

            entity.id = result.lastID

            return entity
        } catch (error) {
            throw error
        } finally {
            await Database.close()
        }
    }

    public async update(entity: CashFlow): Promise<CashFlow> {
        try {
            entity = super.update(entity) as CashFlow

            const db = await Database.get()

            const result = await db.run(`
                UPDATE ${this._table}
                SET
                    description = $description,
                    type = $type,
                    value = $value,
                    date = $date,
                    updated_at = $updated_at
                WHERE id = $id
            `, {
                $description: entity.description,
                $type: entity.type,
                $value: entity.value,
                $date: entity.date,
                $updated_at: entity.updated_at,
                $id: entity.id
            })

            if (!result.changes) {
                throw new Error("Nenhuma linha alterada")
            }
    
            return entity
        } catch (error) {
            throw error
        } finally {
            await Database.close()
        }
    }

    public async delete(entity: CashFlow): Promise<void> {
        try {
            const db = await Database.get()

            const result = await db.run(`
                DELETE FROM ${this._table}
                WHERE id = $id
            `, { $id: entity.id })

            if (!result.changes) {
                throw new Error("Nenhuma linha alterada")
            }
            
        } catch (error) {
            throw error
        } finally {
            await Database.close()
        }
    }

}