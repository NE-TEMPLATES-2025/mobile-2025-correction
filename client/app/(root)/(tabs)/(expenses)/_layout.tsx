
import React from 'react'
import { Stack } from 'expo-router'

const ExpensesLayout = () => {
  return (
    <Stack screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name='expense'/>
        <Stack.Screen name='register'/>
        <Stack.Screen name='login'/>
    </Stack>
  )
}

export default ExpensesLayout