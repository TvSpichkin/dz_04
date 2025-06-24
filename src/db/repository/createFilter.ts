import {Document, Filter, Sort} from "mongodb";
import {EntDbType, KeysDB, ProtoFilterType, TypeEntFields} from "../types/typesRepDB";
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

export function createSorter(sb: TypeEntFields, sd: TypeSortDir): Sort {
    const d: 1 | -1 = dirSort(sd), s = {[sb]: d};
    
    if(sb != "createdAt") s.createdAt = d; // Добавление второго сортировочного поля по дате создания
    
    return s;
} // Генерация сортировщика

export function createAggregater(ek: KeysDB, pf: ProtoFilterType[]) {
    const a: Document[] = [];
    
    if(ek == "posts") a.push({$lookup: {
        from: 'blogs',
        localField: 'blogId',
        foreignField: 'id',
        as: 'blogName'
    }}, {$unwind: '$blogName'}, {$set: {blogName: "$blogName.name"}});
    a.push({$match: createFilter(pf)});
    
    return a;
} // Генерация агрегата
