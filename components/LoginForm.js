import {useContext, useEffect, useState} from 'react'
import {View,Text,StyleSheet,TextInput,Button, TouchableOpacity} from 'react-native'
import { AuthContext } from '../App'
import Message from './Message'

const LoginForm = ({navigation}) => {

  const [login,setLogin] = useState('')
  const [password,setPassword] = useState('')
  const [message,setMessage] = useState('')
  const auth = useContext(AuthContext)

  const logIn = () => {
      if(!login || !password)
        setMessage('Enter login and password')
      else{
        setMessage('Logging in..')
        fetch('http://10.0.2.2:8000/api/user/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({login,password})
        })
        .then(res => res.json())
        .then(res => {
          if(res.message === 'Success'){
            auth.setToken(res.data.token)
            auth.setIsAuth(true)
          }else setMessage(res.message)
        })
        .catch(err => alert(err))
      }
  }

  useEffect(() => {
    setLogin('')
    setPassword('')
    setMessage('')
  },[navigation,auth])


  return(
    <View style={styles.container}>
      <View style={styles.inputs}>
        <Text style={styles.title}>Sign in</Text>
        <TextInput style={styles.textInput}
          placeholder="Login"
          onChangeText={setLogin}
          value={login}
        />
        <TextInput style={styles.textInput}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry={true}
          value={password}
        />
        <Button
          title="Log in"
          onPress={logIn}
        />
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.signup}>Sign up</Text>
        </TouchableOpacity>
        {message && <Message content={message}/>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(100,100,100,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  inputs: {
    backgroundColor: 'rgba(200,150,100,0.9)',
    width: '75%',
    padding: 15,
    textAlign: 'center',
    alignItems: 'center'
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'rgb(69, 150, 168)',
    margin: 10,
    padding: 8,
    width: '100%',
    borderRadius: 5
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  signup: {
    color: 'rgb(15, 92, 35)',
    marginTop: 2,
    fontSize: 15
  }
})

export default LoginForm