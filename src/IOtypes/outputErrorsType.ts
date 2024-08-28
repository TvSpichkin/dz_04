import {BlogInputModel} from "./blogsTypes";


export type FieldNamesType = keyof BlogInputModel; // Поля входной модели сетевого журнала
export type FieldError = {
    message: string, // Сообщение с объяснением ошибки для определенного поля
    field: string // В каком поле/свойстве входной модели имеется ошибка
}; // Поля ошибки ввода данных
export type APIErrorResult = {
    errorsMessages: FieldError[]
}; // Тип отправляемых ошибок ввода данных
