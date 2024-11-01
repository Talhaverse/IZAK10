
import {useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome5';
import  moment from 'moment'
import {SheetManager} from 'react-native-actions-sheet';
import { fetchWrapper } from '../../components/helpers'
import CustomerCard from './CustomerCard';
const SubBucket = ({user,meChangeBucket,bucketTitle,bucketValue,navigation,type,mode,route,bucketBreakUp}) => {
		const [loading,setLoading] = useState(false);
		const [data,setData] = useState(false);

		useEffect(() => {
    navigation.addListener('focus', () => {
     
      
        
        loaddPick()
      
      
    });
  }, [route]);

	   useEffect(() => {
       
        loaddPick();
      }, [bucketValue]);
	
	  const loaddPick = async() => {
      
     
     if(bucketValue != 0){
      
      const API_URL2 = process.env.API_URL
      const url = `${API_URL2}/sub-bucket/pick?subbucket_id=${bucketValue}&user_id=${user.id}&&expand=customer,user,form,submission,outcome`;
      console.log(url)
      const token = ""
      setLoading(true)
      const listData = await fetchWrapper.get(url,token);
      
        console.log(listData)
        if(listData.data){

          setData(listData);
        }else{
        	setData(false)
        }
      
       
      setLoading(false)

      
       
      
      }
    

  }
	return (

		<View style={{margin:10}}>

			<Text style={{color:'#008B8B',fontWeight:700,fontSize:18}}>Select Subbucket</Text>
			<TouchableOpacity style={{width:'100%',backgroundColor: '#008B8B',borderRadius: 5,paddingHorizontal: 8,paddingVertical: 5,marginRight: 10,alignItems:'center',justifyContent:'center'}}

            onPress={() => SheetManager.show('bucket-list',{payload:{meChange:meChangeBucket}})}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <Text style={{width:'85%',fontSize: 16,fontWeight: 700,color: '#fff',marginRight: 5,fontFamily:'Poppins-Regular'}}>{bucketTitle}</Text>
              <Icon name="chevron-down" color="#fff" style={{fontSize: 16,marginLeft:5}} />
            </View>
          </TouchableOpacity>
          {data &&
          <View style={{margin:5,marginTop:10}}>
          	<Text style={{color:'#008B8B',fontWeight:700,fontSize:18}}>Allocation Breakup</Text>
          	 <View style={{flexDirection:'row',borderWidth:1,justifyContent:'center',alignItems:'center',borderColor:'#008B8B'}}>
              <View style={{width:'34%',backgroundColor:'#008B8B'}}><Text style={{color:'#fff',fontWeight:700,fontSize:16,textAlign:'center'}}>Pending</Text></View>
              <View style={{width:'33%',backgroundColor:'#008B8B'}}><Text style={{color:'#fff',fontWeight:700,fontSize:16,textAlign:'center'}}>Picked</Text></View>
              <View style={{width:'33%',backgroundColor:'#008B8B'}}><Text style={{color:'#fff',fontWeight:700,fontSize:16,textAlign:'center'}}>Completed</Text></View>

            </View>
	           <View style={{flexDirection:'row',borderWidth:1,justifyContent:'center',alignItems:'center',borderColor:'#008B8B'}}>
	              <View style={{width:'34%',backgroundColor:'#fff'}}><Text style={{color:'#008B8B',fontWeight:700,fontSize:16,textAlign:'center'}}>{bucketBreakUp?.pending}</Text></View>
	              <View style={{width:'33%',backgroundColor:'#fff'}}><Text style={{color:'#008B8B',fontWeight:700,fontSize:16,textAlign:'center'}}>{bucketBreakUp?.picked}</Text></View>
	              <View style={{width:'33%',backgroundColor:'#fff'}}><Text style={{color:'#008B8B',fontWeight:700,fontSize:16,textAlign:'center'}}>{bucketBreakUp?.completed}</Text></View>

	            </View>
	          <Text style={{color:'#008B8B',fontWeight:700,fontSize:18,marginTop:10}}>Your Current Case</Text>
         	 <CustomerCard type={type} mode={mode}  data={data.data} navigation={navigation} />
      	  </View>
      	}
		</View>
	)
}
export default SubBucket;