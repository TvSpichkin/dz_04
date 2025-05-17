import {BlogDbType, BlogDbPutType, blogFields, TypeBlogFields} from "../db/types/blogsDbTypes";
import {ProtoFilterType} from "../db/types/typesRepDB";
import {repBD} from "../db/repository/repDB";
import {BlogInputModel, BlogViewModel} from "../IOtypes/blogsTypes";
import {TypeSNT, TypeSortDir} from "../IOtypes/queryTypes";
import {Paginator, paginator} from "./paginator";


const entKey = "blogs";

export const blogsServ = {
    async getAll(searchNameTerm: TypeSNT, sortBy: TypeBlogFields, sortDirection: TypeSortDir, page: number, pageSize: number): Promise<Paginator<BlogViewModel>> {
        const elemsSkip = pageSize*(page - 1), // Количество пропущенных элементов
        searchNameFilt: ProtoFilterType[] = searchNameTerm ? // Данные поискового термина для генерации фильтра
        [{key: blogFields.name, value: searchNameTerm, way: 1}] : [],
        [totalCount, blogs] = await repBD.readAll(entKey, elemsSkip, pageSize, sortBy, sortDirection, searchNameFilt) as [number, BlogDbType[]]; // Cетевые журналы и их количество
        
        return paginator(page, pageSize, totalCount, await Promise.all(blogs.map(this.maper))) as Paginator<BlogViewModel>; // Нумерация страниц
    }, // Извлечение всех сетевых журналов
    async find(id: string): Promise<BlogDbType | null> {
        return repBD.read(entKey, +id) as Promise<BlogDbType | null>;
    }, // Извлечение сетевого журнала по идентификатору
    async findAndMap(id: string): Promise<BlogViewModel> {
        const blog: BlogDbType = (await this.find(id))!; //! Этот метод используется после проверки существования
        return this.maper(blog);
    }, // Извлечение и конвертация сетевого журнала
    async create(blog: BlogInputModel): Promise<BlogViewModel> {
        const newBlog: BlogDbType = {
            id: 0,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().getTime(),
            isMembership: false
        };
        
        newBlog.id = (await repBD.write(entKey, newBlog));

        return this.maper(newBlog);
    }, // Запись сетевого журнала в БД
    async del(id: string) {
        await repBD.remove(entKey, "id", +id);
        await repBD.remove("posts", "blogId", +id);
    }, // Удаление сетевого журнала и всех его записей в БД
    async put(blog: BlogInputModel, id: string) {
        const putBlog: BlogDbPutType = {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        };
        await repBD.edit(entKey, putBlog, +id);
    }, // Изменение сетевого журнала в БД
    async maper(blog: BlogDbType): Promise<BlogViewModel> {
        const blogForOutput: BlogViewModel = {
            id: String(blog.id),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date(blog.createdAt).toISOString(),
            isMembership: blog.isMembership
        };

        return blogForOutput;
    } // Конвертация сетевых журналов из БД в модельный вид
}; // Работа с базой данных
