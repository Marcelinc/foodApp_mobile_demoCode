import {View,Text,StyleSheet} from 'react-native'

const Nav = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>FoodApp</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(200,255,50,0.7)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    padding: 10,
    color: 'black',
    fontSize: 22,

  }
})

export default Nav