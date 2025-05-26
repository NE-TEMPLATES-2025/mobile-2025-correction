

import React from 'react'
import { Text, View } from 'react-native'
import {ReactNativeModal} from "react-native-modal"
import CustomInput from './CustomInput';
import CustomButton2 from './CustomButton2';

 interface CustomModalProps {
  isVisible?: boolean;
  onClose?: () => void;
  onChangeText: (text: string) => void;
  onPress: () => void;
}
const CustomModal = ({isVisible,onClose,onChangeText,onPress}:CustomModalProps) => {
  
  return (
     <ReactNativeModal
     isVisible={isVisible}
     onBackdropPress={onClose}
     onBackButtonPress={onClose}

     >
      <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px] flex gap-4'>
        <Text>Add the parking here</Text>
         <View className='flex w-full gap-2'>
          <CustomInput
          onChangeText={onChangeText}
          containerStyle='rounded-lg border border-gray-300' 
          placeholder='Enter Parking Name'
          placeholderStyle='text-gray-500 font-semibold'
          multiline={false}
          numberOfLines={1}
          />
          <CustomInput
          onChangeText={onChangeText}
          containerStyle='rounded-lg border border-gray-300' 
          placeholder='Enter Parking Code'
          placeholderStyle='text-gray-500 font-semibold'
          multiline={false}
          numberOfLines={1}
          />
          <CustomInput
          onChangeText={onChangeText}
          containerStyle='rounded-lg border border-gray-300' 
          placeholder='Enter Number of spaces'
          placeholderStyle='text-gray-500 font-semibold'
        
          keyboardType='numeric'
        
          />
          <CustomInput
          onChangeText={onChangeText}
          containerStyle='rounded-lg border border-gray-300' 
          placeholder='Charge per hour'
          placeholderStyle='text-gray-500 font-semibold'
          keyboardType='numeric'
        
          />
        <CustomButton2 onPress={onPress} containerStyle='px-6 py-2  self-center' title='Create'/>
         </View>
      </View>
     </ReactNativeModal>
  
  )
}

export default CustomModal
