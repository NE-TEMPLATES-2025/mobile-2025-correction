import { useGetAllExpensesQuery } from '@/react-query/queriesAndMutations'
import Entypo from '@expo/vector-icons/Entypo'
import React from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Expenses = () => {
      const {
        data: expenses,
        isLoading: isLoadingAll,
        isError: isErrorAll,
      } = useGetAllExpensesQuery();
    
    
    
    return (
        <SafeAreaView className='bg-secondary flex-1 h-full'>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="h-full w-full px-6 pt-6 pb-8">
                    <View className="relative flex flex-row justify-center items-center w-full">
                        <Text className="text-2xl font-semibold">Expenses</Text>
                        <Entypo
                            className="absolute left-0"
                            name="chevron-left"
                            size={30}
                            color="black"
                        />
                    </View>
                    <FlatList 
                    
                    data={expenses}
                    keyExtractor={({id})=>id.toString()}
                    renderItem={({item})=>(
                        <View className='w-full bg-white py-3 px-3 rounded-lg flex flex-col gap-1'>
                            <Text className='text-lg font-semibold text-blue-400'>{item.name}</Text>
                            <Text className='text-sm font-normal text-dark'>{item.description}</Text>
                            <Text className='text-lg font-semibold text-blue-400'>{item.amount}</Text>
                        </View>
                    )}

                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={()=>(
                        <View className='h-3 w-full bg-secondary'/>
                    )}
                    
                    />


                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default Expenses
