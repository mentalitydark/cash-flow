export class EntityNotFound extends Error {

    public constructor(id: number) {
        super(`Não foi possível encontrar o registro ${id}`)
    }

}