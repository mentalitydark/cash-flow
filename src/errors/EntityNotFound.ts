export class EntityNotFound extends Error {

    public constructor(id: number) {
        super(`Entity with id ${id} not fround`)
    }

}