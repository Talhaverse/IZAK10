import { View, Text,ScrollView,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import { fetchWrapper } from '../components/helpers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SheetManager} from 'react-native-actions-sheet';
import { MMKV } from 'react-native-mmkv'
import CustomerCardReview from './customer/CustomerCardReview';
import  moment from 'moment'
import RNFetchBlob from 'rn-fetch-blob';

const DownloadReport = ({navigation,route}) => {
  const [data, setData] = useState([]);
  const [networkState, setNetworkState] = useState(false);
  const [endPage, setEndPage] = useState(false);
  const [loading,setLoading] = useState(false);
  const [channelTitle, setChannelTitle] = useState('All');
  const [formTitle, setFormTitle] = useState('Select Form');
  const [statusValue, setStatusValue] = useState(0);
  const [formValue, setFormValue] = useState('');
   const dateStr = new Date();
   const [fromTitle, setFromTitle] = useState(dateStr.toLocaleDateString('en-US',{day:'numeric',month:'short', year: 'numeric' }));
      const [toTitle, setToTitle] = useState(dateStr.toLocaleDateString('en-US',{day:'numeric',month:'short', year: 'numeric' }));
  const [date, setDate] = useState(new Date())
   const [dateTo, setDateTo] = useState(new Date())
   const [page, setPage] = useState(0);
   const [total,setTotal] = useState(0);
  const storage = new MMKV({
      id: `izak-10`,
      
    })
  let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];


const meChange = (id,name) => {
   
    setChannelTitle(name);
  
    setStatusValue(id)
  
   
    SheetManager.hide('user-list')
}

const meChangeForm = (id,name) => {
   
    setFormTitle(name);
  
    setFormValue(id)
  
   
    SheetManager.hide('form-list')
}

const meChangeDate = (value,type=1) => {

    if(type == 'from'){
        setDate(value)
        setFromTitle(value.toLocaleDateString('en-US',{day:'numeric',month:'short', year: 'numeric' }));
         
         
    }

    if(type == 'to'){
         setDateTo(value)
        setToTitle(value.toLocaleDateString('en-US',{day:'numeric',month:'short', year: 'numeric' }));
        
       
    }
    

    SheetManager.hide('date-list')
}


const meDownload = async() => {

  if(formValue == ''){

      alert("Please, form is required");
      return false;
  }
   const API_URL2 = process.env.API_URL
      const url = `${API_URL2}/customer/download-report?user_id=${statusValue}&from=${date}&to=${dateTo}&report_to=${user.id}&form_id=${formValue}`;
      console.log(url)
      const token = ""
      setLoading(true)
      const listData = await fetchWrapper.get(url,token);
      
        downloadFile(listData.url)
       
         
      
       
      setLoading(false)

       
}
const downloadFile = (file_name) => {
  const API_URL2 = process.env.API_URL
    const downloadUrl = `https://0e30-111-88-82-112.ngrok-free.app/izak/web/download/${file_name}`
   const { dirs } = RNFetchBlob.fs;
   const dirToSave =
     Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    
   const configfb = {
     fileCache: true,
     addAndroidDownloads: {
       useDownloadManager: true,
       notification: true,
       mediaScannable: true,
       title: file_name,
       path: `${dirs.DownloadDir}/${file_name}`,
     },
     useDownloadManager: true,
     notification: true,
     mediaScannable: true,
     title: file_name,
     path: `${dirToSave}/file_name`,
   };
   const configOptions = Platform.select({
     ios: configfb,
     android: configfb,
   });

   RNFetchBlob.config(configOptions || {})
     .fetch('GET', downloadUrl,{})
     .then(res => {

       if (Platform.OS === 'ios') {
         RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
         RNFetchBlob.ios.previewDocument(configfb.path);
       }
       if (Platform.OS === 'android') {
         console.log("file downloaded")      
      }
     })
     .catch(e => {
       console.log('file Download==>', e);
           });
  }
  return (
     <View style={{margin:0,backgroundColor:'#fff'}}>
     <View style={{margin:10}}>
     <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:22}}>Downlaod Report</Text>
     

        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{width:'48%',backgroundColor: '#008B8B',borderRadius: 5,paddingHorizontal: 8,paddingVertical: 5,marginRight: 10}}

            onPress={() => SheetManager.show('user-list',{payload:{meChange:meChange}})}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <Text style={{fontSize: 14,fontWeight: 400,color: '#fff',marginRight: 5,fontFamily:'Poppins-Regular'}}>{channelTitle}</Text>
              <Icon name="chevron-down" color="#fff" style={{fontSize: 16,marginLeft:10}} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{width:'48%',backgroundColor: '#008B8B',borderRadius: 5,paddingHorizontal: 8,paddingVertical: 5,marginRight: 10}}

            onPress={() => SheetManager.show('form-list',{payload:{meChange:meChangeForm}})}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <Text style={{fontSize: 14,fontWeight: 400,color: '#fff',marginRight: 5,fontFamily:'Poppins-Regular'}}>{formTitle}</Text>
              <Icon name="chevron-down" color="#fff" style={{fontSize: 16,marginLeft:10}} />
            </View>
          </TouchableOpacity>

          </View>
          <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
          <TouchableOpacity style={{width:'48%',backgroundColor: '#008B8B',borderRadius: 5,paddingHorizontal: 8,paddingVertical: 5,marginRight: 10}}

            onPress={() => SheetManager.show('date-list',{payload:{meChangeDate:meChangeDate,type:'from'}})}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <Text style={{fontSize: 14,fontWeight: 400,color: '#fff',marginRight: 5,fontFamily:'Poppins-Regular'}}>{fromTitle}</Text>
              <Icon name="calendar-alt" color="#000" style={{fontSize: 16,color: '#fff',marginLeft:10}} />
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={{width:'48%',backgroundColor: '#008B8B',borderRadius: 5,paddingHorizontal: 8,paddingVertical: 5,marginRight: 0}}

            onPress={() => SheetManager.show('date-list',{payload:{meChangeDate:meChangeDate,type:'to'}})}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <Text style={{fontSize: 14,fontWeight: 400,color: '#fff',marginRight: 5,fontFamily:'Poppins-Regular'}}>{toTitle}</Text>
              
              <Icon name="calendar-alt" color="#fff" style={{fontSize: 16,color: '#fff',marginLeft:10}} />
            </View>
          </TouchableOpacity>
          </View>
      
     

       <TouchableOpacity style={{backgroundColor: 'blue',borderRadius: 5,paddingVertical: 15,marginRight: 0,width:'70%',alignItems:'center',justifyContent:'center'}}

            onPress={() => meDownload()}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                <Icon name="cloud-download-alt" color="#fff" style={{fontSize: 16,color: '#fff',marginRight:10}} />
              <Text style={{fontSize: 14,fontWeight: 400,color: '#fff',marginRight: 5,fontFamily:'Poppins-Regular'}}>Download</Text>
              
              
            </View>
          </TouchableOpacity>

      
    </View>
    </View>
  )
}

export default DownloadReport
const styles = StyleSheet.create({
     
  name:{
      color:'#008B8B',fontWeight:'bold'

  },
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },

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
  
})

