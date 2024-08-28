import {PostDbPutType, PostDbType} from "../../db/types/postsDbTypes";
import {repBD} from "../../db/repository/repDB";
import {PostInputModel, PostViewModel} from "../../IOtypes/postsTypes";

const entKey = "posts";

export const postsRep = {
    async getAll(): Promise<PostViewModel[]> {
        const posts: PostDbType[] = await repBD.readAll(entKey) as PostDbType[];

        return Promise.all(posts.map(this.maper));
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
            createdAt: new Date().toISOString()
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
            // @ts-ignore: что-то с несоответствием типов
            blogName: (await repBD.read("blogs", post.blogId))!.name, //! Этот метод используется после проверки существования
            createdAt: post.createdAt
        };

        return postForOutput;
    } // Конвертация записей из БД в модельный вид
}; // Работа с базой данных
