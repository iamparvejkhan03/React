import { Client, Databases, Storage, Query, ID} from 'appwrite';
import conf from "../conf/conf";

class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, userId, status}){
        try{
            return await this.databases.createDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
                title, slug, content, featuredImage, userId, status
            })
        }catch(error){
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
                title, content, featuredImage, status
            })
        }catch(error){
            throw error;
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug);
            return true;
        }catch(error){
            throw error;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug);
        }catch(error){
            throw error;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try{
            return await this.databases.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId, queries)
        }catch(error){
            throw error;
        }
    }

    async uploadFile(file){
        try{
            return await this.storage.createFile(conf.appWriteBucketId, ID.unique(), file);
        }catch(error){
            throw error;
        }
    }

    async deleteFile(fileId){
        try{
            await this.storage.deleteFile(conf.appWriteBucketId, fileId);
            return true;
        }catch(error){
            throw error;
        }
    }

    getFilePreview(fileId){
        try{
            return this.storage.getFileView(conf.appWriteBucketId, fileId);
        }catch(error){
            throw error;
        }
    }
}

const service = new Service();

export default service;