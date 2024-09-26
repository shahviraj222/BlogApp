//here slug is my documentID
//https://appwrite.io/docs/references/cloud/client-web/databases#listDocuments
import config from "../config/config";                  //this is the config file contain some credential 
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        console.log(title, content, featuredImage, status, userId)
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,                          //document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }                             //data to pass
            )
        } catch (error) {
            console.log("appwrite >> createPost >> error:", error);
        }
    }

    async updatePost({ title, slug, content, featuredIamge, status, userId, documentId }) {
        console.log("Inside Update DocumentId:", documentId)
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    featuredIamge,
                    status,
                }
            )
        } catch (error) {
            console.log("appwrite >> Updatedocument >> error:", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("appwrite >> createPost >> error:", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )

        } catch (error) {
            console.log("appwrite >> getPost >> error:", error)
            return false
        }
    }

    //you are able to apply the query with elements those are listed in the indexies in appwrite database
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,   //changed databaseid
                config.appwriteCollectionId,
                queries
                //you can add the pagination that is in appwrite/document/advance/queries
            )
        } catch (error) {
            console.log("appwrite >> getPosts >> error:", error)
            return false
        }
    }

    //Files Functions

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite >> uploadFile >> error:", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("appwrite >> deleteFile >> error:", error)
            return false
        }
    }

    async getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service;