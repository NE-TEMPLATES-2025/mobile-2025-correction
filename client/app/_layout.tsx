import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";


// import store, { useAppDispatch } from "@/redux/store";
// import { loadUserFromStorage } from "@/redux/userSlice";

import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  const [loaded] = useFonts({
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // const AppInitializer= ({children}:{children:React.ReactNode})=>{
  //   const dispatch= useAppDispatch();

  //   useEffect(()=>{
  //     dispatch(loadUserFromStorage());
  //   },[])

  //   return <>{children}</>
  // }


  return (
    // <Provider store={store}>
    //   <AppInitializer>

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(root)" />
      </Stack>
    //   </AppInitializer>
    // </Provider>
  );
}
