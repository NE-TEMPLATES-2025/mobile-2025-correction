
import React from 'react'
import { Stack } from 'expo-router'

const ExpensesLayout = () => {
  return (
    <Stack screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name='expense'/>
    </Stack>
  )
}

export default ExpensesLayout