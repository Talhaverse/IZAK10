import { useEffect, useState } from 'react';
import { 
  PermissionsAndroid, Linking,
  Text,ScrollView,View,TextInput,StyleSheet, TouchableOpacity,ActivityIndicator,Dimensions,SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchWrapper } from '../../components/helpers';
import { MMKV } from 'react-native-mmkv'
import GetLocation from 'react-native-get-location'

const Login = ({route,navigation}) => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading,setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);



	 const storage = new MMKV({
      id: `izak-10`,
      
    })


     
     let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : false;
     if(user){
        navigation.navigate('Dashboard')
     }

	const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 


    const login = async() => {

    const API_URL2 = process.env.API_URL
    const url = `${API_URL2}/user/login`;
   
   
   

    if(username == ""){
      alert("Please, username is required.");
      return false;
    }

    if(password == ""){
      alert("Please, password is required.");
      return false;
    }

    
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
            const postData = {username:username,password:password,location:locationData}
            
            
              const token = ""
              setLoading(true)
                const data  = await fetchWrapper.post(url,token,postData).then(async userData => {
                    setLoading(false)


                    if(userData.success){
                        storage.set('user', JSON.stringify(userData.user))
                      navigation.navigate("Dashboard")
                    }else{
                        alert("Invalid user");
                        return false;
                    }
                    
                    

                }).catch((err) => {
                    setLoading(false)
                    alert("Invalid User")
                })

        })
        .catch(error => {
             
            Linking.openSettings();
            const { code, message } = error;
           
            console.log(code, message);
        })
      
      
    

   
    
     
     

    //navigation.navigate('Home')
  }

  
	return (
			<SafeAreaView style={{flex:1}}>
      {loading && 
        <View style={styles.loading}>
          <ActivityIndicator color="#fff" size='large' />
        </View>
        }

				<View style={{padding: 40}}>
        <View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            
            <Text style={{fontSize: 45,fontWeight: 900,color:'#008B8B'}}>IZAK 10</Text>
            <Text style={{fontSize: 16,fontWeight: 400,color:'#008B8B'}}>Please login into your account</Text>
          </View>
        
         


            <>

            <View style={{marginTop: 40}}>
            
                 <View>
                    <Text style={{color:'#008B8B',fontWeight:'bold'}}>Login ID</Text>


                </View>

                <View style={{borderWidth: 1,borderColor: '#008B8B',borderRadius: 5,padding: 15,paddingTop:3,paddingBottom:3,display: 'flex',flexDirection: 'row',marginBottom: 25,alignItems: 'center'}}>
                  <TextInput
                      style={{height:40, borderWidth: 0,color: '#008B8B',textAlign: 'left',fontSize: 14,width: '75%'}}
                       placeholder="Please enter your username"
                      placeholderTextColor= '#008B8B'
                    
                      onChangeText={e => setUsername(e)}
                      value={username}
                      


                  />
                </View>

                   <View>
                    <Text style={{color:'#008B8B',fontWeight:'bold'}}>Password</Text>
                  </View>
                  <View style={{borderWidth: 1,borderColor: '#008B8B',borderRadius: 5,padding: 15,paddingTop:3,paddingBottom:3,display: 'flex',flexDirection: 'row',marginBottom: 25,alignItems: 'center'}}>
                    <FontAwesome name="lock" style={{fontSize: 20,color: '#008B8B',marginRight: 15}} />
                    <TextInput style={{height:40, borderWidth: 0,color: '#008B8B',textAlign: 'left',fontSize: 14,width: '75%'}}
                      placeholder="Please enter your Password"
                      placeholderTextColor= '#008B8B'
                      keyboardType="password"
                      onChangeText={e => setPassword(e)}
                      value={password}
                       secureTextEntry={!showPassword} 
                    />
                    

                    <MaterialCommunityIcons 
                          name={showPassword ? 'eye-off' : 'eye'} 
                          size={24} 
                          color="#008B8B"
                          style={styles.icon} 
                          onPress={toggleShowPassword} 
                      /> 
                  </View>

                  <TouchableOpacity 
                  onPress={() => navigation.navigate('forget')}
                  style={{marginBottom:10}}>

                      <Text style={{color:'#008B8B',fontWeight:500,textAlign:'right'}}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{backgroundColor: '#008B8B',padding: 15,alignItems: 'center',borderRadius: 5}} onPress={() => login()}>
                    <Text style={{color: '#fff',fontSize: 14,fontWeight: 400,textAlign: 'center'}}>Login</Text>
                  </TouchableOpacity>

          
              </View>



               

                </>
        

            
               
              

        
        
           
           

         </View>
        <View style={{alignItems: 'center',marginTop: 100}}>
          <Text style={{fontSize: 14,fontWeight: 400,color:'#008B8B'}}>Powered by IZAK 10</Text>
        </View>
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

export default Login;