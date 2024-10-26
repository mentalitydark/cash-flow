import { GenericEntity } from "@/classes"

export interface IGenericRepository<T extends GenericEntity<T>> {
    getAll(): T[]
    getOne(id: number): T
    insert(entity: T): T
    update(entity: T): T
    delete(entity: T): void
}