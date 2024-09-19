
import { View, Text,TouchableOpacity,ScrollView,StyleSheet } from 'react-native'
import { MMKV } from 'react-native-mmkv'
const CustomerInfo = ({data,mode}) => {
	
	 const storage = new MMKV({
      id: `izak-10`,
      
    })

	 //storage.delete('customer');
	  let customer  = storage.getString('customer') ? JSON.parse(storage.getString('customer')) : [];

	  //const checkData = customer.filter(rss => rss.id == data.id);
	  // if(checkData.length == 0){


	  // 	customer.push(data);
	// 	storage.set('customer', JSON.stringify(customer));
		
		

	  // }
	  
	
	return (
		<View style={{marginTop:10}}>
			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>ID</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.id}</Text>
				</View>
			</View>


			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Customer T-ID</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.id}</Text>
				</View>
			</View>


			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Name</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.customer_name}</Text>
				</View>
			</View>


			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Address</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.address}</Text>
				</View>
			</View>


			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Company Name</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.address}</Text>
				</View>
			</View>

		</View>
	)
}
export default CustomerInfo;
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
       

 })