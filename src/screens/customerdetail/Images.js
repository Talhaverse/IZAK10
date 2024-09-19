import React, { Component,useEffect,useState } from 'react';

import { Dimensions, StyleSheet,Button,View,Text,ScrollView,Image } from 'react-native';
import { fetchWrapper } from '../../components/helpers';

const Images = ({data}) => {
  const dataCust = data;
  const API_URL2 = process.env.API_URL
  const [loading,setLoading] = useState(false);
  const [list,setList] = useState([]);
   useEffect(() => {
       
        //loadList()
     loadActionList()
       
        
        
    }, []);

   const loadActionList = async () => {
      
      const url = `${API_URL2}/customer/images-data?customer_id=${dataCust.customer.id}`;
    
      setLoading(true)
    
      const data  = await fetchWrapper.get(url)
      setLoading(false)
      

     console.log(data)
      setList(data)
      
        
  }

	return (


          <ScrollView>

              <Text style={{color:'#008B8B',fontSize:18,fontWeight:'bold'}}>Supporting Images</Text>
              <View style={styles.box}>
              {list?.map((item,index) => {


                  return (
                  <View  style={{margin:10}}>
                    
                    
                      <Image source={{uri:item.url}} style={{width:100,height:100}} />
                          

                    </View>
                  )


              })}
              </View>
          </ScrollView>

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
export default Images;