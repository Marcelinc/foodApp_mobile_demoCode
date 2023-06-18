import { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { AuthContext } from '../App';
import Image from '../resources/images/background.jpg'
import LoginForm from '../components/LoginForm'
import Nav from '../components/Nav'

const LoginScreen = ({navigation}) => {

  const auth = useContext(AuthContext)

  useEffect(() => {
    if(auth.isAuth)
      navigation.navigate('dashboard')
  },[auth])

  return (
    <View style={styles.container}>
      <ImageBackground source={Image} resizeMode="cover" style={styles.bg}>
        <Nav/>
        <LoginForm navigation={navigation}/>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    bg: {
      flex: 1
    }
  });
  

export default LoginScreen