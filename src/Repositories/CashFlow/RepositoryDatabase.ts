import { CashFlow } from "@/classes";
import { EntityNotFound } from "@/errors";
import { ICashFlowProps, IGenericRepository } from "@/interfaces";
import { Database } from "@/database";
import { createSelectQuery } from "@/Utils";

export class RepositoryDatabase implements IGenericRepository<CashFlow> {

    private _table = "cash_flow"

    public async getAll(): Promise<CashFlow[]> {
        try {
            const entities: CashFlow[] = [];

            const db = await Database.get()
    
            await db.each<ICashFlowProps>(createSelectQuery<ICashFlowProps>(["id", "description", "type", "value", "date"], this._table), (error, row) => {
                    if (error) {
                        throw error
                    }
    
                    const entity = new CashFlow()

                    entity.createFromJSON(row)
                    
                    entities.push(entity)
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

            const result = await db.get<ICashFlowProps>(`
                ${createSelectQuery<ICashFlowProps>(["id", "description", "type", "value", "date"], this._table)}
                WHERE id = :id`, { ':id': id }
            )

            if (!result) {
                throw new EntityNotFound(id)
            }

            const entity = new CashFlow()

            entity.createFromJSON(result)

            return entity
        } catch (error) {
            throw error
        } finally {
            await Database.close()
        }
    }

    public async insert(entity: CashFlow): Promise<CashFlow> {
        try {
            const db = await Database.get()

            const result = await db.get<{id: string, created_at: string}>(`
                INSERT INTO ${this._table} (description, type, value, date)
                VALUES (?, ?, ?, ?)
                RETURNING id, created_at
            `, [entity.description, entity.type, entity.value, entity.date])

            if (!result) {
                throw new Error("Erro ao inserir uma movimentação financeira")
            }

            entity.id = Number(result.id)
            entity.created_at = result.created_at

            return entity
        } catch (error) {
            throw error
        } finally {
            await Database.close()
        }
    }

    public async update(entity: CashFlow): Promise<CashFlow> {
        try {
            const db = await Database.get()

            const result = await db.get<{ updated_at: string }>(`
                UPDATE ${this._table}
                SET
                    description = $description,
                    type = $type,
                    value = $value,
                    date = $date
                WHERE id = $id
                RETURNING DATETIME(updated_at, 'localtime') AS updated_at
            `, {
                $description: entity.description,
                $type: entity.type,
                $value: entity.value,
                $date: entity.date,
                $id: entity.id
            })

            if (!result) {
                throw new Error("Não foi possível alterar a movimentação financeira")
            }
            
            entity.updated_at = result.updated_at
            
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
                throw new Error("Não foi possível deletar a movimentação financeira")
            }
            
        } catch (error) {
            throw error
        } finally {
            await Database.close()
        }
    }

}