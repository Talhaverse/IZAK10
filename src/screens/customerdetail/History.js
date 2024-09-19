import React, { Component,useEffect,useState } from 'react';

import { Dimensions, StyleSheet,Button,View,Text,ScrollView } from 'react-native';
import { fetchWrapper } from '../../components/helpers';
import SubmissionData from './SubmissionData'
const History = ({data}) => {
  const dataCust = data;
  const API_URL2 = process.env.API_URL
  const [loading,setLoading] = useState(false);
  const [list,setList] = useState([]);
   useEffect(() => {
       
        //loadList()
     loadActionList()
       
        
        
    }, []);

   const loadActionList = async () => {
      
      const url = `${API_URL2}/customer/action-list?customer_id=${dataCust.customer.id}&expand=actionType,formType,assignTask,outcome`;
      
      setLoading(true)
    
      const data  = await fetchWrapper.get(url)
      setLoading(false)
      

     console.log(data)
      setList(data)
      
        
  }

	return (


          <ScrollView>

              <Text style={{color:'#008B8B',fontSize:18,fontWeight:'bold'}}>History</Text>

              {list?.map((item,index) => {


                  return (
                  <View style={{borderBottomWidth:1,paddingBottom:10}}>
                    <Text style={{color:'#000',textAlign:'center',fontSize:20,fontWeight:'bold'}}>Action ID {item.id}</Text>
                    <View style={styles.box}>

                          <View style={styles.value}>
                              <Text style={styles.textValue}>Tag</Text>
                          </View>
                          <View style={styles.heading}>
                              <Text style={styles.textHeading}>{item?.assignTask?.name}</Text>
                          </View>
                      </View>
                      <View style={styles.box}>

                          <View style={styles.value}>
                              <Text style={styles.textValue}>Type</Text>
                          </View>
                          <View style={styles.heading}>
                              <Text style={styles.textHeading}>{item?.formType?.name}</Text>
                          </View>
                      </View>
                      <View style={styles.box}>

                          <View style={styles.value}>
                              <Text style={styles.textValue}>Medium</Text>
                          </View>
                          <View style={styles.heading}>
                              <Text style={styles.textHeading}>{item?.actionType?.name}</Text>
                          </View>
                      </View>


                      <View style={styles.box}>

                          <View style={styles.value}>
                              <Text style={styles.textValue}>Form Data</Text>
                          </View>
                          <View style={styles.heading}>
                              <SubmissionData ref_id={item.id} form_id={item.form_id} />
                          </View>
                      </View>



                       <View style={styles.box}>

                          <View style={styles.value}>
                              <Text style={styles.textValue}>Outcome</Text>
                          </View>
                          <View style={styles.heading}>
                              <Text style={styles.textHeading}>{item?.outcome?.name}</Text>
                          </View>
                      </View>


                      <View style={styles.box}>

                          <View style={styles.value}>
                              <Text style={styles.textValue}>Date</Text>
                          </View>
                          <View style={styles.heading}>
                              <Text style={styles.textHeading}>{item.updated_at}</Text>
                          </View>
                      </View>


                      

                    </View>
                  )


              })}
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
export default History;