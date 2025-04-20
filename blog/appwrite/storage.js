import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class AppwriteStorageService{
    client;
    storage;

    constructor(){
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.storage = new Storage(this.client);
    }

    uploadFile = async (image) => {
        const fileId = ID.unique();
        const fileUpload = await this.storage.createFile(conf.appwriteBucketId, fileId, image);
        if(fileUpload){
            return fileId;
        }
    }

    getFilePreview = (fileId) => {
        try{
            const view = this.storage.getFileView(conf.appwriteBucketId, fileId);
            if(view){
                return view;
            }
        }catch(error){
            throw error;
        }
    }

    getFile = async (fileId) => {
        try{
            const file = await this.storage.getFile(conf.appwriteBucketId, fileId);
            if(file){
                return true;
            }
        }catch(error){
            return false;
        }
    }

    deleteFile = async (fileId) => {
        try{
            const deleted = await this.storage.deleteFile(conf.appwriteBucketId, fileId);
            if(deleted){
                return deleted;
            }
        }catch(error){
            throw error;
        }
    }

    uploadProfilePic = async (fileId, image) => {
        try{
            const picUploaded = await this.storage.createFile(conf.appwriteBucketId, fileId, image);
            if(picUploaded){
                return true;
            }
        }catch(error){
            throw error;
        }
    }
}

const appwriteStorageService = new AppwriteStorageService();
export default appwriteStorageService;