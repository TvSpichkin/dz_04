import {Filter} from "mongodb";
import {EntDbType, ProtoFilterType} from "../types/typesRepDB";


function valueAssigner(w: ProtoFilterType["way"], v: ProtoFilterType["value"]) {
    switch(w) {
        case 1:
            return {$regex: v};
        default:
            return v;
    }
} // Присваивание значений

export function createFilter(pf: ProtoFilterType[]): Filter<EntDbType> {
    const f: Filter<EntDbType> = {};
    
    for(let i = 0; i < pf.length; i++) {
        f[pf[i].key] = valueAssigner(pf[i].way, pf[i].value); // Заполнение фильтра
    }
    
    return f;
} // Генерация фильтра
