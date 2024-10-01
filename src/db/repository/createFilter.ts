import {Filter} from "mongodb";
import {EntDbType, ProtoFilterType} from "../types/typesRepDB";


export function createFilter(pf: ProtoFilterType[]): Filter<EntDbType> {
    const f: Filter<EntDbType> = {};
    
    for(let i = 0; i < pf.length; i++) {
        f[pf[i].key] = pf[i].value;
    }
    
    return f;
}
