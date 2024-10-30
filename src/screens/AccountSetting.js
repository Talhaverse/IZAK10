import { 
PermissionsAndroid, Linking, 
    View, Text,TouchableOpacity,SafeAreaView,ActivityIndicator,StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React,{useState} from 'react'
import { MMKV } from 'react-native-mmkv'
import { fetchWrapper } from '../components/helpers';
import GetLocation from 'react-native-get-location'
const AccountSetting = ({navigation}) => {
    const [loading,setLoading] = useState(false);
    const API_URL2 = process.env.API_URL
   const storage = new MMKV({
      id: `izak-10`,
      
    })
   let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];
  const logout = () => {
        storage.delete('customer')
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
          rationale: {
            title: 'Location permission',
            message: 'The app needs the permission to request your location.',
            buttonPositive: 'Ok',
          },
        })
        .then(async location => {
            

          const locationData  = {latitude:location.latitude,longitude:location.longitude}
            const postData = {user_id:user.id,location:locationData,event_id:3}
            
              
              const token = ""
              const url = `${API_URL2}/user/location`;
              setLoading(true)
                const data  = await fetchWrapper.post(url,token,postData).then(async userData => {
                    setLoading(false)


                   
                        setLoading(false)
                        storage.delete('user');
                         navigation.navigate('Login');
                    
                    
                     

                }).catch((err) => {
                    setLoading(false)
                    alert("Error")
                })

        })
        .catch(error => {
             
            Linking.openSettings();
            const { code, message } = error;
           
            console.log(code, message);
        })

     
  }
  return (
    <SafeAreaView style={{flex:1}}>
      {loading && 
        <View style={styles.loading}>
          <ActivityIndicator color="#fff" size='large' />
        </View>
        }
        <View style={{height:'100%',alignItems:'center',marginTop:50}}>

            <Text style={{color:'#008B8B',fontSize:20,fontWeight:'bold'}}>Settings</Text>
            <FontAwesome name="user" style={{fontSize: 200,color: '#ccc',marginRight: 15}} />

            <TouchableOpacity
              onPress={() => logout()}
              style={{backgroundColor:'#008B8B',borderWidth:1,borderColor:'#008B8B',borderRadius:6,padding:10}}
            >

                <Text style={{color:'#fff',fontSize:14,fontWeight:'bold'}}>Logout</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({

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
export default AccountSetting