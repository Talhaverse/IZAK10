import React, {useEffect,useState } from 'react';
import { Dimensions, StyleSheet,Button,Text,View,TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchWrapper } from '../../components/helpers';
import { MMKV } from 'react-native-mmkv'
import GetLocation from 'react-native-get-location'
const Break = ({setModalVisible,user,changeStatus}) => {

	const storage = new MMKV({
      id: `izak-10`,
      
    })
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [breakTypeList, setBreakTypeList] = useState([]);
	const API_URL2 = process.env.API_URL
	 useEffect(() => {
       
        //loadList()
     	breakType()
       
        
        
    }, []);

  const breakType = async () => {
      
      const url = `${API_URL2}/user/break-type`;
      
      console.log(url)
      const data  = await fetchWrapper.get(url)
      const list = data.map(item => {

          return {label:item.name,value:item.id}
      })

    
      setBreakTypeList(list)
      
        
  }
  const saveBreak = async() => {

    GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
          rationale: {
            title: 'Location permission',
            message: 'The app needs the permission to request your location.',
            buttonPositive: 'Ok',
          },
        })
        .then(async location => {
            

          const locationData  = {latitude:location.latitude,longitude:location.longitude}
            
            

            const url = `${API_URL2}/user/start-break`;
            const token = ""
             const postData = {
              user_id:user.id,
              break_type_id:value,
              location:locationData
             }
             
             const result = await fetchWrapper.post(url,token,postData);
            
             storage.set('break', JSON.stringify(result))
             setModalVisible(false);
             changeStatus();

            
              
        })
        .catch(error => {
             
            Linking.openSettings();
            const { code, message } = error;
           
            console.log(code, message);
        })
      
  		

    	 
  }

	return (

		<View>
			<Text style={{fontSize:16,color:'#008B8B',fontWeight:'bold'}}>Break</Text>

			<DropDownPicker
          zIndex={1002}
                   zIndexInverse={1002}
                   dropDownDirection={"BOTTOM"}
                   searchable={true}
          	   open={open}
          	   setOpen={setOpen}
		       value={value}
		       setValue={setValue}
		       items={breakTypeList}
		       placeholder={`Choose break type.`}
		       listMode="SCROLLVIEW"

                    scrollViewProps={{
                              nestedScrollEnabled: true,
                              showsVerticalScrollIndicator: false,
                      }}
                    searchContainerStyle={{
                      borderColor: "#008B8B",
                      color: "#008B8B"
                    }}
                    searchTextInputStyle={{
                      borderColor: "#008B8B",
                      color: "#008B8B"
                    }}
                    listItemLabelStyle={{
                      color: "#008B8B"
                    }}
                    textStyle={{
                      fontSize: 15,
                      color: "#008B8B"
                    }}
                    listMessageTextStyle={{
                      color: "#008B8B"
                    }}

                    searchPlaceholderTextColor="#008B8B"
                    searchTextInputStyle={{
                      color: "#008B8B",borderColor:'#008B8B'
                    }}
                    dropDownContainerStyle={{
                      borderColor: '#008B8B',
                      color: "#008B8B",
                      position: 'relative',
                      top: 0
                    }}


                    placeholderStyle={{
                    color: "#008B8B",
                    
                  }}
		       style={{fontSize: 14,fontWeight: '400',fontFamily:'Poppins-Regular',backgroundColor: '#fff',borderWidth: 1,borderColor: '#008B8B',height: 'auto',color: '#008B8B',minHeight: 44}}
          />

	          <View style={{display:'flex',width:'100%',flexDirection:'row',margin:5}}>
	          <TouchableOpacity
	       			style={{borderWidth:1,backgroundColor:'#008B8B',borderColor:'#008B8B',padding:5,borderRadius:6,marginTop:5,marginRight:5}}
	       			 onPress={() => saveBreak()}
	       		>
	        		<Text style={{color:'#fff',fontSize:14,fontWeight:'bold'}} >Save</Text>
	      		</TouchableOpacity>
	           <TouchableOpacity
	       			style={{borderWidth:1,backgroundColor:'#fff',borderColor:'#008B8B',padding:5,borderRadius:6,marginTop:5}}
	       			 onPress={() => setModalVisible(false)}
	       		>
	        		<Text style={{color:'#008B8B',fontSize:14,fontWeight:'bold'}}>Close</Text>
	      		</TouchableOpacity>
	      	</View>
		</View>

	)
}
export default Break;