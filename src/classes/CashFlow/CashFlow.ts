import { z } from "zod"
import { TDate } from "@/types";
import { ICashFlow } from "@/interfaces/CashFlow";
import { TType } from "./Type";
import { GenericEntity } from "../GenericEntity";

export class CashFlow extends GenericEntity<ICashFlow> implements ICashFlow {
    private _id?: number
    private _description?: string
    private _type?: TType
    private _value?: number
    private _date?: TDate

    public validate(): void {
        const schema = z.object({
            description: z.string().trim(),
            type: z.enum([TType.EXPENSES, TType.REVENUE]),
            value: z.number().min(0),
            date: z.number()
        })

        schema.parse(this.toJson())
    }

    public static createFromJson(json: ICashFlow): CashFlow {
        const entity = new CashFlow

        entity.description = json.description
        entity.type = json.type
        entity.value = json.value
        entity.date = json.date

        return entity
    }

    public updateFromJson(json: ICashFlow): void {
        this.description = json.description
        this.type = json.type
        this.value = json.value
        this.date = json.date
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

        if (typeof value === "number") {
            this._date = value
            return
        }

        const [date, time] = value.split(" ")
        const schemaDate = z.string().date("Data precisa ser no formato Y-M-d H:i:s")
        const schemaTime = z.string().time("Data precisa ser no formato Y-M-d H:i:s")

        schemaDate.parse(date)
        schemaTime.parse(time)

        this._date = new Date(value).getTime()
    }

}