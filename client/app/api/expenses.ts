import { CreateExpenseInput, Expense } from "@/types";
import { protectedApiClient } from "./apiClient";


const getAllExpenses= async ()=>{
    try {
        const response=await protectedApiClient.get<Expense[]>("/expenses");
        if(response.status !== 200) {
            throw new Error("Failed to fetch expenses");
        }
        const expenses=response.data;
        return expenses;
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch expenses");
        
    }
}

 const createExpense = async ({ name,description,amount}:CreateExpenseInput)=>{
    try {
        const response= await protectedApiClient.post<Expense>('/expenses',{
            name,
            description,
            amount
        })
        if(response.status !== 201) {
            throw new Error("Failed to create expense");
        }

        const expense=response.data;
        return expense;
        
    } catch (error) {
          console.log(error);
        throw new Error("Failed to create expense");
    }
}


const getExpenseById= async(id:string)=>{
    try {
        const response= await protectedApiClient.get<Expense>(`/expenses/${id}`);
        if(response.status !== 200) {
            throw new Error("Failed to fetch expense by ID");
        }

        const expense=response.data;
        return expense;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch expense by ID");
        
    }
}

const editExpense= async(id:string,name:string,description:string,amount:number)=>{
    try {
        const expense=await getExpenseById(id);
        if(!expense) {
            throw new Error("expense not found");
        }
        const response= await protectedApiClient.put<Expense>(`/expenses/${id}`,{
            ...expense,
           name,
            description,
            amount

        });
        const updatedexpense=response.data;
        return updatedexpense;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to edit expense");
    }
}

const deleteExpense = async(id:string)=>{
    try {
        await protectedApiClient.delete(`/expenses/${id}`);
        return { message: "expense deleted successfully" };
    } catch (error) {
         console.log(error);
        throw new Error("Failed to delete expense");
    }
}



export default {
   getAllExpenses,
    createExpense,
    getExpenseById,
    editExpense,
    deleteExpense
}

