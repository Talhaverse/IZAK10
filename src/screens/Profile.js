import { View, Text,ScrollView,Image,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import { fetchWrapper } from '../components/helpers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

    <View style={{padding: 20}}>
          <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginBottom: 20}}>
            <Icon name="chevron-left" style={{fontSize: 18,color: '#000',marginRight: 5}} />

            <Text style={{fontSize: 16,fontWeight: 400,color: '#000',marginLeft: 5,fontFamily:'Poppins-Medium'}}>Profile</Text>
          </TouchableOpacity>

          <View style={{marginBottom: 20}}>
            <View style={{alignSelf: 'center',position: 'relative',marginBottom: 20}}>
              {user?.profile_img == "" || user?.profile_img == null ? (


                  <View
                style={{width:120,height:120,backgroundColor:'#EFEFEF',borderColor:'#EFEFEF',borderWidth:1,borderRadius:120,
                  display: 'flex',justifyContent: 'center',alignItems: 'center'
                }}
              >
                <Text style={{color:'#008B8B',fontSize:40,textTransform: 'uppercase'}}>{user?.username?.substr(0,1)}</Text>


                
              </View>


                ) : (



                  <Image source={{uri: imageUri, scale: 1}} style={{height: 120, width: 120,borderRadius:120}}/>

                )}
            </View>  
            <View>
  
              <Text style={{fontSize: 20,fontWeight: 800,color: '#000',textAlign: 'center',fontFamily:'Poppins-Regular'}}>{user?.first_name}{user?.last_name}</Text>

              <View>
                <Text style={{color: '#10163A',fontSize: 14,fontWeight: 400,textAlign: 'center',fontFamily:'Poppins-Regular'}}></Text>
              </View>
            </View>
          </View>

          <View style={{paddingBottom: 30}}>
            <View style={{backgroundColor: '#fff',padding: 0,borderRadius: 5,marginBottom: 15}}>
              <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginBottom: 20}}>
                <View style={{marginRight: 15,width: 25}}>
                  <Icon name="user" style={{fontSize: 25,color: '#000'}} />
                </View>

                <View>
                  <Text style={{fontSize: 14,fontWeight: 800,color: '#000',fontFamily:'Poppins-Regular'}}>Login ID</Text>
                  <Text style={{fontSize: 14,fontWeight: 400,color: '#000',fontFamily:'Poppins-Regular'}}>{user?.username}</Text>
                </View>
              </View>

              <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginBottom: 20}}>
                <View style={{marginRight: 15,width: 25}}>
                  <EntypoIcon name="email" style={{fontSize: 25,color: '#000'}} />
                </View>

                <View>
                  <Text style={{fontSize: 14,fontWeight: 800,color: '#000',fontFamily:'Poppins-Regular'}}>Email</Text>
                  <Text style={{fontSize: 14,fontWeight: 400,color: '#000',fontFamily:'Poppins-Regular'}}>{user?.email}</Text>
                </View>
              </View>

              <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginBottom: 20}}>
                <View style={{marginRight: 15,width: 25}}>
                  <AntDesignIcon name="contacts" style={{fontSize: 25,color: '#000'}} />
                </View>

                <View>
                  <Text style={{fontSize: 14,fontWeight: 800,color: '#000',fontFamily:'Poppins-Regular'}}>Contact No</Text>
                  <Text style={{fontSize: 14,fontWeight: 400,color: '#000',fontFamily:'Poppins-Regular'}}>{user?.contact_no}</Text>
                </View>
              </View>

              <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginBottom: 20}}>
                <View style={{marginRight: 15,width: 25}}>
                  <Icon name="id-card" style={{fontSize: 22,color: '#000'}} />
                </View>

                <View>
                  <Text style={{fontSize: 14,fontWeight: 800,color: '#000',fontFamily:'Poppins-Regular'}}>CNIC</Text>
                  <Text style={{fontSize: 14,fontWeight: 400,color: '#000',width: '95%',flexWrap: 'wrap',fontFamily:'Poppins-Regular'}}>{user?.cnic}</Text>
                </View>
              </View>

              <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginBottom: 20}}>
                <View style={{marginRight: 15,width: 25}}>
                  <MaterialIcons name="report" style={{fontSize: 25,color: '#000'}} />
                </View>

                <View>
                  <Text style={{fontSize: 14,fontWeight: 800,color: '#000',fontFamily:'Poppins-Regular'}}>Report To</Text>
                  <Text style={{fontSize: 14,fontWeight: 400,color: '#000',width: '100%',flexWrap: 'wrap',fontFamily:'Poppins-Regular'}}>{user?.report_to}</Text>
                </View>
              </View>

              <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                <View style={{marginRight: 15,width: 25}}>
                  <View style={{borderWidth: 1,borderColor: '#000',padding: 5,borderRadius: 5}}>
                    <Icon name="user" style={{fontSize: 15,color: '#000'}} />
                  </View>
                </View>

                <View>
                  <Text style={{fontSize: 14,fontWeight: 800,color: '#000',fontFamily:'Poppins-Regular'}}>User Role</Text>
                  <Text style={{fontSize: 14,fontWeight: 400,color: '#000',fontFamily:'Poppins-Regular'}}>Field Agent</Text>
                </View>
              </View>
            </View>

            

            
          </View>
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

