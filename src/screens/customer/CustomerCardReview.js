
import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { MMKV } from 'react-native-mmkv'
import  moment from 'moment'
const CustomerCardReview = ({data,navigation,type,mode,date,dateTo,statusValue}) => {

	 const storage = new MMKV({
      id: `izak-10`,
      
    })
	let customerStorage  = storage.getString('customer') ? JSON.parse(storage.getString('customer')) : [];


	const checkData = customerStorage.filter(rss => rss.id == data.id);
	
	
	const detail = () => {
		if(type == 'view'){
			navigation.navigate('view-form',{data:data,type:type,mode:mode,date:date,dateTo:dateTo,statusValue:statusValue})
		}else if(type == 'view-user'){
			navigation.navigate('view-form-user',{data:data,type:type,mode:mode,date:date,dateTo:dateTo,statusValue:statusValue})

		}else{
			navigation.navigate('CustomersDetail',{data:data,type:type,mode:mode})
		}
	}
	
	return (

		<TouchableOpacity style={{borderBottomWidth:1,borderColor:'#10cdcd',backgroundColor:'#c7ecec',borderRadius:6,marginBottom:10}}

			onPress={() => detail()}
		>

			<View style={{display:'flex',width:'100%',flexDirection:'row'}}>
				
				<View style={{width:'100%',padding:10}}>
					
						<View style={{flexDirection:'row'}}>
							<View style={{width:'50%'}}>
								<Text style={{color:'#000',fontWeight:'bold',fontSize:20}}>{data.customer.customer_name}</Text>
							</View>

							<View style={{width:'50%'}}>
								<Text style={{color:'#000',fontWeight:'bold',fontSize:15,textAlign:'right'}}>TID: {data.customer.tracking_id}</Text>
								<Text style={{color:'#000',fontWeight:'bold',fontSize:15,textAlign:'right'}}>Action ID: {data.id}</Text>
							</View>
						</View>


						
						   
						<Text style={{color:'#000',fontWeight:'bold',fontSize:14}}>Addr: {data.customer.address}</Text>
						
						
						<Text style={{color:'#000',fontWeight:'bold',fontSize:14}}>User: {data?.user?.full_name}</Text>
						<Text style={{color:'#000',fontWeight:'bold',fontSize:14}}>Completed at: {moment(data?.completed_at).format('DD MMM YYYY hh:mm')}</Text>
						<Text style={{color:'#000',fontWeight:'bold',fontSize:14}}>Outcome: {data?.outcome?.name}</Text>
						
				</View>
				
			</View>
		</TouchableOpacity>
	)
}
export default CustomerCardReview;