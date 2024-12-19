import React,{useState,useEffect} from 'react'
import { View, Text,TouchableOpacity,ActivityIndicator,StyleSheet,Linking } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CameraRoll from '../components/camera/CameraRoll';
import GetLocation from 'react-native-get-location'
import { fetchWrapper } from '../components/helpers';
const Attendance = ({navigation}) => {
  const [locationVal, setLocationVal] = useState({});
  const storage = new MMKV({
      id: `izak-10`,
      
    })
   const [loading,setLoading] = useState(false);
   let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];
  
   let attendanceData  = storage.getString('attendance') ? JSON.parse(storage.getString('attendance')) : null;


   let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const separator='-'
  const toDay = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
 
 

  if(toDay != attendanceData?.date){
     
     storage.delete('attendance')
     
  }

  

  const [example, setExample] = useState();

  const [imageVal, setImageVal] = useState([]);
  const API_URL2 = process.env.API_URL;

  // useEffect(() => {
         

  //   GetLocation.getCurrentPosition({
  //       enableHighAccuracy: true,
  //       timeout: 60000,
  //   })
  //   .then(location => {
  //       setLocationVal({latitude:location.latitude,longitude:location.longitude})
  //   })
  //   .catch(error => {
  //       const { code, message } = error;
  //       console.warn(code, message);
  //   })


  //     }, []);

  if (example) {
    return example;
  }

  const onBack = () => setExample(undefined);
  
  const saveImage = (data) => {

setLoading(true)

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
            
          const dateStr = new Date();
          const locationData  = {latitude:location.latitude,longitude:location.longitude,datetime:dateStr}
           
            



              const loc = locationData;
       var myHeaders = new Headers();
            myHeaders.append("Content-Type", "multipart/form-data");


             var formdata = new FormData();

             
           
           
              const ffData = {
                    uri : data.uri,
                    type: 'image/jpeg',
                    name: data.name
                   }   

            formdata.append('file', ffData);

           
            formdata.append("user_id",user.id)
            formdata.append("location_val",JSON.stringify(loc))
          
           
           

            
            
           
           
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
             // redirect: 'follow'
            };
            const url = `${API_URL2}/attendance/save-attendance-in`;
           
            fetch(`${url}`, requestOptions)
            .then(response => response.json())
            .then(result => {
               
               
               storage.set('attendance', JSON.stringify(result))
               navigation.navigate('Dashboard',{id:Math.random()})
               setLoading(false)


            })
            .catch(error => {
             
              console.log('error', error)
              setLoading(false)

            });

             //setLoading(false);
              
        })
        .catch(error => {
             
            Linking.openSettings();
            const { code, message } = error;
           
            console.log(code, message);
        })

      
       


  } 

  const clockOut = async() => {

    setLoading(true)
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
            
            

           
            const url = `${API_URL2}/user/location`;
    const loc = locationVal;
             const token = ""
             const postData = {
              user_id:user.id,
              location:loc,
              event_id:4,
             }
            
          console.log(postData)
        const listData = await fetchWrapper.post(url,token,postData);
        // storage.delete('user');
        storage.delete('attendance');
        setLoading(false)
        // navigation.navigate('Login');
         navigation.navigate('Dashboard',{id:Math.random()})

            
              
        })
        .catch(error => {
             
            Linking.openSettings();
            const { code, message } = error;
           
            console.log(code, message);
        })

    
  }
  return (

    <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
    {loading && 
        <View style={styles.loading}>
          <ActivityIndicator color="#fff" size='large' />
        </View>
        }
      <Text
        style={{color:'#485563',fontWeight:'800',fontSize:40,textAlign:'center'}}
      >Press button to turn on/off duty!</Text>


      <Text
      style={{color:'#485563',fontWeight:'800',fontSize:25}}
      >Instructions:</Text>


     

      {!attendanceData && 
      <TouchableOpacity

        onPress={() => setExample(<CameraRoll setImageVal={setImageVal} mmVal="0" saveImage={saveImage} imageVal={imageVal} onBack={onBack} />)}
      >
            <FontAwesome name="check-circle" style={{fontSize: 200,color: 'black'}} />
       </TouchableOpacity>
     }
     {attendanceData &&

      <TouchableOpacity

        onPress={() => clockOut()}
      >
        <FontAwesome name="check-circle" style={{fontSize: 200,color: 'green'}} />
        </TouchableOpacity>
    }
      <Text style={{color:'#485563',fontWeight:'800',fontSize:25}}>-Black button: Duty is OFF</Text>
      <Text style={{color:'#485563',fontWeight:'800',fontSize:25}}>-Green button: Duty is On</Text>
    </View>

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
export default Attendance