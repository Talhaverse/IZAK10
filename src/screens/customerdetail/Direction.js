import React, { Component,useEffect,useState } from 'react';

import { Dimensions, StyleSheet,Button } from 'react-native';
import getDirections from 'react-native-google-maps-directions'
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';




const Direction = (data) => {



Geocoder.init("AIzaSyBfHI3MbKjzJ1GJZvUQ8FbKMyfkI4xtMfo");



handleGetDirections =  () => {
    

    

     GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })
    .then(async location => {



       const targetLoc =  await Geocoder.from(data.data.customer.address)
    .then(json => {
      var location = json.results[0].geometry.location;
      
      return location
    })
    .catch(error => console.warn(error));
       
      //24.9930, 67.0651
      //24.9484, 67.0599
        const dataLoc = {
             source: {
              latitude: 24.9930,//location.latitude,
              longitude: 67.0651,//location.longitude
            },
            destination: {
              latitude: targetLoc.lat,
              longitude: targetLoc.lng
            },
            params: [
              {
                key: "travelmode",
                value: "driving"        // may be "walking", "bicycling" or "transit" as well
              },
              {
                key: "dir_action",
                value: "navigate"       // this instantly initializes navigation using the given travel mode
              }
            ],
            
          }

         // console.log(dataLoc)
       getDirections(dataLoc)

        
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
 
    
  }

  useEffect(() => {
         

    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })
    .then(location => {
        console.log(location);
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })


      }, []);

	return (


<Button onPress={this.handleGetDirections} title="Get Directions" />

		)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  searchContainer: {
    zIndex: 1,
    flex: 0.5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
export default Direction;