import { z } from "zod"
import { TDate } from "@/types";
import { ICashFlowMethods, ICashFlowProps } from "@/interfaces";
import { TType } from "./Type";
import { GenericEntity } from "../GenericEntity";

export class CashFlow extends GenericEntity<ICashFlowProps> implements ICashFlowProps, ICashFlowMethods {
    private _id?: number
    private _description?: string
    private _type?: TType
    private _value?: number
    private _date?: TDate

    public static validate(JSON: ICashFlowProps) {
        const schema = z.object({
            description: z.string().trim(),
            type: z.enum([TType.EXPENSES, TType.REVENUE]),
            value: z.number().min(0),
            date: z.string().regex(/\d{4}(-\d{2}){2} \d{2}(:\d{2}){2}/, "Data precisa ser no formato Y-M-d H:i:s")
        })

        return schema.parse(JSON)
    }

    public createFromJSON(JSON: ICashFlowProps): void {
        this.id = JSON.id
        this.description = JSON.description
        this.type = JSON.type
        this.value = JSON.value
        this.date = JSON.date
        this.created_at = JSON.created_at
        this.updated_at = JSON.updated_at
    }

    public updateFromJSON(JSON: ICashFlowProps): void {
        this.description = JSON.description
        this.type = JSON.type
        this.value = JSON.value
        this.date = JSON.date
    }

    public get id() {
        return this._id
    }

    public set id(value) {
        if (value)
            this._id = value
    }

    public get description() {
        return this._description
    }

    public set description(value) {
        if (value)
            this._description = value
    }

    public get type() {
        return this._type
    }

    public set type(value) {
        if (value)
            this._type = value
    }

    public get value() {
        return this._value
    }

    public set value(value) {
        if (value)
            this._value = value
    }

    public get date() {
        return this._date
    }

    public set date(value) {
        if (!value)
            return

        const schemaDate = z.string().regex(/\d{4}(-\d{2}){2} \d{2}(:\d{2}){2}/, "Data precisa ser no formato Y-M-d H:i:s")

        schemaDate.parse(value)

        this._date = value
    }

}