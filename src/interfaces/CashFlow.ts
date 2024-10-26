import { TType } from "@/classes/CashFlow/Type"
import { IGenericEntity } from "@/interfaces"
import { TDate } from "@/types"

export interface ICashFlow extends IGenericEntity {
    id?: number
    description?: string
    type?: TType
    value?: number
    date?: TDate
}