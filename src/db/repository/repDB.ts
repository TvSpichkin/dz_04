import {db} from "../db";
import {DBType, KeysDB, ValsDB, EntDbType, DbTypeFind, keyIds, EntPutType} from "../types/typesRepDB";


export const repBD = {
    async readAll(entKey: KeysDB): Promise<EntDbType[]> {
        return db.collection<EntDbType>(entKey).find({}).toArray();
    }, // Извлечение всех сущностей
    async read(entKey: KeysDB, id: number): Promise<DbTypeFind> {
        return db.collection<EntDbType>(entKey).findOne({id: id});
    }, // Извлечение сущности по идентификатору
    async write(entKey: KeysDB, entity: EntDbType): Promise<number> {
        const endId = await db.collection<EntDbType>(entKey).find({id: 1}).sort({$natural: -1}).limit(1).toArray();
        
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
        await db.collection<EntDbType>("blogs").insertMany(dataset.blogs);
        await db.collection<EntDbType>("posts").insertMany(dataset.posts);
    }
} // Функция перезаписи БД
