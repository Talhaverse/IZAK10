import React, {useRef,useState,useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { fetchWrapper } from '../components/helpers'
import {
  View,Text,StyleSheet,Image,TouchableOpacity,ScrollView,TextInput
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import { MMKV } from 'react-native-mmkv'


function BucketList({sheetId, payload}: SheetProps<{data: string}>) {
  const actionSheetRef = useRef(null); 
 const [loading,setLoading] = useState(false);
  const {meChange} = payload
  const [data, setData] = useState([]);
  const [assignopen, setAssignOpen] = useState();
  const [assignvalue, setAssignValue] = useState('assigned');
  const [dataCount,setDataCount] = useState(false);

  const storage = new MMKV({
      id: `izak-10`,
      
    })


  let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];
  useEffect(() => {
       
        loadList();
      }, []);

  const loadList = async() => {
      
     
     
      
      const API_URL2 = process.env.API_URL
      const url = `${API_URL2}/sub-bucket/list?user_id=${user.id}`;
     
      
      setLoading(true)
      const token = {}
      const listData = await fetchWrapper.get(url,token);
         console.log(listData.data.length)
          if(listData.data.length == 0){

            setDataCount(true)
          }
       
          setData(listData);
      
       
      setLoading(false)

      
       
      
      
    

  }
  
  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={{
        borderTopLeftRadius:25,
        borderTopRightRadius:25
      }}
      indicatorStyle={{
        width:100
      }}
      gestureEnabled={true}>
      <View
        style={{
          paddingVertical:20,
          paddingHorizontal: 30,
          height:'auto',
          flexDirection:'row',
          width:'100%'
        }}>
        

      

        <View style={{flexGrow:1}}>
          

           <View style={{
                  width:'100%',
                  borderRadius: 5,
                 
                
                  backgroundColor:'#fff',
                  
                  

             }}>

               <View>

                  <Text style={{color:'#008B8B',fontWeight:700,fontSize:20}}>Select SubBucket</Text>
                  {data?.data?.map(item => {


                        return (
                         

                          <View style={{backgroundColor:'#008B8B',borderColor:'#008B8B',borderWidth:1,borderColor:'#000',borderRadius:6,margin:5,padding:5}}>
                               <TouchableOpacity style={{width:'100%',display: 'flex',flexDirection: 'row'}}
                                  onPress={() => meChange(item.id,item.name,item.pending,item.picked,item.completed)}
                               
                               >
                                  
                                    <Text style={{fontSize: 18,color: 'white',fontWeight: 400,fontFamily:'Poppins-Regular'}}>{item.name}</Text>
                                 
                                  
                                </TouchableOpacity>

                                  <View style={{flexDirection:'row'}}>
                                      <View><Text style={{color:'#c7ecec',fontWeight:700,fontSize:16}}>Pending: {item.pending}, </Text></View>
                                      <View><Text style={{color:'#c7ecec',fontWeight:700,fontSize:16}}>Picked: {item.picked}, </Text></View>
                                      <View><Text style={{color:'#c7ecec',fontWeight:700,fontSize:16}}>Completed: {item.completed}</Text></View>

                                    </View>
                            </View>
                            
                          )

                  })}

                  {dataCount &&

                      <Text style={{color:'red',fontWeight:'bold',fontSize:14}}>No Subbucket assigned to you</Text>
                  }
                   
               </View>

             
                 

              
             </View>

          
        </View>
        
      </View>
    </ActionSheet>
  );
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
    zIndex:9999999999
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    width: 360,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18
  },
 
  suggestionsRowContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingRight: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 15,
    
    
  },
  userAvatarBox: {
    width: 30,
  },
  userIconBox: {
    width: 25,
    height: 25,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db'
  },
  usernameInitials: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12
  },
  userDetailsBox: {
    flex: 1,
    margin: 5
  },
  displayNameText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  usernameText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)'
  }
});

export default BucketList;
