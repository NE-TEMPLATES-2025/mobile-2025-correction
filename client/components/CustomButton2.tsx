
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'

const CustomButton2 = ({onPress,
    containerStyle,
    textStyle,
    title}:CustomButtonProps) => {
  return (
    <TouchableOpacity 
    className={`flex flow-row bg-blue-600  items-center justify-center text-center py-3 ${containerStyle} rounded-lg`}
    onPress={onPress}
    
    >
      <View className='w-full flex flex-row items-center justify-center'>       
        <Text className={`text-lg font-medium leading-7 flex text-white ${textStyle}`}>{title}</Text>

      </View>



    </TouchableOpacity>
  )
}

export default CustomButton2
