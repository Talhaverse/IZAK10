import React,{useState,useEffect} from 'react';
import { View, Text,TouchableOpacity,ScrollView,StyleSheet,TextInput,Button, Alert,Image,ActivityIndicator  } from 'react-native'
import { useForm, Controller } from "react-hook-form"
import DropDown from './DropDown'
import CameraRoll from '../../components/camera/CameraRoll';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fetchWrapper } from '../../components/helpers';
import { MMKV } from 'react-native-mmkv'
import GetLocation from 'react-native-get-location'
import  moment from 'moment'
// import axios  from 'axios';
// import fs from 'fs';
import NetInfo from "@react-native-community/netinfo";
const CustomerForm = ({data,navigation,type,mode}) => {
  const [outComeList, setOutComeList] = useState([]);
const [networkState, setNetworkState] = useState(null);
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

  useEffect(() => {
       
        //loadList()

     loadOutCome()
       
        
        
    }, []);
  useEffect(() => {
    // Get the network state once
    NetInfo.fetch().then(state => {
      setNetworkState(state);
    });

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkState(state);
    });

    // Unsubscribe from network state updates
    return () => {
      unsubscribe();
    };
  }, []);

  const loadOutCome = async (type="text") => {

      let ll  = storage.getString('outcomelist') ? JSON.parse(storage.getString('outcomelist')) : [];
       const listDataFilter = ll.filter(rss => rss.company_id == data.customer.company_id);  
        console.log(listDataFilter)
       
      
      
    
      setOutComeList(listDataFilter)
      

      const locationSubmit = await getLocation();
      const urlLocation = `${API_URL2}/user/location`;
  
             const token = ""
             const postData = {
              user_id:user.id,
              location:locationSubmit,
              event_id:5,
             }
            
              const listData = await fetchWrapper.post(urlLocation,token,postData);
           
        
  }

  
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
          const dateStr = new Date();
         
            return {latitude:location.latitude,longitude:location.longitude,datetime:dateStr}
        })
        .catch(error => {

          return false;
            const { code, message } = error;
            console.warn(code, message);
        })
  }
  const onSubmit = async(data) => {


        // const saveData = {};
        // saveData.formData = data;
        // saveData.form_id = dataCust.form_id;
        // saveData.ref_id = dataCust.id
        // saveData.contactData = contactList;
        // saveData.imageData = imageVal;


        setLoading(true)
         var myHeaders = new Headers();
            myHeaders.append("Content-Type", "multipart/form-data");


             var formdata = new FormData();

             for (const file of imageVal) {
             
                
                   const ffData = {
                    uri : file.uri,
                    type: 'image/jpeg',
                    name: file.name
                   }     
                   
                  // data.append('file', fs.createReadStream('/Users/mac/Downloads/cameraFlipIcon.png'));
                formdata.append('files[]', ffData);
              }
           
           
          

         
            const locationSubmit = await getLocation();
            let dateStr = new Date();
            dateStr = moment(dateStr).format('YYYY-MM-DD HH:mm:ss');
            

             
            formdata.append("form_id",dataCust.form_id)
            formdata.append("ref_id", dataCust.id);
            formdata.append("customer_id", dataCust.customer.id);
            formdata.append("contactData",JSON.stringify(contactList));
            formdata.append("formData",JSON.stringify(data));
            formdata.append("outcome_type_id",data.outcome_id);
            formdata.append("user_id",user.id);
            formdata.append('location', JSON.stringify(locationVal));
            formdata.append('location_submit', JSON.stringify(locationSubmit));
            formdata.append('complete_date',dateStr);

            const offData = {
              form_id:dataCust.form_id,
              ref_id:dataCust.id,
              customer_id:dataCust.customer.id,
              contactData:JSON.stringify(contactList),
              formData:JSON.stringify(data),
              outcome_type_id:data.outcome_id,
              user_id:user.id,
              location: JSON.stringify(locationVal),
              location_submit: JSON.stringify(locationSubmit),
              imageVal:imageVal,
              complete_date:dateStr
            }
           
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
             // redirect: 'follow'
            };

            console.log(formdata)
            if(mode &&   networkState?.isInternetReachable){
                const url = `${API_URL2}/customer/save-form`;
           
              fetch(`${url}`, requestOptions)
              .then(response => response.json())
              .then(result => {
                 
                setLoading(false)

                  

                  let customer  = storage.getString('customer') ? JSON.parse(storage.getString('customer')) : [];
                   
                  customer = customer.filter(item => item.id !== dataCust.id);
                 
                  
                  
                  storage.set('customer', JSON.stringify(customer));
                  
                  navigation.navigate('Customers',{type:type,id:Math.random()})


              })
              .catch(error => {
                console.log(error)
                  setLoading(false)
              });

            }else{
              setLoading(false)

              let customer  = storage.getString('customer') ? JSON.parse(storage.getString('customer')) : [];

                customer.map((rss,index) => {
                      if(rss.id == dataCust.id){
                          customer[index].offline = offData
                          storage.set('customer', JSON.stringify(customer));
                      }

                })
                 navigation.navigate('Customers',{id:Math.random()})
                  // const checkData = customer.filter(rss => rss.id == dataCust.id);
                  // if(checkData){
                  //     customer[checkData[0]].offline = requestOptions
                  //     storage.set('customer', JSON.stringify(customer));
                  //      navigation.navigate('Customers',{type:type,id:Math.random()})
                  // }else{
                  //   alert("error")
                  // }
                  
                 // customer.filter((rs,index) => {

                 //        if(rs.id == dataCust.id){
                 //           customer[index].offline = requestOptions
                 //           storage.set('customer', JSON.stringify(customer));
                 //           navigation.navigate('Customers',{type:type,id:Math.random()})
                 //        }else{
                 //          alert("error")
                 //        }
                 //  });

              
            }
            
       

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
      
      Form: {data.form.name}</Text>

			
      {errors.firstName && <Text>This is required.</Text>}
				{formData.components.map((item,index) => {

          if(item.type != 'button'){
						return (

							<View>

							<Text style={{color:'#008B8B',fontWeight:'bold',fontSize:16}}>{item.label}</Text>
		
	{item.type == 'textfield' &&
		<Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={item.label}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor= '#008B8B'
             style={{backgroundColor:'#fff',borderColor:'#008B8B',borderRadius:6,height:40, borderWidth: 1,color: '#008B8B',textAlign: 'left',fontSize: 14,width: '100%',marginTop:0,marginBottom:10}}
          />
        )}
        name={item.key}
      />
      
  	}

  	{item.type == 'select' &&
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
        		<DropDown field={field} label={item.label} item={item.data.values} />
        )}
        name={item.key}
      />
  	}
      {errors[item.label] && <Text style={{color:'red',fontWeight:'bold'}}>This is required.</Text>}
								
							</View>	
						)

          }

				})}
        {data.form.outcome == 1 &&
        <View>

              <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:16}}>Result</Text>

        <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                  <DropDown label={'Result'} field={field} item={outComeList} />
              )}
              name="outcome_id"
           />
            {errors['outcome_id'] && <Text style={{color:'red',fontWeight:'bold'}}>This is required.</Text>}
      </View>
      }

      {data.form.contact == 1 &&
      <View
          style={{borderWidth:1,padding:10,borderRadius:6,margin:10,borderColor:'#008B8B'}}
      >
      <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:16}}>Contact Number</Text>

      {contactList.map((item,index) => {
         

            return (

                  <View style={{display:'flex',width:'100%',flexDirection:'row',margin:5}}>

                      <View style={{width:'90%',alignItems: 'center',justifyContent: 'center'}}>
                      
                          <TextInput
                            keyboardType="numeric"
                            value={item.value}
                            onChangeText={(text) => handleInputChange(index, text)}
                            style={{backgroundColor:'#fff',borderColor:'#008B8B',borderRadius:6,height:40, borderWidth: 1,color: '#008B8B',textAlign: 'left',fontSize: 14,width: '100%'}}
                          />
                      </View>
                      <View style={{width:'10%',alignItems: 'center',justifyContent: 'center'}}>
                          <TouchableOpacity
                            onPress={() => removeContact(item,index)}
                          >
                            <FontAwesome name="trash" style={{fontSize: 20,color: '#008B8B'}} />
                            
                          </TouchableOpacity>
                      </View>
                  </View>

              )

        })}

      <TouchableOpacity style={styles.button} onPress={() => addContact()}>
          <Text style={styles.buttonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
      }

      <View
          style={{borderWidth:1,padding:10,borderRadius:6,margin:10,borderColor:'#008B8B'}}
      >

        <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:16}}>Supporting Images</Text>
        {imageVal.map((item,index) => {
         

            return (

                  <View style={{display:'flex',width:'100%',flexDirection:'row',margin:5}}>

                      <View style={{width:'90%'}}>
                      
                          <Image source={{ uri: item.uri }} style={styles.thumbnail} />
                      </View>
                       <View style={{width:'10%',alignItems: 'center',justifyContent: 'center'}}>
                          <TouchableOpacity
                            onPress={() => removeImage(item,index)}
                          >
                            <FontAwesome name="trash" style={{fontSize: 20,color: '#008B8B'}} />
                          </TouchableOpacity>
                      </View>
                  </View>

              )

        })}

      <TouchableOpacity style={styles.button} onPress={() => setExample(<CameraRoll mmVal="20"  saveImage={saveImage} setImageVal={setImageVal} imageVal={imageVal} onBack={onBack} />)}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
        {mode && networkState?.isInternetReachable ? (
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          ) : (
            <Button title="Submit Offline" onPress={handleSubmit(onSubmit)} />
          )}
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
export default CustomerForm;