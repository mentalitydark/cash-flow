import { TDate } from "@/types"

export interface IGenericEntityMethods<T extends IGenericEntityProps> {
    toJSON(): {[Property in keyof T]?: T[Property]}
    createFromJSON(JSON: T): void
    updateFromJSON(JSON: T): void
}

export interface IGenericEntityProps {
    created_at?: TDate
    updated_at?: TDate
}