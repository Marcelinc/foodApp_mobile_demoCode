import React, { useContext, useEffect, useState } from 'react'
import { Modal, StyleSheet, TextInput, TouchableOpacity, View, Text, ScrollView } from 'react-native'
import { AuthContext } from '../App'
import FriendInviter from './FriendInviter'
import SearchBar from './SearchBar'

const SearchFriend = ({setForm,visible}) => {

  const auth = useContext(AuthContext)

  const [users,setUsers] = useState([])
  const [filter,setFilter] = useState('')
  const [message,setMessage] = useState('Search users')
  const [responseMsg,setResponse] = useState('')

  const findUsers = () => {
    if(filter){
      fetch('http://10.0.2.2:8000/api/user/getSelectedUsers/'+filter,{
        headers: {
          'Authorization':'Bearer '+auth.token,
          'Content-Type':'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if(res.message === 'Success'){
          setUsers(res.data)
          res.data && res.data.length == 0 ? setMessage('There are no users') : ''
        }
      })
      .catch(err => console.log(err))
    } else 
      setMessage('Type user name..')
  }


  return (
    <Modal transparent={true}
    animationType="fade"
    visible={visible}>
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Find user</Text>
                <TextInput placeholder='Friend name' style={styles.input}
                  onChangeText={setFilter}
                  value={filter}/>
                <TouchableOpacity style={styles.search} onPress={findUsers}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
                <ScrollView style={styles.list}>
                  {users.length > 0 ? users.map(u => <FriendInviter key={u._id} user={u} setResponse={setResponse}/>) : <Text style={styles.msg}>
                      {message}
                  </Text>}
                </ScrollView>
                {responseMsg && <Text style={styles.msg}>{responseMsg}</Text>}
                <TouchableOpacity onPress={() => setForm(false)} style={styles.cancel}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  )
}

export default SearchFriend

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(67, 59, 71,0.8)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      content: {
        backgroundColor: 'white',
        width: '90%',
        height: '55%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
      },
      input: {
        borderWidth: 1,
        margin: 10,
        width: '50%',
        padding: 4,
        borderRadius: 5
      },
      search: {
        backgroundColor: 'rgb(94, 61, 138)',
        padding: 5,
        borderRadius: 5
      },
      buttonText: {
        color: 'white'
      },
      list: {
        marginVertical: 10,
        backgroundColor: 'rgba(75, 132, 222,1)',
        width: '90%',
      },
      cancel: {
        backgroundColor: 'rgb(94, 61, 138)',
        padding: 5,
        borderRadius: 5,
        marginBottom: 15
      },
      title: {
        margin: 10,
        color: 'black',
        fontSize: 20,
        fontWeight: '500'
      },
      msg: {
        textAlign: 'center',
        padding: 5,
        fontWeight: '600',
        color: 'rgb(222, 118, 111)'
      }
})