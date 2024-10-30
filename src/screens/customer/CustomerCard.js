
import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { MMKV } from 'react-native-mmkv'
import  moment from 'moment'
const CustomerCard = ({data,navigation,type,mode}) => {

	 const storage = new MMKV({
      id: `izak-10`,
      
    })
	let customerStorage  = storage.getString('customer') ? JSON.parse(storage.getString('customer')) : [];


	const checkData = customerStorage.filter(rss => rss.id == data.id);
	
	
	const detail = () => {
		if(type == 'view'){
			navigation.navigate('view-form',{data:data,type:type,mode:mode})
		}else{
			navigation.navigate('CustomersDetail',{data:data,type:type,mode:mode})
		}
	}
	
	return (

		<TouchableOpacity style={{borderBottomWidth:1,borderColor:'#10cdcd',backgroundColor:'#c7ecec',borderRadius:6,marginBottom:10,margin:10}}

			onPress={() => detail()}
		>
			<View style={{display:'flex',width:'100%',flexDirection:'row'}}>
				
				<View style={{width:'100%',padding:10}}>
						<View style={{flexDirection:'row'}}>
						{checkData[0] &&
							<FontAwesome5 name="cloud-download-alt" style={{fontSize: 20,color: 'blue',textAlign:'left',marginRight:10}} />

						}
						{checkData[0]?.offline &&
							<FontAwesome5 name="save" style={{fontSize: 20,color: 'blue',textAlign:'left'}} />
						}
						
						</View>
						
						<Text style={{color:'#008B8B',fontWeight:'bold',fontSize:20}}>{data.customer.customer_name}</Text>
						<Text style={{color:'black',fontWeight:'bold',fontSize:14}}>Addr: {data.customer.address}</Text>
						<Text style={{color:'black',fontWeight:'bold',fontSize:14}}>TID: {data.customer.tracking_id}</Text>
						
						
				</View>
				
			</View>
		</TouchableOpacity>
	)
}
export default CustomerCard;