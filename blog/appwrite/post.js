import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class AppwritePostService{
    client;
    database;

    constructor(){
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
    }

    addPost = async ({title, slug, content, status}, userId, fileId) => {
        return await this.database.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
            title: title,
            slug: slug,
            content: content,
            featuredImage: fileId,
            status: status,
            userId: userId
        })
    }

    getPost = async (slug, query=[Query.equal('status', 'active')]) => {
        return await this.database.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
    }

    deletePost = async (id) => {
        try{
            const deleted = await this.database.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, id);

            if(deleted){
                return true;
            }
        }catch(error){
            throw error;
        }
    }

    updatePost = async ({title, slug, content, featuredImage, status}, id) => {
        try{
            return await this.database.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, id, {
                title: title,
                slug: slug,
                content: content,
                featuredImage: featuredImage,
                status: status
            })
        }catch(error){
            throw error;
        }
    }

    getAllPosts = async (query=[Query.equal("status", "active")]) => {
        try{
            return await this.database.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, query);
        }catch(error){
            throw error;
        }
    }

}

const appwritePostService = new AppwritePostService();

export default appwritePostService;