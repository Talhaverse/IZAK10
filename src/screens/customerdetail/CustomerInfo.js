import { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,ScrollView,StyleSheet } from 'react-native'
import { MMKV } from 'react-native-mmkv';
import { fetchWrapper } from '../../components/helpers';

const CustomerInfo = ({data,mode}) => {
	const [showMore, setShowMore] = useState(false); // State to toggle view
	const [company,setCompany] = useState([]);
	const [product,setProduct] = useState([]);
	useEffect(() => {
       
       loadCompanyList(data);
       loadProductList()
      }, []);

	const loadCompanyList = async (data) => {
        
           const API_URL2 = process.env.API_URL
            const url = `${API_URL2}/customer/company-list`;
            
           
        
            const test  = await fetchWrapper.get(url)
            setCompany(test)
        
       
           
        
    }

    const loadProductList = async () => {
        
           const API_URL2 = process.env.API_URL
            const url = `${API_URL2}/customer/product-list`;
            
           
        
            const test  = await fetchWrapper.get(url)
            setProduct(test)
            // console.log(test)
        
       
           
        
    }
	
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
	const metaData = JSON.parse(data.customer.meta_data);

	
	return (
		<View style={{marginTop:10}}>
			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>ID</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.id}</Text>
				</View>
			</View>


			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Customer T-ID</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.tracking_id}</Text>
				</View>
			</View>

			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Company Name</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{company.find(rs => rs.id === data?.customer?.company_id)?.name || data?.customer?.company_id}</Text>
				</View>
			</View>


			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Customer Name</Text>
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
					<Text style={styles.textValue}>Cycle Day</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.cycle_day}</Text>
				</View>
			</View>

			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Balance</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.balance}</Text>
				</View>
			</View>

			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Due Date</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.due_date}</Text>
				</View>
			</View>

			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Dpd Counter</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.dpd_counter}</Text>
				</View>
			</View>


			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Product Type</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{product.find(rs => rs.id === data?.customer?.product_type_id)?.name || data?.customer?.product_type_id}</Text>
				</View>
			</View>

			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Last payment Date</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.last_payment_date}</Text>
				</View>
			</View>
			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Last payment Amount</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.last_payment_amount}</Text>
				</View>
			</View>


			


			

			{showMore && (
                <>
                

			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Mobile no</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.mobile}</Text>
				</View>
			</View>

			<View style={styles.box}>
				<View style={styles.value}>
					<Text style={styles.textValue}>Email</Text>
				</View>

				<View style={styles.heading}>
					<Text style={styles.textHeading}>{data.customer.email}</Text>
				</View>
			</View>

			{Object.entries(metaData).map(([key, value], index) => (
	            <View style={styles.box} key={index}>
	                <View style={styles.value}>
	                    <Text style={styles.textValue}>{key.replace(/_/g, ' ')}</Text>
	                </View>
	                <View style={styles.heading}>
	                    <Text style={styles.textHeading}>{value}</Text>
	                </View>
	            </View>
	        ))}

			

			
			</>
			)}

			<TouchableOpacity onPress={() => setShowMore(!showMore)}>
                <Text style={styles.toggleButton}>{showMore ? 'See Less' : 'See More'}</Text>
            </TouchableOpacity>

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
        toggleButton: {
        color: '#008B8B',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        padding: 5,
        fontWeight: 'bold',
    },
       

 })