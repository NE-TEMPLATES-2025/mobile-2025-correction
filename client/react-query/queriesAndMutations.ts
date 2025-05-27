import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKey"
import expenses from "@/app/api/expenses";
import { CreateExpenseInput } from "@/types";





// export const useCreateParkingMutation= ()=>{
//     const queryClient= useQueryClient();
//     return useMutation( {
//         mutationFn: async ({code,parkingName,availableSpaces,location,chargingFeePerHour,userId}:CreateParkingInput)=>createParking(
//             code,
//             parkingName,
//             availableSpaces,
//             location,
//             chargingFeePerHour,
//             userId
//         ),
//         onSuccess: ()=>{
//      queryClient.invalidateQueries({
//         queryKey:[QUERY_KEYS.GET_ALL_PARKINGS]
//      })
//         }
//     })
// }



// export const useRegisterCarEntryMutation= ()=>{
//     return useMutation({
//         mutationFn: ({plateNumber,parkingCode,entryDateTime}:RegisterCarEntryInput)=>registerCarEntry(plateNumber,parkingCode,entryDateTime)
//     })
// }




export const useGetAllExpensesQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_EXPENSES],
        queryFn: ()=>expenses.getAllExpenses(),
        refetchOnWindowFocus: false,
    });
}

export const useGetExpenseByIdQuery = (id: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_EXPENSE_BY_ID, id],
        queryFn: () => expenses.getExpenseById(id),
        refetchOnWindowFocus: false,
    });
}

export const useCreateExpenseMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateExpenseInput) => expenses.createExpense(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_EXPENSES],
            });
        },
    });
}


export const useDeleteExpenseMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => expenses.deleteExpense(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_EXPENSES],
            });
        },
    });
}