import { fakePostsApiClient } from "./apiClient";


const getAllPosts= async ()=>{
    try {
        const response=await fakePostsApiClient.get("/");
        if(response.status !== 200) {
            throw new Error("Failed to fetch posts");
        }
        const posts=response.data;
        return posts;
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch posts");
        
    }
}

 const createPost = async (id:number,userId:number,title:string,body:string)=>{
    try {
        const response= await fakePostsApiClient.post('/',{
            id,userId,title,body
        })
        if(response.status !== 201) {
            throw new Error("Failed to create post");
        }

        const post=response.data;
        return post;
        
    } catch (error) {
          console.log(error);
        throw new Error("Failed to create posts");
    }
}


const getPostById= async(id:number)=>{
    try {
        const response= await fakePostsApiClient.get(`/${id}`);
        if(response.status !== 200) {
            throw new Error("Failed to fetch post by ID");
        }

        const post=response.data;
        return post;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch post by ID");
        
    }
}

const editPost= async(id:number,title:string,body:string)=>{
    try {
        const post=await getPostById(id);
        if(!post) {
            throw new Error("Post not found");
        }
        const response= await fakePostsApiClient.put(`/${id}`,{
            ...post,
            title,
            body
        });
        const updatedPost=response.data;
        return updatedPost;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to edit post");
    }
}

const deletePost = async(id:number)=>{
    try {
        await fakePostsApiClient.delete(`/${id}`);
        return { message: "Post deleted successfully" };
    } catch (error) {
         console.log(error);
        throw new Error("Failed to delete post");
    }
}

export default {
    getAllPosts,
    createPost,
    deletePost,
    getPostById,
    editPost
}

