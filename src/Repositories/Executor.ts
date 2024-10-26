import { GenericEntity } from "@/classes";
import { IGenericRepository } from "@/interfaces";

export abstract class Executor {

    public static get<T extends GenericEntity<T>>(repository: IGenericRepository<T>, id?: number): T|T[] {
        if (id) {
            return Executor.getOne(repository, id)
        } else {
            return Executor.getAll(repository)
        }
    }

    public static getAll<T extends GenericEntity<T>>(repository: IGenericRepository<T>): T[] {
        return repository.getAll()
    }

    public static getOne<T extends GenericEntity<T>>(repository: IGenericRepository<T>, id: number): T {
        return repository.getOne(id)
    }

    public static add<T extends GenericEntity<T>>(repository: IGenericRepository<T>, entity: T): T {
        return repository.insert(entity)
    }

    public static update<T extends GenericEntity<T>>(repository: IGenericRepository<T>, entity: T): T {
        return repository.update(entity)
    }

    public static delete<T extends GenericEntity<T>>(repository: IGenericRepository<T>, entity: T): void {
        repository.delete(entity)
    }

}