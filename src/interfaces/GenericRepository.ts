import { GenericEntity } from "@/classes"

export interface IGenericRepository<T extends GenericEntity<T>> {
    getAll(): T[]|Promise<T[]>
    getOne(id: number): T|Promise<T>
    insert(entity: T): T|Promise<T>
    update(entity: T): T|Promise<T>
    delete(entity: T): void|Promise<void>
}