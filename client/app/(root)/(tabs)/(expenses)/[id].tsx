import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Alert, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDeleteExpenseMutation, useGetExpenseByIdQuery } from '@/react-query/queriesAndMutations'
import CustomButton2 from '@/components/CustomButton2'

const ExpenseDetails = () => {
  const { id } = useLocalSearchParams()
  const router = useRouter()

  const { data: expense, isLoading, isError } = useGetExpenseByIdQuery(id as string)
  const { mutateAsync: deleteExpense, isPending: isDeleting } = useDeleteExpenseMutation()

  const handleDelete = async () => {
    Alert.alert("Delete Expense", "Are you sure you want to delete this expense?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteExpense(id as string)
            router.back()
          } catch (error) {
            console.error("Delete failed:", error)
          }
        }
      }
    ])
  }

  if (isLoading) return <Text className="p-4">Loading...</Text>
  if (isError || !expense) return <Text className="p-4">Error loading expense</Text>

  return (
    <SafeAreaView className="bg-secondary flex-1 px-6 pt-6">
      <View className="bg-white p-4 rounded-xl space-y-4">
        <Text className="text-xl font-bold text-blue-400">{expense.name}</Text>
        <Text className="text-base text-dark">{expense.description}</Text>
        <Text className="text-lg font-semibold text-blue-400">${expense.amount}</Text>
      </View>

      <View className="mt-8">
        <CustomButton2
          onPress={handleDelete}
          title={isDeleting ? "Deleting..." : "Delete Expense"}
          containerStyle="px-6 py-3"
        />
      </View>
    </SafeAreaView>
  )
}

export default ExpenseDetails
