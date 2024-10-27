import { IGenericEntityMethods, IGenericEntityProps } from "@/interfaces";
import { TDate } from "@/types";

export abstract class GenericEntity<T extends IGenericEntityProps> implements IGenericEntityProps, IGenericEntityMethods<T> {
    protected _created_at?: TDate
    protected _updated_at?: TDate

    public toJSON(): {[Property in keyof T]?: T[Property]} {
        const entries = Object.entries(this) as Array<[string, string|number]>

        const copy = {} as any

        entries.forEach(([key, value]) => {
            const index = key.slice(1)

            copy[index] = value
        })

        return copy
    }

    public abstract createFromJSON(JSON: T): void
    public abstract updateFromJSON(JSON: T): void

    public get created_at(): TDate|undefined {
        return this._created_at
    }

    public set created_at(value: TDate|undefined) {
        if (value)
            this._created_at = value
    }

    public get updated_at(): TDate|undefined {
        return this._updated_at
    }

    public set updated_at(value: TDate|undefined) {
        if (value)
            this._updated_at = value
    }
    
}