import { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,ScrollView,BackHandler } from 'react-native'
import React from 'react'
import { fetchWrapper } from '../components/helpers';
import CustomerInfo from './customerdetail/CustomerInfo';
import CustomerForm from './customerdetail/CustomerForm';
import Direction from './customerdetail/Direction';
import History from './customerdetail/History';
import Images from './customerdetail/Images';
import { MMKV } from 'react-native-mmkv'
const CustomersDetail = ({route,navigation}) => {
    const [page, setPage] = useState('');
     const [linkPage, setLinkPage] = useState('');
 

    const data = route.params.data
    const type = route.params.type;
    const mode = route.params.mode
   useEffect(() => {
         loadPage('info');

         const backAction = () => {

         navigation.navigate('Customers',{type:type,id:Math.random()})
     
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();


      }, []);

   const loadPage = (page) => {
      setLinkPage(page)
      if(page == 'info'){
         
          setPage(<CustomerInfo data={data} mode={mode} />)
      }

      if(page == 'form'){
         
          setPage(<CustomerForm mode={mode} type={type} data={data} navigation={navigation} />)
      }

      if(page == 'pic'){
         
          setPage(<Images type={type} mode={mode} data={data} navigation={navigation} />)
      }

      if(page == 'history'){
         
          setPage(<History type={type} mode={mode} data={data} navigation={navigation} />)
      }

      if(page == 'direction'){
         
          setPage(<Direction mode={mode} data={data} />)
      }
   }
 
  return (
    <ScrollView style={{position:'relative'}}>
      <View  style={{margin:20}}>
        <View style={{display:'flex',width:'100%',flexDirection:'row'}}>
          <TouchableOpacity style={{backgroundColor:linkPage == 'form' ? '#008B8B' : '#ccc',width:'50%',padding:10,marginRight:5}}
            onPress={() => loadPage('form')}
          >

              <Text style={{color:linkPage == 'form' ? '#fff' : '#000',textAlign:'center'}}>Get Form</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:linkPage == 'history' ? '#008B8B' : '#ccc',width:'50%',padding:10}}

             onPress={() => loadPage('history')}
          >

              <Text style={{color:linkPage == 'history' ? '#fff' : '#000',textAlign:'center'}}>Get History</Text>
          </TouchableOpacity>
          
        </View>
        <View style={{display:'flex',width:'100%',flexDirection:'row',marginTop:10}}>
          <TouchableOpacity 
            onPress={() => loadPage('direction')}
          style={{backgroundColor:linkPage == 'direction' ? '#008B8B' : '#ccc',width:'50%',padding:10,marginRight:5}}>

              <Text style={{color:linkPage == 'direction' ? '#fff' : '#000',textAlign:'center'}}>Get Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:linkPage == 'pic' ? '#008B8B' : '#ccc',width:'50%',padding:10}}

               onPress={() => loadPage('pic')}
          >

              <Text style={{color:linkPage == 'pic' ? '#fff' : '#000',textAlign:'center'}}>Supporting Pic</Text>
          </TouchableOpacity>
          
        </View>
       
       
           {page}
          
         </View>
    </ScrollView>
  )
}

export default CustomersDetail