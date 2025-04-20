import { Client, Account, ID} from 'appwrite';
import conf from '../conf/conf';

class appwriteAuthService{
    client;
    account;

    constructor(){
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        
    }

    register = async ({email, password, name, phone}) => {
        try{
            const create = await this.account.create(ID.unique(), email, password, name, phone);
            console.log(create);
            if(create){
                return this.login({email, password});
            }
        }catch(error){
            throw error;
        }
    }

    login = async ({email, password}) => {
        try{
            const loginData = await this.account.createEmailPasswordSession(email, password);
            return {success: true, loginData};
        }catch(error){
            return {success: false, loginData:error.message};
        }
    }

    logout = async () => {
        try{
            const deleteSessions = await this.account.deleteSessions();
            if(deleteSessions){
                return true;
            }
        }catch(error){
            throw error;
        }
    }

    getCurrentUser = async() => {
        return await this.account.get();
    }

    updateProfile = async ({name, email, phone, password}) => {
        try{
            const nameUpdated = await this.account.updateName(name);
            const emailUpdated = await this.account.updateEmail(email, password);
            const phoneUpdated = await this.account.updatePhone(phone, password);

            if(nameUpdated && emailUpdated && phoneUpdated){
                return {success: true};
            }
        }catch(error){
            return {success: false, message: error.message};
        }
    }
}

const appwrite_auth_service = new appwriteAuthService();

export default appwrite_auth_service;