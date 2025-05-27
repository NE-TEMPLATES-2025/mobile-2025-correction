import CustomAddButton from '@/components/CustomAddButton'
import CustomButton2 from '@/components/CustomButton2'
import CustomInput from '@/components/CustomInput'
import { useCreateExpenseMutation, useGetAllExpensesQuery } from '@/react-query/queriesAndMutations'
import { useAppSelector } from '@/redux/store'
import Entypo from '@expo/vector-icons/Entypo'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { SafeAreaView } from 'react-native-safe-area-context'

const Expenses = () => {

     const { user,token } = useAppSelector((state) => state.user);
     console.log(token);
     
    
    const [isVisible, setIsVisible] = useState(false);
    const [form, setForm] = useState({
        name: '',
        description: '',
        amount: ''
    })

    const {
        data: expenses,
        isLoading: isLoadingAll,
        isError: isErrorAll,
    } = useGetAllExpensesQuery()

    const { mutateAsync: createExpense, isError: error, isPending, isSuccess } = useCreateExpenseMutation()


const handleAddExpense = async () => {
  const { name, description, amount } = form;

  // Basic validation
  if (!name.trim() || !description.trim() || !amount.trim()) {
    alert("All fields are required.");
    return;
  }

  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    alert("Please enter a valid positive amount.");
    return;
  }

  try {
    await createExpense({
      ...form,
      amount: parsedAmount.toFixed(2),
      id: (expenses!.length + 1).toString(),
    });

    setIsVisible(false);
    setForm({
      name: '',
      description: '',
      amount: '',
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    alert("Something went wrong while creating the expense.");
  }
};

    return (
        <SafeAreaView className="bg-secondary flex-1">
            <View className="flex-1 relative px-6 pt-6 pb-8">
                {/* Header */}
                <View className="flex flex-row justify-center items-center w-full mb-4">
                    <Text className="text-2xl font-semibold">Expenses</Text>
                    <Entypo
                        style={{ position: 'absolute', left: 0 }}
                        name="chevron-left"
                        size={30}
                        color="black"
                    />
                </View>

                {/* Expenses List */}
                <FlatList
                    data={expenses}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={({ item }) => (

                        <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/(expenses)/[id]")}>


                            <View className="w-full bg-white py-3 px-3 rounded-lg mb-3 flex flex-row items-center justify-between">
                                <View className='flex flex-col gap-1'>
                                    <Text className="text-lg font-semibold text-blue-400">
                                        {item.name}
                                    </Text>
                                    <Text className="text-sm font-normal text-dark">
                                        {item.description}
                                    </Text>
                                    <Text className="text-lg font-semibold text-blue-400">
                                        {item.amount}
                                    </Text>

                                </View>
                                <TouchableOpacity onPress={() => router.push({
                                    pathname: "/(root)/(tabs)/(expenses)/[id]",
                                    params: { id: item.id.toString() },
                                })
                                } className='bg-blue-400 px-4 py-2 rounded-lg'>
                                    <Text className='text-white text-[16px] font-medium'>View</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                />

                {/* Floating Button */}
                <View className="absolute right-6 bottom-28">
                    <CustomAddButton onPress={() => setIsVisible(true)} />
                </View>
            </View>

            {/* add expense modal */}

            <ReactNativeModal
                isVisible={isVisible}
                onBackdropPress={() => setIsVisible(false)}
            >
                <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px] flex gap-4'>
                    <Text className='text-xl font-semibold'>Add the expense here</Text>
                    <View className='flex w-full gap-2'>
                        <CustomInput
                            onChangeText={(text) => setForm({ ...form, name: text })}
                            containerStyle='rounded-lg border border-gray-300'
                            placeholder='Enter Expense Name'
                            placeholderStyle='text-gray-500 font-semibold'
                            multiline={false}
                            numberOfLines={1}
                        />
                        <CustomInput
                            onChangeText={(text) => setForm({ ...form, description: text })}
                            containerStyle='rounded-lg border border-gray-300'
                            placeholder='Enter description'
                            placeholderStyle='text-gray-500 font-semibold'
                            multiline={false}
                            numberOfLines={1}
                        />
                        <CustomInput
                            onChangeText={(text) => setForm({ ...form, amount: text })}
                            containerStyle='rounded-lg border border-gray-300'
                            placeholder='Enter amount'
                            placeholderStyle='text-gray-500 font-semibold'

                            keyboardType='numeric'

                        />

                        <CustomButton2 containerStyle='bg-blue-600' onPress={handleAddExpense}  title='Create' />
                    </View>
                    <TouchableOpacity  onPress={() => setIsVisible(false)} className='absolute top-4 right-4'>

                            <Entypo className='' name="cross" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </ReactNativeModal>

        </SafeAreaView>
    )
}

export default Expenses
