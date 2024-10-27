import { GenericEntity } from "@/classes"
import { IGenericRepository } from "@/interfaces"

export abstract class RepositoryBase<T extends GenericEntity<T>> implements IGenericRepository<T> {

    public abstract getAll(): T[]|Promise<T[]>
    public abstract getOne(id: number): T|Promise<T>
    public abstract delete(entity: T): void|Promise<void>

    private getCurrentTime() {
        return (new Date()).getTime()
    }

    public insert(entity: T): T|Promise<T> {
        entity.created_at = this.getCurrentTime()

        return entity
    }

    public update(entity: T): T|Promise<T> {
        entity.updated_at = this.getCurrentTime()

        return entity
    }

}