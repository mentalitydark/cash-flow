import { TType } from "@/classes/CashFlow/Type"
import { IGenericEntityMethods, IGenericEntityProps } from "@/interfaces"
import { TDate } from "@/types"

export interface ICashFlowMethods extends IGenericEntityMethods<ICashFlowProps> {}

export interface ICashFlowProps extends IGenericEntityProps {
    id?: number
    description?: string
    type?: TType
    value?: number
    date?: TDate
}