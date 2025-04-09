import { Client, Account, ID} from 'appwrite';
import conf from "../conf/conf";

class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
    }

    async register({email, password, name}){
        try{
            const registration = await this.account.create(ID.unique(), email, password, name);
            if(registration){
                return this.login({email, password});
            }
        }catch(error){
            throw error; 
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            throw error;
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;