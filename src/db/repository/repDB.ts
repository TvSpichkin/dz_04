import {db} from "../db";
import {DBType, ProtoFilterType, KeysDB, ValsDB, EntDbType, DbTypeFind, keyIds, EntPutType, TypeEntFields} from "../types/typesRepDB";
import {TypeSortDir} from "../../IOtypes/queryTypes";
import {createFilter, createSorter} from "./createFilter";


export const repBD = {
    async readAll(entKey: KeysDB, es: number, ps: number, sb: TypeEntFields, sd: TypeSortDir, snf: ProtoFilterType[]): Promise<[number, EntDbType[]]> {
        const filter = createFilter(snf), // Создание поискового фильтра
        sorter = createSorter(sb, sd); // Создание сортировщика
        
        return Promise.all([db.collection<EntDbType>(entKey).count(filter), // Извлечение количества элементов удовлетворяющих поисковому фильтру
            db.collection<EntDbType>(entKey).find(filter).sort(sorter).skip(es).limit(ps).toArray()]); // Извлечение нужной порции сущностей удовлетворяющих поисковому фильтру
    }, // Извлечение всех сущностей
    async read(entKey: KeysDB, id: number): Promise<DbTypeFind> {
        return db.collection<EntDbType>(entKey).findOne({id: id});
    }, // Извлечение сущности по идентификатору
    async write(entKey: KeysDB, entity: EntDbType): Promise<number> {
        const endId = await db.collection<EntDbType>(entKey).find({}).sort({$natural: -1}).limit(1).toArray();
        
        entity.id = endId.length ? endId[0].id + 1 : 1;
        await db.collection<EntDbType>(entKey).insertOne(entity);
        
        return entity.id;
    }, // Запись сущности в БД
    async remove(entKey: KeysDB, keyId: keyIds, id: number) {
        await db.collection<EntDbType>(entKey).deleteOne({[keyId]: id});
    }, // Удаление сущности в БД
    async edit(entKey: KeysDB, entity: EntPutType, id: number) {
        await db.collection<EntDbType>(entKey).updateOne({id: id}, {$set: entity});
    }, // Изменение сетевого журнала в БД
}; // Работа с базой данных

export async function setDB(dataset?: DBType) {
    await db.collection<EntDbType>("blogs").drop(); // Отчистка массива сетевых журналов
    await db.collection<EntDbType>("posts").drop(); // Отчистка массива записей
    // Если в функцию ничего не передано - то очищаем базу данных
    if(dataset) { // Если что-то передано - то заменяем старые значения новыми
        if(dataset.blogs.length) await db.collection<EntDbType>("blogs").insertMany(dataset.blogs);
        if(dataset.posts.length) await db.collection<EntDbType>("posts").insertMany(dataset.posts);
    }
} // Функция перезаписи БД
