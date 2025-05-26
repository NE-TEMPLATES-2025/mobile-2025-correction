import { CustomAddButtonProps } from '@/types'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const CustomAddButton = ({containerStyle,onPress}:CustomAddButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={` px-3 bg-blue-500 text-white py-3 rounded-full shadow-lg flex flex-row items-center ${containerStyle}`}>
     
     <MaterialIcons name="add" size={24} color="white" />
    </TouchableOpacity>
  )
}

export default CustomAddButton
