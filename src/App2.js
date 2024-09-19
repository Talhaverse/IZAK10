import React,{useState,useEffect} from 'react'
import 'react-native-gesture-handler';
import { ThemeProvider } from '@/theme';
import ApplicationNavigator from './navigators/Application';
export const storage = new MMKV();
import { fetchWrapper } from './components/helpers';
import  {useInterval} from './components/helpers/useInterval';
import RNShake from 'react-native-shake';
import { MMKV } from 'react-native-mmkv'
import { PermissionsAndroid, Linking,StyleSheet,View,Text } from 'react-native';
import GetLocation from 'react-native-get-location'

import Geolocation from 'react-native-geolocation-service';
//import ReactNativeForegroundService from "@supersami/rn-foreground-service";
//import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from 'react-native-background-timer';
function App() {

	 const API_URL2 = process.env.API_URL
	const storage = new MMKV({
      id: `izak-10`,
      
    })
   let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];
    const [locationVal, setLocationVal] = useState({});




// BackgroundTimer.runBackgroundTimer(() => { 
// //code that will be called every 3 seconds 
//    trackLocation()
// }, 
// 5000);
// useInterval(() => {

       
       
//             trackLocation()
         
        
//          //scrollViewRef.current.scrollToEnd({ animated: true })
//       }, 900000); //900000
const trackLocation = async () => {
    console.log("Track Location")
    await requestLocationPermission()

    
            const location = await getLocation();
            if(location){
              sendLoaction(location);
            }
            
            
        
}

 const getLocation = () => {

       // return GetLocation.getCurrentPosition({
       //  enableHighAccuracy: true,
       //  timeout: 60000,
       //  })
       //  .then(location => {
       //      return {latitude:location.latitude,longitude:location.longitude}
       //  })
       //  .catch(error => {

       //    return false;
       //      const { code, message } = error;
       //      console.warn(code, message);
       //  })
  }
	// React.useEffect(() => {


	// 	//request the permission before starting the service.
	// //	requestBgPermission()
	// 	//requestLocationPermission();


	
		
  //   //updateforeground();
  //   //Notification()
  //  // startTracking();



  //   const subscription = RNShake.addListener(() => {
  //     const location  = getLocation();
  //     if(location){
  //       sendSos(location);
  //     }
      
  //   	// GetLocation.getCurrentPosition({
	//     //     enableHighAccuracy: true,
	//     //     timeout: 600000,
	//     //     rationale: {
	// 	  //       title: 'Location permission',
	// 	  //       message: 'The app needs the permission to request your location.',
	// 	  //       buttonPositive: 'Ok',
	// 	  //     },
	// 	  //   })
	// 	  //   .then(location => {
	// 	  //       sendSos({latitude:location.latitude,longitude:location.longitude});
	// 	  //       setLocationVal({latitude:location.latitude,longitude:location.longitude})
	// 	  //   })
	// 	  //   .catch(error => {
		    		 
	// 	  //   		Linking.openSettings();
	// 	  //       const { code, message } = error;
		       
	// 	  //       console.warn(code, message);
	// 	  //   })
    	
    	
  //     // Your code here...
  //   })

  //   return () => {
  //   	//console.log("ddd0000")
  //     // Your code here...
  //     subscription.remove()
  //   }
  // }, [])


// const updateforeground =()=>{
//     ReactNativeForegroundService.add_task(() => startTracking(), {
//       delay: 600000,
//       onLoop: true,
//       taskId: "taskid2",
//       onError: (e) => console.log(`Error logging:`, e),
//     });
//   }
//   const Notification =()=>{

//     ReactNativeForegroundService.start({
//       id: 1244,
//       title: 'Location Tracking',
//       message: 'Location Tracking',
//       icon: 'ic_launcher',
//       button: false,
//       button2: false,
//       // buttonText: "Button",
//       // button2Text: "Anther Button",
//       // buttonOnPress: "cray",
//       setOnlyAlertOnce: true,
//       color: '#000000',
//     });
//     startTracking()
//   }

  // const startTracking = async () => {
  //  let s= Geolocation.requestAuthorization('always');

  //   Geolocation.watchPosition(
  //     position => {
  //       let coordinates: any = [];
        
  //       coordinates[0] = position.coords.longitude;
  //       coordinates[1] = position.coords.latitude;
        
  //       sendLoaction({latitude:position.coords.longitude,longitude:position.coords.latitude});
  //       //console.warn(Platform.OS,"App Position tracking",coordinates)
  //     },
  //     error => {
  //       console.log("error")
  //       console.log('maperror in getting location', error.code, error.message);

  //     },

      
  //     { enableHighAccuracy: true, distanceFilter: 0 },
  //   );
  // };
// const requestBgPermission = async () => {
// 	const backgroundgranted = await PermissionsAndroid.request(
//   PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//   {
//     title: 'Background Location Permission',
//     message:
//       'We need access to your location ' +
//       'so you can get live quality updates.',
//     buttonNeutral: 'Ask Me Later',
//     buttonNegative: 'Cancel',
//     buttonPositive: 'OK',
//   },
// );
// if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
//   //do your thing!
// }
// }

// const requestLocationPermission = async () => {
//     Geolocation.requestAuthorization('always')
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message: 'App needs access to your location. all',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );

//       console.log(PermissionsAndroid.RESULTS.GRANTED)
//       console.log(granted)
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('1Location permission granted');
//       } else {
//         console.log('Location permission denied');
//       }
//       PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//         {
//           title: 'Background Location Permission',
//           message:
//             'We need access to your location ' +
//             'so you can get live quality updates.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       ); 
//     } catch (err) {
//       console.log(err);
//     }
//   }



const sendLoaction = async (location) => {
	const url = `${API_URL2}/user/location`;
  
			    	 const token = ""
			    	 const postData = {
			    	 	user_id:user.id,
			    	 	location:location,
              event_id:0,
			    	 }
			    	if(user){
              console.log(user.id)
              console.log(postData)
              const listData = await fetchWrapper.post(url,token,postData);
            }
				    	 
				    	 
}
	const sendSos = async(location) => {

	const url = `${API_URL2}/user/sos`;
    	 const token = ""
    	 const postData = {
    	 	user_id:user.id,
    	 	location:location
    	 }
    	 
	    	 const listData = await fetchWrapper.post(url,token,postData);
	    	 console.log("done")
	}




  
  
    return (
			<ThemeProvider storage={storage}>

				<ApplicationNavigator />
        
			</ThemeProvider>
		);
}

export default App;
