const config = {
    // Corrected environment variable mappings
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL), // Corrected typo
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID), // Mapped to the correct variable
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
};

export default config;
