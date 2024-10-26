import { GenericEntity } from "@/classes"
import { IGenericRepository } from "@/interfaces"

export abstract class RepositoryBase<T extends GenericEntity<T>> implements IGenericRepository<T> {

    public abstract getAll(): T[]
    public abstract getOne(id: number): T
    public abstract delete(entity: T): void

    private getCurrentTime() {
        return (new Date()).getTime()
    }

    public insert(entity: T): T {
        entity.created_at = this.getCurrentTime()

        return entity
    }

    public update(entity: T): T {
        entity.updated_at = this.getCurrentTime()

        return entity
    }

}