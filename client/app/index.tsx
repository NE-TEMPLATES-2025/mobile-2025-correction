
import { Redirect } from 'expo-router';
import {useAppDispatch, useAppSelector } from '@/redux/store';
import { useState } from 'react';

export default function HomeScreen() {


  const {token,user,isLoading}= useAppSelector((state)=> state.user);
   if(isLoading) return null;

if(!token) return <Redirect href="/(onboarding)/onboarding-screens"/>
  return   <Redirect href="/(root)/(tabs)/home"/>
}
