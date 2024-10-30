import React, {useRef,useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  View,Text,StyleSheet,Image,TouchableOpacity,ScrollView,TextInput
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';



function StatusList({sheetId, payload}: SheetProps<{data: string}>) {
  const actionSheetRef = useRef(null); 

  const {meChange} = payload

  const [assignopen, setAssignOpen] = useState();
  const [assignvalue, setAssignValue] = useState('assigned');
  const [assignItems, setAssignItems] = useState([
  
    
    {label: 'UnApproved', value: 10,icon:'file-alt',color:'orange'},
    {label: 'Approved', value: 100,icon:'check',color:'green'},
    {label: 'Rejected', value: 20,icon:'remove-format',color:'red'},
    
    
  ]);

  
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
                  width:'75%',
                  borderRadius: 5,
                 
                
                  backgroundColor:'#fff',
                  
                  

             }}>

               <View>
                  {assignItems.map(item => {


                        return (


                               <TouchableOpacity style={{display: 'flex',flexDirection: 'row',paddingBottom:10,marginBottom: 15,borderBottomWidth:1,borderColor:'#000'}}
                                  onPress={() => meChange(item,'channel')}
                               
                               >
                                    <FontAwesome5 name={item.icon} style={{fontSize: 20,color: item.color,textAlign:'left',marginRight:10}} />
                                    <Text style={{fontSize: 18,color: item.color,fontWeight: 400,fontFamily:'Poppins-Regular'}}>{item.label}</Text>
                                </TouchableOpacity>
                          )

                  })}
                   
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

export default StatusList;
