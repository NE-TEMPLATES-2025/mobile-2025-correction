import { RefObject } from "react";
import { ButtonProps, TextInput, TextInputProps } from "react-native";


export interface CustomButtonProps extends ButtonProps {
    containerStyle?: string;
    iconRight?: any;
    textStyle?: any;
    backgroundColor? : string;
}

export interface OAuthButtonProps extends ButtonProps {
    containerStyle: string;
    iconLeft?: any;
}


export interface CustomInputProps extends TextInputProps {

    iconLeft?: any;
    iconRight?: any;
    placeholder?: string;
    placeholderStyle?: string;
    containerStyle?: string;
    secureTextEntry?: boolean;
    onChangeText: (text:string)=>void
}

export  interface OTPInputProps {
    codes: string[];
    refs: RefObject<TextInput>[];
    errorMessages: string[] | undefined;
    onChangeCode: (text: string, index: number) => void;
  }






export interface Post{

  userId:number;
  id:number;
  title:string;
  body:string;
}

export interface PostsResponse {
  message: string;
  status: number;
  data: Post[];
}




export interface CustomAddButtonProps {
  containerStyle?: string;

  onPress: () => void;

}


export interface Expense{
  id: string;
  name: string;
  amount: string;
  description: string;
  userId:string;
  createdAt: string;
}



export interface CreateExpenseInput{
   id:string;
   name: string;
  amount: string;
  description: string;

}

export interface CreateExpenseResponse {
  message: string;
  status: number;
  data: Expense;
}



export interface User{
    id: string;
  username: string;
  password: string;
  createdAt: string;
}