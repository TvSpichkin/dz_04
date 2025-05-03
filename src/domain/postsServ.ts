import {PostDbType, PostDbPutType, postFields, TypePostFields} from "../db/types/postsDbTypes";
import {ProtoFilterType} from "../db/types/typesRepDB";
import {repBD} from "../db/repository/repDB";
import {PostInputModel, PostViewModel} from "../IOtypes/postsTypes";
import {TypeSortDir} from "../IOtypes/queryTypes";
import {Paginator, paginator} from "./paginator";
import {BlogDbType} from "../db/types/blogsDbTypes";

const entKey = "posts";

export const postsServ = {
    async getAll(sortBy: TypePostFields, sortDirection: TypeSortDir, page: number, pageSize: number, blogId: number): Promise<Paginator<PostViewModel>> {
        const elemsSkip = pageSize*(page - 1), // Количество пропущенных элементов
        blogIdFilt: ProtoFilterType[] = blogId ? // Идентификатор сетевого журнала для генерации фильтра
        [{key: postFields.blogId, value: blogId, way: 0}] : [],
        [totalCount, posts] = await repBD.readAll(entKey, elemsSkip, pageSize, sortBy, sortDirection, blogIdFilt) as [number, PostDbType[]];
        
        return paginator(page, pageSize, totalCount, await Promise.all(posts.map(this.maper))) as Paginator<PostViewModel>; // Нумерация страниц
    }, // Извлечение всех записей
    async find(id: string): Promise<PostDbType | null> {
        return repBD.read(entKey, +id) as Promise<PostDbType | null>;
    }, // Извлечение записи по идентификатору
    async findAndMap(id: string): Promise<PostViewModel> {
        const post = (await this.find(id))!; //! Этот метод используется после проверки существования
        return this.maper(post);
    }, // Извлечение и конвертация записи
    async create(post: PostInputModel): Promise<PostViewModel> {
        const newPost: PostDbType = {
            id: 0,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: +post.blogId,
            createdAt: new Date().getTime()
        };
        
        newPost.id = await repBD.write(entKey, newPost);
        
        return this.maper(newPost);
    }, // Запись записи в БД
    async del(id: string) {
        await repBD.remove(entKey, "id", +id);
    }, // Удаление записи в БД
    async put(post: PostInputModel, id: string) {
        const putPost: PostDbPutType = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: +post.blogId
        };
        await repBD.edit(entKey, putPost, +id);
    }, // Изменение записи в БД
    async maper(post: PostDbType): Promise<PostViewModel> {
        const postForOutput: PostViewModel = {
            id: String(post.id),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: String(post.blogId),
            blogName: (await repBD.read("blogs", post.blogId) as BlogDbType).name, //! Этот метод используется после проверки существования
            createdAt: new Date(post.createdAt).toISOString()
        };
        
        return postForOutput;
    } // Конвертация записей из БД в модельный вид
}; // Работа с базой данных
