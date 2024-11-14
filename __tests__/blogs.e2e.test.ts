import {req, getBlog, pageData, queryBlog} from "./helpers/test-helpers";
import {setDB} from "../src/db/repository/repDB";
import {SET} from "../src/settings";
import {auth, bigStr, corrBlog1, corrBlog2, corrBlog3, createDataSet} from "./helpers/datasets";
import {BlogViewModel} from "../src/IOtypes/blogsTypes";
import {runDB, stopDB} from "../src/db/db";
import {blogsServ} from "../src/domain/blogsServ";


describe("/blogs", () => {
    var blog1: BlogViewModel, blog2: BlogViewModel;
    
    beforeAll(async () => {
        await runDB(); // Подключение к БД
        await setDB(); // Очистка базы данных перед началом тестирования
    });
    afterAll(async () => {
        await stopDB(); // Отключение от БД
    });
    
    it("должен вернуть 200 и пустой массив", async () => {
        await getBlog.expect(200, pageData());
    });

    it("должен вернуть 404 для несуществующего сетевого журнала", async () => {
        await req.get(SET.PATH.BLOGS + "/-1").expect(404);
    });

    it("не должен создать сетевой журнал без авторизации и должен вернуть 401", async () => {
        await req.post(SET.PATH.BLOGS).send(corrBlog1).expect(401);
        await req.post(SET.PATH.BLOGS).set({"Auth": "Basic cisaB"}).send(corrBlog1).expect(401);
        await req.post(SET.PATH.BLOGS).set({"Authorization": "Vazic cisaB"}).send(corrBlog1).expect(401);
        await req.post(SET.PATH.BLOGS).set({"Authorization": "Basic cisaB"}).send(corrBlog1).expect(401);
        await getBlog.expect(200, pageData());
    });

    it("не должен создать сетевой журнал c неправильными входными данными", async () => {
        const blog = corrBlog1;

        await req.post(SET.PATH.BLOGS).set(auth).expect(400);
        await getBlog.expect(200, pageData());

        await req.post(SET.PATH.BLOGS).set(auth).send().expect(400);
        await getBlog.expect(200, pageData());

        await req.post(SET.PATH.BLOGS).set(auth).send({название: 0}).expect(400);
        await getBlog.expect(200, pageData());

        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, name: undefined}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, name: 0}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, name: bigStr(16)}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, name: "    "}).expect(400);
        await getBlog.expect(200, pageData());

        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, description: undefined}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, description: 0}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, description: bigStr(501)}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, description: "    "}).expect(400);
        await getBlog.expect(200, pageData());

        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, websiteUrl: undefined}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, websiteUrl: 0}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, websiteUrl: bigStr(101)}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, websiteUrl: "    "}).expect(400); 
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, websiteUrl: bigStr(10)}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, websiteUrl: "http://vasi1.ter/k/i/4/"}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, websiteUrl: "https:/vasi1.ter/k/i/4/"}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, websiteUrl: "https://vasi1ter/k/i/4/"}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, websiteUrl: "https://.ter/k/i/4/"}).expect(400);
        await req.post(SET.PATH.BLOGS).set(auth).send({...blog, websiteUrl: "https://vasi1./k/i/4/"}).expect(400);
        await getBlog.expect(200, pageData());
    });

    it("должен создать сетевой журнал c правильными входными данными", async () => {
        blog1 = (await req.post(SET.PATH.BLOGS).set(auth).send(corrBlog1).expect(201)).body;
        expect(corrBlog1).toEqual({
            name: blog1.name,
            description: blog1.description,
            websiteUrl: blog1.websiteUrl
        });
        expect(blog1.id).toBe("1");
        expect(new Date(blog1.createdAt).getTime()).not.toBeNaN();
        expect(blog1.isMembership).toBe(false);

        blog2 = (await req.post(SET.PATH.BLOGS).set(auth).send(corrBlog2).expect(201)).body;
        expect(corrBlog2).toEqual({
            name: blog2.name,
            description: blog2.description,
            websiteUrl: blog2.websiteUrl
        });
        expect(blog2.id).toBe("2");
        expect(new Date(blog2.createdAt).getTime()).not.toBeNaN();
        expect(blog2.isMembership).toBe(false);

        await getBlog.expect(200, pageData([blog1, blog2]));
    });

    it("должен вернуть 200 и созданные сетевые журналы", async () => {
        await req.get(SET.PATH.BLOGS + "/1").expect(200, blog1);
        await req.get(SET.PATH.BLOGS + "/2").expect(200, blog2);
    });

    it("не должен обновить сетевой журнал без авторизации и должен вернуть 401", async () => {
        await req.put(SET.PATH.BLOGS + "/1").send(corrBlog2).expect(401);
        await req.put(SET.PATH.BLOGS + "/1").set({"Auth": "Basic cisaB"}).send(corrBlog2).expect(401);
        await req.put(SET.PATH.BLOGS + "/1").set({"Authorization": "Vazic cisaB"}).send(corrBlog2).expect(401);
        await req.put(SET.PATH.BLOGS + "/1").set({"Authorization": "Basic cisaB"}).send(corrBlog2).expect(401);
        await req.get(SET.PATH.BLOGS + "/1").expect(200, blog1);
    });

    it("не должен обновить сетевые журналы c неправильными входными данными", async () => {
        const blog = corrBlog2;

        await req.put(SET.PATH.BLOGS + "/1").set(auth).expect(400);
        await req.get(SET.PATH.BLOGS + "/1").expect(200, blog1);

        await req.put(SET.PATH.BLOGS + "/1").set(auth).send().expect(400);
        await req.get(SET.PATH.BLOGS + "/1").expect(200, blog1);

        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({название: 0}).expect(400);
        await req.get(SET.PATH.BLOGS + "/1").expect(200, blog1);

        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, name: undefined}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, name: 0}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, name: bigStr(16)}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, name: "    "}).expect(400);
        await req.get(SET.PATH.BLOGS + "/1").expect(200, blog1);

        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, description: undefined}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, description: 0}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, description: bigStr(501)}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, description: "    "}).expect(400);
        await req.get(SET.PATH.BLOGS + "/1").expect(200, blog1);

        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, websiteUrl: undefined}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, websiteUrl: 0}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, websiteUrl: bigStr(101)}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, websiteUrl: "    "}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, websiteUrl: bigStr(10)}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, websiteUrl: "http://vasi1.ter/k/i/4/"}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, websiteUrl: "https:/vasi1.ter/k/i/4/"}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, websiteUrl: "https://vasi1ter/k/i/4/"}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, websiteUrl: "https://.ter/k/i/4/"}).expect(400);
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send({...blog, websiteUrl: "https://vasi1./k/i/4/"}).expect(400);
        await req.get(SET.PATH.BLOGS + "/1").expect(200, blog1);
    });

    it("не должен обновить несуществующий сетевой журнал", async () => {
        await req.put(SET.PATH.BLOGS + "/-1").set(auth).send(corrBlog2).expect(404);
    });

    it("должен обновить сетевой журнал c правильными входными данными", async () => {
        const blog = corrBlog3;
        blog1 = {...blog1, ...blog};
        await req.put(SET.PATH.BLOGS + "/1").set(auth).send(blog).expect(204);
        await req.get(SET.PATH.BLOGS + "/1").expect(200, blog1);
        await req.get(SET.PATH.BLOGS + "/2").expect(200, blog2);
    });

    it("не должен удалить сетевой журнал без авторизации и должен вернуть 401", async () => {
        await req.delete(SET.PATH.BLOGS + "/1").expect(401);
        await req.delete(SET.PATH.BLOGS + "/1").set({"Auth": "Basic cisaB"}).expect(401);
        await req.delete(SET.PATH.BLOGS + "/1").set({"Authorization": "Vazic cisaB"}).expect(401);
        await req.delete(SET.PATH.BLOGS + "/1").set({"Authorization": "Basic cisaB"}).expect(401);
        await req.get(SET.PATH.BLOGS + "/1").expect(200, blog1);
    });

    it("не должен удалить несуществующий сетевой журнал", async () => {
        await req.delete(SET.PATH.BLOGS + "/-1").set(auth).expect(404);
    });

    it("должен удалить существующий сетевой журнал", async () => {
        await req.delete(SET.PATH.BLOGS + "/1").set(auth).expect(204);
        await req.delete(SET.PATH.BLOGS + "/2").set(auth).expect(204);

        await getBlog.expect(200, pageData());
    });

    it("должен вернуть 200 и нужный набор сетевых журналов по запросу", async () => {
        const totalCount = 100, // Количество сетевых журналов в тестовом наборе
        DBmem = createDataSet(totalCount), // Создание тестового набора
        memBlogs = await Promise.all(DBmem.blogs.map(blogsServ.maper).reverse()); // Выходные сетевые журналы из тестового набора
        var tempBlogs = memBlogs.slice(0, 10); // Временные сетевые журналы для сравнения
        //console.log(memBlogs.filter(x => /0/.test(x.name)));
        await setDB(DBmem); // Заполнение базы данных

        await getBlog.expect(200, pageData(tempBlogs, 1, 10, totalCount));
        await queryBlog().expect(200, pageData(tempBlogs, 1, 10, totalCount));
        tempBlogs = memBlogs.filter(x => /0/.test(x.name));
        await queryBlog("searchNameTerm=0").expect(200, pageData(tempBlogs.slice(0, 10), 1, 10, tempBlogs.length));
        tempBlogs = [...memBlogs].reverse().slice(0, 10);
        await queryBlog("sortBy=id&sortDirection=asc").expect(200, pageData(tempBlogs, 1, 10, totalCount));
        tempBlogs = memBlogs.slice(10, 20);
        await queryBlog("pageNumber=2").expect(200, pageData(tempBlogs, 2, 10, totalCount));
        tempBlogs = memBlogs.slice(0, 7);
        await queryBlog("pageSize=7").expect(200, pageData(tempBlogs, 1, 7, totalCount));
        tempBlogs = memBlogs.filter(x => /1/.test(x.name)).reverse();
        await queryBlog("searchNameTerm=1&sortBy=id&sortDirection=asc&pageNumber=3&pageSize=5")
        .expect(200, pageData(tempBlogs.slice(10, 15), 3, 5, tempBlogs.length));
    });
});
