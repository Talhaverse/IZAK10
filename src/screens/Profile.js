import { View, Text,ScrollView,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import { fetchWrapper } from '../components/helpers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SheetManager} from 'react-native-actions-sheet';
import { MMKV } from 'react-native-mmkv'
import CustomerCardReview from './customer/CustomerCardReview';
import  moment from 'moment'

const Profile = ({navigation,route}) => {
  
  const [networkState, setNetworkState] = useState(false);
  
  const storage = new MMKV({
      id: `izak-10`,
      
    })
  let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];


  const CardPrint = ({label,value}) => {

      return (

          <View style={{borderWidth:1,margin:5,borderRadius:6,padding:10,backgroundColor:'#c7ecec'}}>
            <View><Text style={{color:'black',fontWeight:'bold',fontSize:14}}>{label}</Text></View>
            <View><Text style={{color:'black',fontWeight:'normal',fontSize:20}}>{value}</Text></View>
        </View>

        )
  }

  return (
     <View style={{margin:0,backgroundColor:'#fff',flex:1}}>
     <ScrollView>
     <View style={{margin:10}}>
     <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:22}}>Profile</Text>
     

        <CardPrint label="Login ID" value={user?.username} />

        <CardPrint label="First Name" value={user?.first_name} />
        <CardPrint label="Last Name" value={user?.last_name} />

        <CardPrint label="Email" value={user?.email} />

        <CardPrint label="Contact No" value={user?.contact_no} />

        <CardPrint label="CNIC" value={user?.cnic} />

        <CardPrint label="Report To" value={user?.report_to} />

        
        
       

        

        

       
        

       
       
     

       

      
    </View>
    </ScrollView>
    </View>
  )
}

export default Profile
const styles = StyleSheet.create({
     
  name:{
      color:'#008B8B',fontWeight:'bold'

  },
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },

loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#000',
    opacity:0.7,
    zIndex:9,
    //height:Dimensions.get('window').height
  },
  
})

