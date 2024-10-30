import React,{useState,useEffect} from 'react';
import { View, Text,TouchableOpacity,ScrollView,StyleSheet,TextInput,Button, Alert,Image,ActivityIndicator  } from 'react-native'
import { useForm, Controller } from "react-hook-form"
import Images from './customerdetail/Images'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fetchWrapper } from '../components/helpers';
import { MMKV } from 'react-native-mmkv'
import  moment from 'moment'
// import axios  from 'axios';
// import fs from 'fs';
const CustomerFormView = ({route,navigation}) => {

  const data = route.params.data
    const type = route.params.type;
    const mode = route.params.mode

    const date = route.params.date
    const dateTo = route.params.dateTo
    const statusValue = route.params.statusValue
  const [outComeList, setOutComeList] = useState([]);

   const [imageVal, setImageVal] = useState([]);
   const [locationVal, setLocationVal] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [loading,setLoading] = useState(false);
   const API_URL2 = process.env.API_URL
	 const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    
  })

  const dataCust = data;

  const storage = new MMKV({
      id: `izak-10`,
      
    })
     
     let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];

  

 



  const [example, setExample] = useState();

 

  if (example) {
    return example;
  }

  const onBack = () => setExample(undefined);


 



  const handleInputChange = (index, text) => {
      const newInputs = [...contactList];
      newInputs[index].value = text;
      setContactList(newInputs);
};


const approved = async () => {
  const API_URL2 = process.env.API_URL
    const url = `${API_URL2}/customer/approve-allocation`;
     console.log(url)
     const token = ""
      setLoading(true)
      const postData = {
          user_id:user.id,
          allocation_id:data.id,
          status_id: 100
      }
      const listData = await fetchWrapper.post(url,token,postData);
      navigation.navigate('ReviewForm',{date:date,dateTo:dateTo,statusValue:statusValue})
}
const rejected = async() => {
  const API_URL2 = process.env.API_URL
    const url = `${API_URL2}/customer/approve-allocation`;
     console.log(url)
     const token = ""
      setLoading(true)
      const postData = {
          user_id:user.id,
          allocation_id:data.id,
          status_id: 20
      }
      const listData = await fetchWrapper.post(url,token,postData);
     navigation.navigate('ReviewForm',{date:date,dateTo:dateTo,statusValue:statusValue})
}

	return (
		<>
    {loading && 
        <View style={styles.loading}>
          <ActivityIndicator color="#fff" size='large' />
        </View>
        }
    <ScrollView>
		<View style={{margin:10}}>
      <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:22}}>Review Forms</Text>

      <View style={{backgroundColor:'#008B8B',padding:10,borderRadius:6,marginBottom:10}}>

            
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:18,marginBottom:5}}>Customer Name: {data.customer.customer_name}</Text>
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:16,marginBottom:5}}>Addr: {data.customer.address}</Text>
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:16,marginBottom:5}}>TID: {data.customer.tracking_id}, User: {data.user.full_name}</Text>
            
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:16,marginBottom:5}}>Completed at: {moment(data?.completed_at).format('DD MMM YYYY hh:mm')}</Text>
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:18,marginBottom:5}}>Outcome: {data?.outcome?.name}</Text>
      </View>
			<Text style={{color:'#008B8B',fontWeight:'bold',fontSize:18}}>
     
      Form: {data.form.name}


      </Text>

			
      
				{Object.entries(data.submission.data).map(([key,value]) => {

         
						return (

							<View style={{borderBottomWidth:1,borderColor:'#008B8B',marginBottom:20}}>

							     <Text style={{fontWeight:'bold',fontSize:14,color:'#999'}}>{key === 'outcome_id' ? "Out Come" : key}</Text>
                   <Text style={{fontWeight:'bold',fontSize:16,color:'#008B8B'}}>{key == 'outcome_id' ? data?.outcome?.name : value}</Text>
		
	 
  
      
								
							</View>	
						)

          

				})}
       

        <View>

          <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:18}}>
     
            Contact


            </Text>
        </View>

        <View>

        <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:18}}>
     
            Images


            </Text>
            <Images data={data} />
        </View>

        <View style={{flexDirection:'row',marginBottom:10}}>

        <TouchableOpacity style={{backgroundColor: '#008B8B',padding: 15,alignItems: 'center',borderRadius: 5,width:'48%',marginRight:10}} 
        onPress={() => approved()}>
                    <Text style={{color: '#fff',fontSize: 14,fontWeight: 400,textAlign: 'center'}}>Approved</Text>
                  </TouchableOpacity>

         <TouchableOpacity style={{backgroundColor: 'red',padding: 15,alignItems: 'center',borderRadius: 5,width:'50%'}} 
        onPress={() => rejected()}>
                    <Text style={{color: '#fff',fontSize: 14,fontWeight: 400,textAlign: 'center'}}>Rejected</Text>
                  </TouchableOpacity>
         
         
        </View>
       
		</View>
    </ScrollView>
		</>
	)
}
 const styles = StyleSheet.create({
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
    zIndex:2000,
    //height:Dimensions.get('window').height
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginEnd: 10,
  },
   button: {
      backgroundColor:'#008B8B',
      borderWidth:1,
      padding:10,
      borderRadius:6,
      borderColor:'#008B8B',
      width:100
   },
   buttonText: {
      color:'#fff'
   },
    box: {
        display:'flex',width:'100%',flexDirection:'row',marginTop:10
    },

    heading: {
        width:'65%',backgroundColor:'#ccc',padding:10
    },

    valueStyle: {
        width:'35%'
    }
  })
export default CustomerFormView;