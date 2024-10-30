import React,{useState,useEffect} from 'react';
import { View, Text,TouchableOpacity,ScrollView,StyleSheet,TextInput,Button, Alert,Image,ActivityIndicator  } from 'react-native'
import { useForm, Controller } from "react-hook-form"
import DropDown from './DropDown'
import CameraRoll from '../../components/camera/CameraRoll';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fetchWrapper } from '../../components/helpers';
import { MMKV } from 'react-native-mmkv'
import GetLocation from 'react-native-get-location'
// import axios  from 'axios';
// import fs from 'fs';
const CustomerFormView = ({data,navigation,type,mode}) => {
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

  

 

  
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'},
        {label: 'Pear', value: 'pear'},
    ]);


  const [example, setExample] = useState();

 

  if (example) {
    return example;
  }

  const onBack = () => setExample(undefined);

  const removeImage = (itemx,index) => {

      setImageVal((state) => state.filter((item) => item.id !== itemx.id))
  }


  const removeContact = (itemx,index) => {
      
      setContactList((state) => state.filter((item) => item.id !== itemx.id))
  }

  const saveImage = async(data) => {
      const location = await getLocation();

      setLocationVal([...locationVal, location])
      
  }

  const getLocation = () => {

       return GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
        })
        .then(location => {
            return {latitude:location.latitude,longitude:location.longitude}
        })
        .catch(error => {

          return false;
            const { code, message } = error;
            console.warn(code, message);
        })
  }
  

  const addContact = () => {

       const contact = {value:'',id:Math.random()}
       setContactList([...contactList, contact])
  }


  const handleInputChange = (index, text) => {
      const newInputs = [...contactList];
      newInputs[index].value = text;
      setContactList(newInputs);
};


	const formData = {"components": data.form.data.components};
	return (
		<>
    {loading && 
        <View style={styles.loading}>
          <ActivityIndicator color="#fff" size='large' />
        </View>
        }
		<View style={{marginTop:10}}>
			<Text style={{color:'#008B8B',fontWeight:'bold',fontSize:18}}>
     
      Form: {data?.form?.name}


      </Text>

			
      
				{Object.entries(data?.submission?.data).map(([key,value]) => {

         
						return (

							<View style={{borderBottomWidth:1,borderColor:'#008B8B',marginBottom:20}}>

							     <Text style={{fontWeight:'bold',fontSize:15,color:'#008B8B'}}>{key}</Text>
                   <Text style={{fontWeight:'bold',fontSize:15,color:'#999'}}>{value}</Text>
		
	 
  
      
								
							</View>	
						)

          

				})}
       

      

     
       
		</View>
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