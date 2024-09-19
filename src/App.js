import { StyleSheet, Text, View,  PermissionsAndroid,Platform ,Button, Alert, SafeAreaView} from 'react-native'
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
const App = () => {
  const watchIdRef = useRef(null);
  const API_URL2 = process.env.API_URL
   const storage = new MMKV({
      id: `izak-10`,
      
    })
   let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];
    const [locationVal, setLocationVal] = useState({});
  if (Platform.OS === 'android') {
    // Use PermissionsAndroid here
  }
  useEffect(() => {
    callme()
  }, []);
  const callme = async () => {
    await requestLocationPermission()
    updateforeground();
    Notification()
    startTracking();
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
      console.warn(err);
    }
  }
  const updateforeground =()=>{
    ReactNativeForegroundService.add_task(() => startTracking(), {
      delay: 900000,
      onLoop: true,
      taskId: "taskid",
      onError: (e) => console.log(`Error logging:`, e),
    });
  }
  const Notification =()=>{

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
    startTracking()
  }

  const startTracking = async () => {
  // let s= Geolocation.requestAuthorization('always');
    console.log("here .....")
    Geolocation.getCurrentPosition(
      position => {
        let coordinates: any = [];
        coordinates[0] = position.coords.longitude;
        coordinates[1] = position.coords.latitude;

        let userA  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];
        console.log(userA?.id)
        if(userA?.id){
            const locVal = {latitude:position.coords.latitude,longitude:position.coords.longitude}
            sendLoaction(locVal,userA.id);
        }
        console.warn(Platform.OS,"App Position tracking",coordinates)
      },
      error => {
        console.log('maperror in getting location', error.code, error.message);

      },

      
      { maximumAge:60000,enableHighAccuracy: true, distanceFilter: 0,interval:900000,forceLocationManager: true },
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
            
              console.log(user_id)
              console.log(postData)
              const listData = await fetchWrapper.post(url,token,postData);
            
               
               
}
  
  return (



    <ThemeProvider storage={storage}>

        <ApplicationNavigator />
        
      </ThemeProvider>

  )
}
export default App

