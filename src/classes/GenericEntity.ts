import { IGenericEntity } from "@/interfaces";
import { TDate } from "@/types";

export abstract class GenericEntity<T extends IGenericEntity> implements IGenericEntity {
    protected _created_at?: TDate
    protected _updated_at?: TDate

    public abstract validate(): void

    public toJson() {
        const entries = Object.entries(this) as [string, string|number][]

        const copy: {[x in keyof T]?: string|number} = {}

        entries.forEach(([key, value]) => {
            const index = key.slice(1) as keyof T
            copy[index] = value
        })

        return copy
    }

    public get created_at(): TDate|undefined {
        return this._created_at
    }

    public set created_at(value: TDate) {
        this._created_at = value
    }

    public get updated_at(): TDate|undefined {
        return this._updated_at
    }

    public set updated_at(value: TDate) {
        this._updated_at = value
    }
    
}