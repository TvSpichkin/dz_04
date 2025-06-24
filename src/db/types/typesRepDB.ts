import {ValueOf} from "../../methodsForTS";
import {BlogDbPutType, BlogDbType, BlogDbTypeA, blogFields} from "./blogsDbTypes";
import {PostDbPutType, PostDbType, PostDbTypeA, postFields} from "./postsDbTypes";


export const EntFields = {
    ...blogFields, // Возможные поля для сетевого журнала
    ...postFields // Возможные поля для записи
}; // Возможные поля сущности в БД
export type TypeEntFields = keyof typeof EntFields;

export type DBType = {
    blogs: BlogDbType[], // Массив сетевых журналов
    posts: PostDbType[] // Массив записей
}; // Типизация базы данных (что мы будем в ней хранить)
export type ProtoFilterType = {
    key: TypeEntFields, // Поле сущности в БД
    value: boolean | number | string, // Значение этого поля
    way: number // Способ задания условия для фильтра
}; // Типизация исходных данных для генерации фильтра

export type KeysDB = keyof DBType; // Ключи БД
export type ValsDB = ValueOf<DBType>; // Значения БД
export type EntDbType = BlogDbType | PostDbType; // Тип сущности в БД
export type EntDbTypeA = BlogDbTypeA | PostDbTypeA; // Тип сущности при извлечении из БД агрегацией
export type DbTypeFind = EntDbType | null; // Тип извлечённой сущности по идентификатору из БД
export type keyIds = "id" | "blogId"; // Ключи идентификаторов от сущностей
export type EntPutType = BlogDbPutType | PostDbPutType; // Тип изменения сущности в БД
