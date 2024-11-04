import { StyleSheet, Text, View,  PermissionsAndroid,Platform ,Button, Alert, SafeAreaView,Linking} from 'react-native'
import React, {useEffect,useRef,useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";

import 'react-native-gesture-handler';
import { ThemeProvider } from '@/theme';
import ApplicationNavigator from './navigators/Application';
export const storage = new MMKV();
import { fetchWrapper } from './components/helpers';
import RNShake from 'react-native-shake';
import { MMKV } from 'react-native-mmkv'
import SystemSetting from 'react-native-system-setting'
import {SheetProvider} from 'react-native-actions-sheet';
import './sheet/SheetList';
import { useNetInfo } from '@react-native-community/netinfo';
const App = () => {
  const watchIdRef = useRef(null);
  const [locationEnabledVal, setLocationEntableVAl] = useState(true);
  const [airEnabledVal, setAirEntableVal] = useState(false);
 

  const API_URL2 = process.env.API_URL
   const storage = new MMKV({
      id: `izak-10`,
      
    })
let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];
const [locationVal, setLocationVal] = useState({});

       const netInfo = useNetInfo()
      

  useEffect(() => {

   
      

       //console.log('net info changed, new state: ', netInfo)
     
  }, [netInfo])


   
useEffect(() => {

   
 

   
    const locationListener = SystemSetting.addLocationListener(
      (locationEnabled) => {
          
          setLocationEntableVAl(locationEnabled)
          
      },
    );

    return () => SystemSetting.removeListener(locationListener);
  }, []);

useEffect(() => {
    const airPlaneListener = SystemSetting.addAirplaneListener(
      (airEnable) => {
          
          setAirEntableVal(airEnable)
          
      },
    );

    return () => SystemSetting.removeListener(airPlaneListener);
  }, []);




  useEffect(() => {

    
    callme();

       const subscription = RNShake.addListener(() => {
       
          sendSos(location);
        
        
       
        
        
        
      })

      return () => {
       //console.log("ddd0000")
        // Your code here...
        subscription.remove()
      }

      return () => {
           Geolocation.clearWatch(watchId);
      };

  }, []);

 
const sendSos = async(location) => {


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
            
            

            setLoading(true)
        
            const url = `${API_URL2}/user/sos`;
                 const token = ""
                 const postData = {
                    user_id:user.id,
                    location:locationData
                 }
         

             const listData = await fetchWrapper.post(url,token,postData);
             setLoading(false)

            
              
        })
        .catch(error => {
             
            Linking.openSettings();
            const { code, message } = error;
           
            //console.log(code, message);
        })

 
  }
  const getTrackingTime = async () => {
    const url = `${API_URL2}/user/setting`;
  
      const token = {}
      const data = await fetchWrapper.get(url,token);
      
      return data;
  }
  const callme = async () => {
   
    const trackingTime = await getTrackingTime();
    
  
    await requestLocationPermission()
    updateforeground(trackingTime.tracking);
    Notification(trackingTime.tracking)
    startTracking(trackingTime.tracking);
  }
  const requestLocationPermission = async () => {
    Geolocation.requestAuthorization('always')
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('1Location permission granted');
      } else {
        Linking.openSettings();
        console.log('Location permission denied');
      }
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message:
            'We need access to your location ' +
            'so you can get live quality updates.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ); 
    } catch (err) {
      //Linking.openSettings();
      console.log(err);
    }
  }
  const updateforeground =(trackingTime)=>{
    ReactNativeForegroundService.add_task(() => startTracking(trackingTime), {
      delay: trackingTime,
      onLoop: true,
      taskId: "taskid",
      onError: (e) => console.log(`Error logging:`, e),
    });
  }
  const Notification =(trackingTime)=>{

    ReactNativeForegroundService.start({
      id: 1244,
      title: 'Location Tracking',
      message: 'Location Tracking',
      icon: 'ic_launcher',
      button: false,
      button2: false,
      // buttonText: "Button",
      // button2Text: "Anther Button",
      // buttonOnPress: "cray",
      setOnlyAlertOnce: true,
      color: '#000000',
    });
    startTracking(trackingTime)
  }

  const startTracking = async (trackingTime) => {
  // let s= Geolocation.requestAuthorization('always');
    
    Geolocation.getCurrentPosition(
      position => {
        let coordinates: any = [];
        coordinates[0] = position.coords.longitude;
        coordinates[1] = position.coords.latitude;

        let userA  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];
       
        if(userA?.id){
            const locVal = {latitude:position.coords.latitude,longitude:position.coords.longitude}
           
            sendLoaction(locVal,userA.id);
        }
        //console.log(Platform.OS,"App Position tracking",coordinates)
      },
      error => {
        Linking.openSettings();
       // console.log('maperror in getting location', error.code, error.message);

      },

      
      { maximumAge:60000,enableHighAccuracy: true, distanceFilter: 0,interval:trackingTime,forceLocationManager: true },
    );
  };
  const sendLoaction = async (location,user_id) => {

    
    


             const url = `${API_URL2}/user/location`;
        
                   const token = ""
                   const postData = {
                    user_id:user_id,
                    location:location,
                    event_id:0,
                   }
            
              
         

        const listData = await fetchWrapper.post(url,token,postData);

    
 
            
               
               
}
  
  return (

    <>
    {(locationEnabledVal && !airEnabledVal) ?
    
    <ThemeProvider storage={storage}>
         <SheetProvider>
        <ApplicationNavigator />
         </SheetProvider>
      </ThemeProvider>
     
      :
       <View
        style={{backgroundColor:'white',height:'100%',flex:1,justifyContent:'center'}}
       >

        <Text style={{color:'black',textAlign:'center',fontWeight:'bold'}}>Please enable you location and disable Airplane
       
        </Text>
        </View>

      }
      </>
  )
}
export default App

