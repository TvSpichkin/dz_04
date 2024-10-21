import {fromUTF8ToBase64} from "../../src/globalMiddlewares/adminMiddleware";
import {SET} from "../../src/settings";
import {BlogInputModel} from "../../src/IOtypes/blogsTypes";
import {PostInputModel} from "../../src/IOtypes/postsTypes";
import {DBType} from "../../src/db/types/typesRepDB";
import {BlogDbType} from "../../src/db/types/blogsDbTypes";
import {PostDbType} from "../../src/db/types/postsDbTypes";


export const auth = {"Authorization": "Basic " + fromUTF8ToBase64(SET.ADMIN)}; // Получение base64 строки авторизации

export const corrBlog1 = createBlog("Василий", "Тёркин", "https://_vas-i1.t_9r/k_/-i/4/"),
    corrBlog2 = createBlog("Максим", "Так так так", "https://maksima.dva/teski"),
    corrBlog3 = createBlog(bigStr(15), bigStr(500), "https://te.st"), // Правильные входные сетевые журналы
    corrPost1 = createPost("Название 1 записи", "Краткое описание 1 записи", "Содержание 1 записи", "1"),
    corrPost2 = createPost("Название 2 записи", "Краткое описание 2 записи", "Содержание 2 записи", "1"),
    corrPost3 = createPost(bigStr(30), bigStr(100), bigStr(1000), "2"); // Правильные входные записи

function createBlog(n: string, d: string, w: string): BlogInputModel {
    return {
        name: n, // Имя; максимальная длина: 15
        description: d, // Описание; максимальная длина: 500
        websiteUrl: w // ЕУР сетевого узла; максимальная длина: 100, шаблон: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
    };
} // Создание входного сетевого журнала

function createPost(t: string, s: string, c: string, b: string): PostInputModel {
    return {
        title: t, // Название; максимальная длина: 30
        shortDescription: s, // Краткое описание; максимальная длина: 100
        content: c, // Содержание; максимальная длина: 1000
        blogId: b // Идентификатор существующего сетевого журнала
    };
} // Создание входной записи

export function bigStr(n: number): string {
    var t: string = "";
    
    for(let i = 0; i < n; i++) t += String.fromCharCode(33 + (i < 94 ? i : i + 33));

    return t;
} // Создание строки с длиной n из символов юникода

function createBlogBD(i: number): BlogDbType {
    return {
        id: i, // Идентификатор
        name: "Имя " + i, // Имя; максимальная длина: 15
        description: "Описание " + i, // Описание; максимальная длина: 500
        websiteUrl: "https://web.site/URL/" + i, // ЕУМР сетевого узла; максимальная длина: 100, шаблон: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
        createdAt: new Date().getTime() + i - 1, // Дата создания
        isMembership: false // Подписка на членство в сетевом журнале
    };
} // Создание сетевого журнала для БД

function createPostBD(i: number, b: number): PostDbType {
    return {
        id: i, // Идентификатор
        title: "Название " + i, // Название; максимальная длина: 30
        shortDescription: "Краткое описание " + i, // Краткое описание; максимальная длина: 100
        content: "Содержание " + i, // Содержание; максимальная длина: 1000
        blogId: (i - 1)%b + 1, // Идентификатор существующего сетевого журнала
        createdAt: new Date().getTime() + i - 1 // Дата создания
    };
} // Создание сетевого журнала для БД

export function createDataSet(b: number, p: number = 0): DBType {
    const dataset: DBType = {
        blogs: [], // Массив сетевых журналов
        posts: [] // Массив записей
    }; // Значения заполнения БД
    var i: number;
    
    for(i = 1; i <= b; i++) dataset.blogs.push(createBlogBD(i));
    for(i = 1; i <= p; i++) dataset.posts.push(createPostBD(i, b));
    
    return dataset;
} // Создание набора данных
