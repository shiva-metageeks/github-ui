import { ICommon } from "./ICommon"

export interface Dataset extends ICommon{
    modalities: string[]
    format: string[]
}