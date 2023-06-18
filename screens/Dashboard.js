import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../App';
import Option from '../components/Option'
import { img } from '../resources/images/imgList';

const Dashboard = ({navigation}) => {

  const auth = useContext(AuthContext)
  const [user,setUser] = useState({id:1,name:'marcelinc',img:'profile1',balance: 0})

  useEffect(() => {
    if(!auth.isAuth)
      navigation.navigate('login')
    
    //fetch user data
    fetch('http://10.0.2.2:8000/api/user/getUser',{
      headers: {
        'Authorization':'Bearer '+auth.token,
        'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if(res.message === 'Success'){
        setUser(res.data)
      }
    })
    .catch(err => console.log(err))
    
  },[auth])
  
  return (
  <View style={styles.container}>
    <View style={styles.nav}>
      <Text style={styles.title}>Dashboard</Text>
    </View>
    <View style={styles.content}>
      <View style={styles.profileInfo}>
        <Image
          style={styles.userImage}
          source={img[user.img]}
        />
        <Text style={styles.username}>{user.login}</Text>
        {user.balance > 0 ? <Text style={[styles.positiveBalance,styles.balance]}>+{user.balance}$</Text> :
        user.balance < 0 ? <Text style={[styles.negativeBalance,styles.balance]}>-{user.balance}$</Text> : 
        <Text style={styles.balance}>{user.balance}$</Text>}
      </View>
      <View style={styles.options}>
        <ScrollView>
         {options.map(option => <Option key={option.name} data={option} nav={navigation}/>) }
        </ScrollView>
      </View>
    </View>
  </View>
  )
}

export default Dashboard


const options = [
  {name: 'Rooms', img: ''},
  {name: 'Friends', img: ''},
  {name: 'Transactions', img: ''},
  {name: 'Notifications', img: ''},
  {name: 'Logout', img: ''},
]
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      //backgroundColor: '#ecf0f1',
      backgroundColor: 'rgb(17, 158, 95)',
      padding: 8,
    },
    nav: {
      backgroundColor: 'purple',
      padding: 10,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 25,
      
    },
    profileInfo: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2
    },
    userImage: {
      width: '45%',
      height: '45%',
      backgroundColor: 'blue',
      borderRadius: 5,
    },
    options: {
      flex:5
    },
    username: {
      margin: 20,
      fontSize: 20,
      fontWeight: '600'
    },
    positiveBalance: {
      color: 'green'
    },
    negativeBalance: {
      color: 'red'
    },
    balance:{
      fontWeight:'600',
      fontSize:16
    },
    title:{
      fontWeight:'600',
      fontSize: 20
    }
  });