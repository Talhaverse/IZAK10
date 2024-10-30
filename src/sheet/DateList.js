import React, {useRef,useState} from 'react';
import DatePicker from 'react-native-date-picker'
import {
  View,Text,StyleSheet,Image,TouchableOpacity,ScrollView,TextInput
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';


function DateList({sheetId, payload}: SheetProps<{data: string}>) {
  const actionSheetRef = useRef(null); 
   const [date, setDate] = useState(new Date())
     const [openDate, setOpenDate] = useState(true)

  const {meChangeDate,type} = payload


  
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

               <View

               >
                 <DatePicker
                      
                      open={openDate}
                      date={date}
                      onDateChange={(date) => {
                        console.log(date)
                        setDate(date)
                       // meChangeDate(date,dateTo,channelValue)

                      }}
                      onCancel={() => {
                        setOpenDate(false)
                      }}
                      maximumDate={new Date(Date.now())}
                      mode="date"
                    />
                    <View style={{borderBottomWidth:1,width:'100%',borderColor:'#ccc',marginBottom:15}} />
                    <TouchableOpacity 
                    style={{borderWidth: 1,borderColor: '#008B8B',color: '#10163A',width: 80,borderRadius: 5,display: 'flex',flexDirection: 'row',alignItems: 'right',
                    justifyContent: 'center',backgroundColor: '#008B8B',paddingVertical: 10,

                  }}
                                  onPress={() => meChangeDate(date,type)}
                               
                               >
                              <Text style={{color:'white',fontWeight:'bold'}}>Confirm
                              
                              </Text>
                    </TouchableOpacity>
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

export default DateList;
