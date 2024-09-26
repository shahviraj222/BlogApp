//this is the authentication file for the using appwrite here two things are main Client and Account 
//all the process are given by appwrite on the account for creating, sign , signout etc 
//doc of appwirte https://appwrite.io/docs/products/auth/accounts

import config from "../config/config";                  //this is the config file contain some credential 
import { Client, Account, ID } from "appwrite";



export class AuthService {
    //client is nothing but veryfying we are going in which account..
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async creatAccount(email, password, name) {
        //this try catch only give error if the we are not able to connect or run the methode (network issue , appwrite issue)

        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            console.log("Inside the createAccount")
            if (userAccount) {
                //calling login methode if account is successfully created
                // return this.login(email, password); Because database updatation  take some time...
                return userAccount
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("appwrite >> login >> error:", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();

        } catch (error) {
            console.log("appwrite >> getCurrentUser >> error:", error)
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite >> logout >> error:", error)
        }
    }

}
const authService = new AuthService();

export default authService;

