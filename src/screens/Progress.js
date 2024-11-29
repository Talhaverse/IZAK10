import { useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import React from 'react'
import { fetchWrapper } from '../components/helpers'
import { MMKV } from 'react-native-mmkv'
const Progress = ({navigation,route}) => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [dataLoad,setDataLoad] = useState(false);
   const storage = new MMKV({
      id: `izak-10`,
      
    })
     useEffect(() => {
       
        loadList();
      }, [route]);

     let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];
const loadList = async() => {
      
     
     
      
      const API_URL2 = process.env.API_URL
      const url = `${API_URL2}/customer/user-progress?user_id=${user.id}`;
    
      const token = ""
      setLoading(true)
      const listData = await fetchWrapper.get(url,token);
      
      
       
          setData(listData);
      
       
      setLoading(false)

       setDataLoad(true)
       
      
      
    

  }

  return (
     <View style={{margin:10}}>
    <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:22}}>Progress</Text>

     {dataLoad &&
     <>
        <View>
            <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:18}}>Cases</Text>

            <View style={{flexDirection:'row'}}>
                <View style={{width:'33%',backgroundColor:'#008B8B'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Total</Text>
                    
                </View>
                <View style={{width:'33%',backgroundColor:'#008B8B'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Pending</Text>
                    
                </View>
                <View style={{width:'33%',backgroundColor:'#008B8B'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Completed</Text>
                    
                </View>
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={{width:'33%',backgroundColor:'#fff'}}>
                    
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18,textAlign:'center'}}>{Math.abs(data?.cases[0]?.pending || 0) + Math.abs(data?.cases[0]?.complete || 0)}</Text>
                </View>
                <View style={{width:'33%',backgroundColor:'#fff'}}>
                    
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18,textAlign:'center'}}>{data?.cases[0]?.pending}</Text>
                </View>
                <View style={{width:'33%',backgroundColor:'#fff'}}>
                   
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18,textAlign:'center'}}>{data?.cases[0]?.complete}</Text>
                </View>
            </View>
        </View>
        <View style={{marginTop:10}}>
            <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:18}}>By Product Type</Text>

            <View style={{flexDirection:'row'}}>
              <View style={{width:'25%',backgroundColor:'#008B8B'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Product Type</Text>
                    
                </View>
                <View style={{width:'25%',backgroundColor:'#008B8B'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Total</Text>
                    
                </View>
                <View style={{width:'25%',backgroundColor:'#008B8B'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Pending</Text>
                    
                </View>
                <View style={{width:'25%',backgroundColor:'#008B8B'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Completed</Text>
                    
                </View>
            </View>
            {data?.product_type?.map(rs => {



                return (

                  <View style={{flexDirection:'row',borderBottomWidth:2,borderColor:'#ccc'}}>
                <View style={{width:'25%',backgroundColor:'#fff'}}>
                    
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18,textAlign:'center'}}>{rs.product_type}</Text>
                </View>
                <View style={{width:'25%',backgroundColor:'#fff'}}>
                    
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18,textAlign:'center'}}>{Math.abs(rs.pending) + Math.abs(rs?.complete)}</Text>
                </View>
                <View style={{width:'25%',backgroundColor:'#fff'}}>
                    
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18,textAlign:'center'}}>{rs?.pending}</Text>
                </View>
                <View style={{width:'25%',backgroundColor:'#fff'}}>
                   
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18,textAlign:'center'}}>{rs?.complete}</Text>
                </View>
            </View>

                  )

            })}
            

        </View>

        <View style={{marginTop:10}}>
            <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:18}}>By Bucket</Text>


            <View style={{flexDirection:'row'}}>
              <View style={{width:'25%',backgroundColor:'#008B8B'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Bucket</Text>
                    
                </View>
                <View style={{width:'25%',backgroundColor:'#008B8B'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Total</Text>
                    
                </View>
                <View style={{width:'25%',backgroundColor:'#008B8B'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Pending</Text>
                    
                </View>
                <View style={{width:'25%',backgroundColor:'#008B8B'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Completed</Text>
                    
                </View>
            </View>
            {data?.bucket_list?.map(rs => {



                return (

                  <View style={{flexDirection:'row',borderBottomWidth:2,borderColor:'#ccc'}}>
                <View style={{width:'25%',backgroundColor:'#fff'}}>
                    
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18,textAlign:'center'}}>{rs.bucket_name}</Text>
                </View>
                <View style={{width:'25%',backgroundColor:'#fff'}}>
                    
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18,textAlign:'center'}}>{Math.abs(rs.pending) + Math.abs(rs?.complete)}</Text>
                </View>
                <View style={{width:'25%',backgroundColor:'#fff'}}>
                    
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18,textAlign:'center'}}>{rs.pending}</Text>
                </View>
                <View style={{width:'25%',backgroundColor:'#fff'}}>
                   
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18,textAlign:'center'}}>{rs.complete}</Text>
                </View>
            </View>

                  )

            })}
        </View>
        </>
      }
    </View>
  )
}

export default Progress