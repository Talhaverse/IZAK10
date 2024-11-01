import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, ScrollView, Alert,StyleSheet,SafeAreaView,Image,Modal,Pressable,BackHandler } from 'react-native';
import { Brand } from '@/components/molecules';
import { useNavigation,Linking } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
import Break from './Break'
import { fetchWrapper } from '../../components/helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GetLocation from 'react-native-get-location'
import NetInfo from "@react-native-community/netinfo";
import { useNetInfo } from '@react-native-community/netinfo';

import { PermissionsAndroid } from 'react-native';

function Dashboard() {


    const netInfo = useNetInfo()

  useEffect(() => {
    console.log('net info changed, new state: ', netInfo)
     
  }, [netInfo])

    const navigation = useNavigation();
      const [networkState, setNetworkState] = useState(null);
    const [modalVisible, setModalVisible] = useState(false)
    const [loading,setLoading] = useState(false);
    const [status, setStatus] = useState(false)
    const API_URL2 = process.env.API_URL
    const [locationVal, setLocationVal] = useState({});
     const storage = new MMKV({
      id: `izak-10`,
      
    })

     
     let attendanceData  = storage.getString('attendance') ? JSON.parse(storage.getString('attendance')) : null;


   let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const separator='-'
  const toDay = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
 

  if(toDay != attendanceData?.date){
     
     storage.delete('attendance')
     
  }
     let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];

     
    let breakData  = storage.getString('break') ? JSON.parse(storage.getString('break')) : null;

    useEffect(() => {
         

            


      }, [status]);

     useEffect(() => {
    const backAction = () => {

              if(navigation.getState().routes[navigation.getState().index].name == 'Dashboard'){
                  BackHandler.exitApp()
                  return true;
              }
              return false;
            };

            const backHandler = BackHandler.addEventListener(
              'hardwareBackPress',
              backAction,
            );

            return () => backHandler.remove();
  }, []);

  //   useEffect(() => {
  //   // Get the network state once
  //   NetInfo.fetch().then(state => {
  //     setNetworkState(state);
      
  //   });

  //   // Subscribe to network state updates
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setNetworkState(state);
      
  //   });

  //   // Unsubscribe from network state updates
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

    const openSetting = () => {
         Linking.openSettings().catch(err => {

                console.log(err)
         });
    }

    const sendSos = async() => {


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
            
            

            setLoading(true)
        
            const url = `${API_URL2}/user/sos`;
                 const token = ""
                 const postData = {
                    user_id:user.id,
                    location:locationData
                 }
         

             const listData = await fetchWrapper.post(url,token,postData);
             setLoading(false)

            
              
        })
        .catch(error => {
             
            Linking.openSettings();
            const { code, message } = error;
           
            console.log(code, message);
        })

        
    }
    const changeStatus = () => {
        setStatus(status => !status);
    }

    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message:
              'IZAK App needs access to your camera ',
         
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true
        } else {
          return false;
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const Box = ({ imageSource, text,screenname }) => {        
        const handlePress = async ()=>{
            if(screenname === "Attendance"){
                const permission = await requestCameraPermission()
                if(permission){
                    navigation.navigate(screenname);
                }


            }
            else{
             navigation.navigate(screenname);
            }

        }
        return(
             <TouchableOpacity onPress={handlePress}>
    
        <View style={styles.box}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.text}>{text}</Text>
        </View>
    
        </TouchableOpacity>
            )
        
       
      };
   
    const startBreak = () => {
            setModalVisible(true)
    }

    const endBreak = async() => {

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
            
            

            const url = `${API_URL2}/user/end-break`;
        const token = ""
         const postData = {
            break_id:breakData.break_id,
            location:locationData
          
         }
         console.log(url)
         const result = await fetchWrapper.post(url,token,postData);
         
        storage.delete('break');
        changeStatus()

            
              
        })
        .catch(error => {
             
            Linking.openSettings();
            const { code, message } = error;
           
            console.log(code, message);
        })
        
    }

    
    return (
    <SafeAreaView style={{flex:1}}>
    {loading && 
        <View style={styles.loading}>
          <ActivityIndicator color="#fff" size='large' />
        </View>
        }

    {breakData &&
        <View style={{backgroundColor:'#008B8B',height:'100%',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff',fontSize:20,textAlign:'center',fontWeight:'bold'}}>You are on {breakData.break_name}</Text>

            <TouchableOpacity
                onPress={() => endBreak()}
                style={{borderWidth:1,width:200,borderColor:'#EB3678',backgroundColor:'#EB3678',borderRadius:6,marginTop:5,padding:5}}
            >
                <Text style={{color:'#fff',textAlign:'center',fontSize:20}}>End Break</Text>
            </TouchableOpacity>
        </View>

    }

    {!breakData &&
    <>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View >
          <View style={styles.modalView}>
           

                <Break user={user} changeStatus={changeStatus} setModalVisible={setModalVisible} />
            
          </View>
        </View>
      </Modal>
			<View style={styles.upperview}>
                <View style={{display: 'flex',flexDirection: 'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:30,color: 'white',padding:20,fontWeight: 'bold'}}>{user.full_name}</Text>
                    {netInfo?.isInternetReachable &&
                    <TouchableOpacity 
                    onPress = {() => sendSos()}
                    style={{backgroundColor: 'red',display:'flex',flexDirection: 'row',height:40,width:76,borderRadius:30,alignItems:'center',padding:8,justifyContent:"space-evenly"}}>
                        <FontAwesome name="bell" style={{fontSize: 15,color: '#fff',marginRight: 0}} />
                        <Text style={{color: 'white',fontSize:15,marginTop:2,fontWeight:'bold'}}>SOS</Text>
                    </TouchableOpacity>
                    }

                </View>

            
                    

                    
              

                    <Text style={{color: 'white',fontSize:20,padding:20}}>Supervisor(s): {user.report_to}</Text>
                    
            </View>


            {(attendanceData && netInfo?.isInternetReachable) &&
            <TouchableOpacity 

            onPress={() => startBreak()}
            style={{backgroundColor: '#008B8B',display:'flex',flexDirection: 'row',height:40,width:200,borderRadius:30,alignItems:'end',padding:8,justifyContent:"center",margin:10}}>
                
                <Text style={{color: 'white',fontSize:15,marginTop:2}}>Start Break</Text>
            </TouchableOpacity>
            }
                        <ScrollView style={{ flexGrow:1}}>
                            
                            <View style={{padding:20,flexDirection: 'row',flexWrap:'wrap',justifyContent: 'space-between'}}>

                            {netInfo?.isInternetReachable ?
                            <>
                            {!attendanceData ? 
                            <Box screenname={"Attendance"}  imageSource={require('../../theme/assets/images/taskdone.png')} text="Attendance" />
                            
                            :
                            <>
                            <Box screenname={"Attendance"}  imageSource={require('../../theme/assets/images/taskdone.png')} text="Attendance" />
                            <Box screenname={"Customers"} imageSource={require('../../theme/assets/images/defaulters.png')} text="Customers" />
                            <Box screenname={"Announcements"} imageSource={require('../../theme/assets/images/announcement.png')} text="Announcements" />
                            <Box screenname={"Progress"} imageSource={require('../../theme/assets/images/progress.jpg')} text="Progress" />
                            <Box screenname={"ReviewForm"} imageSource={require('../../theme/assets/images/form.png')} text="Review Forms" />
                            <Box screenname={"DownloadReport"} imageSource={require('../../theme/assets/images/review.png')} text="Download Reports" />
                            <Box screenname={"AccountSetting"} imageSource={require('../../theme/assets/images/attendance.png')} text="Account Setting" />
                            <Box screenname={"Profile"} imageSource={require('../../theme/assets/images/pers.png')} text="Profile" />
                            </>
                            }
                            </>
                            :
                            <Box screenname={"Customers"} imageSource={require('../../theme/assets/images/defaulters.png')} text="Customers" />
                            }
                            </View>

                        </ScrollView>
                        </>
            }
            </SafeAreaView>);
}
 export default Dashboard;

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
    zIndex:9,
    //height:Dimensions.get('window').height
  },
    modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'left',
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
  },

    upperview: {
        height: 200,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#008B8B',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },


        box: {
            width: 130,
            height: 150,
            backgroundColor: '#ffffff',
            color:'#000',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          },
          image: {
            width: 50,
            height: 50,
          },
          text: {
            marginTop: 10,
            fontSize: 16,
            // fontWeight: 'bold',
          },

 })