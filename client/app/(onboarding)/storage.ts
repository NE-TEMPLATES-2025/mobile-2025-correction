import * as SecureStore from "expo-secure-store";
import {jwtDecode} from "jwt-decode"


const key = "authToken";
const userKey = "authUser";

const storeToken= async(value:string)=>{
    try {
        if(typeof value !== "string"){
            console.error("Token must be a string but got:", typeof value);
            return;
        }
        
        await SecureStore.setItemAsync(key,value);
    } catch (error) {
        console.log("Error while storing token in the store",error)
    }
}


const getToken= async () : Promise<string | null>=>{
    try {
        
       return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.error("Error while getting the token");
    }
    return null;
}



const removeToken= async ()=>{
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log("Error while removing token",error);
        
    }
}

const getUser = async ()=>{
    try {
        
       return await SecureStore.getItemAsync(userKey);
    } catch (error) {
        console.error("Error while getting the user");
    }
    return null;
}

const storeUser = async (user: {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}) => {
  try {
    await SecureStore.setItemAsync(userKey, JSON.stringify(user));
  } catch (error) {
    console.error("Error while storing user", error);
  }
};



export default {
    getToken,
    storeToken,
    getUser,
    removeToken,
    storeUser
}