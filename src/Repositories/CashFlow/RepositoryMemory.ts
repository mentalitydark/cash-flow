import { CashFlow } from "@/classes";
import { RepositoryBase } from "../RepositoryBase";
import { EntityNotFound } from "@/errors";
import { IGenericRepository } from "@/interfaces";

export class RepositoryMemory extends RepositoryBase<CashFlow> implements IGenericRepository<CashFlow> {

    private static memory: CashFlow[] = []

    public getAll(): CashFlow[] {
        return RepositoryMemory.memory
    }

    public getOne(id: number): CashFlow {
        const entityInArray = RepositoryMemory.memory.find((e) => e.id === id)

        console.log(entityInArray)
        if(!entityInArray) {
            throw new EntityNotFound(id)
        }

        return entityInArray
    }

    public insert(entity: CashFlow): CashFlow {
        super.insert(entity)

        entity.id = RepositoryMemory.memory.length + 1

        RepositoryMemory.memory.push(entity)

        return entity
    }

    public update(entity: CashFlow): CashFlow {
        console.log(RepositoryMemory.memory)
        super.update(entity)

        const entityInArray = RepositoryMemory.memory.find(({ id }) => id === entity.id)

        if(!entityInArray) {
            throw new EntityNotFound(entity.id!)
        }

        const index = RepositoryMemory.memory.indexOf(entityInArray)

        RepositoryMemory.memory.splice(index, 1)
        RepositoryMemory.memory.push(entity)

        return entity
    }

    public delete(entity: CashFlow): void {
        const entityInArray = RepositoryMemory.memory.find(({ id }) => id === entity.id)

        if(!entityInArray) {
            throw new EntityNotFound(entity.id!)
        }

        const index = RepositoryMemory.memory.indexOf(entityInArray)

        RepositoryMemory.memory.splice(index, 1)
    }
    
}