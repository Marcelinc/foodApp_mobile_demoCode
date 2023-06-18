import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {createContext, useEffect, useState} from 'react'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import Dashboard from './screens/Dashboard';
import Rooms from './screens/Rooms';
import Friends from './screens/Friends';
import Notifications from './screens/Notifications';
import RoomDashboard from './screens/RoomDashboard';
import PushNotification from 'react-native-push-notification';

const Stack = createNativeStackNavigator();
export const AuthContext = createContext();

const App = () => {

  const [isAuth,setIsAuth] = useState(false)
  const [token,setToken] = useState('')

  //const onFetch = () => {
  //  fetch('http://localhost:8080/')
  //}
  


  const notify = () => {
    PushNotification.localNotification({
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
    });
  }

  useEffect(() => {

  },[])

  return(
    <AuthContext.Provider value={{isAuth,setIsAuth,token,setToken}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home" detachInactiveScreens>
            <Stack.Screen name="login" options={{headerShown: false}} component={LoginScreen} />
            <Stack.Screen name="register" options={{headerShown: false}} component={RegisterScreen} />
            <Stack.Screen name="dashboard" options={{headerShown: false}} component={Dashboard}/>
            <Stack.Screen name='rooms' options={{title: 'Rooms'}} component={Rooms}/>
            <Stack.Screen name='friends' options={{headerShown: false}} component={Friends}/>
            <Stack.Screen name='notifications' options={{headerShown: false}} component={Notifications}/>
            <Stack.Screen name='roomDashboard' options={{headerShown: false}} component={RoomDashboard}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}


export default App

