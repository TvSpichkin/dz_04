import {Filter} from "mongodb";
import {EntDbType, ProtoFilterType, TypeEntFields} from "../types/typesRepDB";
import {TypeSortDir} from "../../IOtypes/queryTypes";


function valueAssigner(w: ProtoFilterType["way"], v: ProtoFilterType["value"]) {
    switch(w) {
        case 1:
            return {$regex: v, $options: "i"};
        default:
            return v;
    }
} // Присваивание значений

function dirSort(d: TypeSortDir): 1 | -1 {
    return d[3] ? -1 : 1;
} // Задание направления сортировки для БД


export function createFilter(pf: ProtoFilterType[]): Filter<EntDbType> {
    const f: Filter<EntDbType> = {};
    
    for(let i = 0; i < pf.length; i++) {
        f[pf[i].key] = valueAssigner(pf[i].way, pf[i].value); // Заполнение фильтра
    }

    return f;
} // Генерация фильтра

export function createSorter(sb: TypeEntFields, sd: TypeSortDir) {
    const d: 1 | -1 = dirSort(sd), s = {[sb]: d};

    if(sb != "createdAt") s.createdAt = d; // Добавление второго сортировочного поля по дате создания

    return s;
} // Генерация сортировщика
