import React, { Component,useEffect,useState } from 'react';

import { Dimensions, StyleSheet,Button,View,Text,ScrollView } from 'react-native';
import { fetchWrapper } from '../../components/helpers';
const SubmissionData = ({ref_id,form_id}) => {
  
  const API_URL2 = process.env.API_URL
  const [loading,setLoading] = useState(false);
  const [list,setList] = useState({});
   useEffect(() => {
       
        //loadList()
     loadActionList()
       
        
        
    }, []);

   const loadActionList = async () => {
      
      const url = `${API_URL2}/customer/submisison-data?ref_id=${ref_id}&form_id=${form_id}`;
     
      setLoading(true)
    
      const data  = await fetchWrapper.get(url)
      setLoading(false)
      

    
      setList(JSON.parse(data.data))
      
        
  }

	return (

         Object.entries(list).map(([key, value]) => (
          <View>
          <Text key={key} style={{color:'#fff',fontWeight:'bold'}}>{key}: </Text>
          <Text key={key} style={{color:'#fff'}}>{value}</Text>
          </View>
          ))
         

		)
}

const styles = StyleSheet.create({
  box: {
        display:'flex',width:'100%',flexDirection:'row',marginTop:10
    },
   heading: {
        width:'65%',backgroundColor:'#008B8B',padding:10
    },

    value: {
        width:'35%'
    },

    textHeading: {
        color:'#fff',fontSize:15,
    },

    textValue: {
        color:'#000',fontSize:15,fontWeight:'bold'
    },
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
export default SubmissionData;