import { View, Text,ScrollView,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import { fetchWrapper } from '../components/helpers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SheetManager} from 'react-native-actions-sheet';
import { MMKV } from 'react-native-mmkv'
import CustomerCardReview from './customer/CustomerCardReview';
import  moment from 'moment'
const ReviewForm = ({navigation,route}) => {
  const [data, setData] = useState([]);
  const [networkState, setNetworkState] = useState(false);
  const [endPage, setEndPage] = useState(false);
  const [loading,setLoading] = useState(false);
  const [channelTitle, setChannelTitle] = useState('UnApproved');
  const [statusValue, setStatusValue] = useState(10);
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

  useEffect(() => {
      meFilter(date,dateTo,statusValue)

    }, [date,dateTo,statusValue]);

React.useEffect(() => {
    navigation.addListener('focus', () => {
      console.log(route?.params?.date)
      if(route?.params?.date){
        setPage(0)
        setData([])
        meFilter(route.params.date,route.params.dateTo,route.params.statusValue)
      }
      
    });
  }, [route]);
const meChange = (value,type) => {
    setChannelTitle(value.label);
  
    setStatusValue(value.value)
    setPage(0)
    meFilter(date,dateTo,value.value)
    SheetManager.hide('status-list')
}

const meChangeDate = (value,type=1) => {

    if(type == 'from'){
        setDate(value)
        setFromTitle(value.toLocaleDateString('en-US',{day:'numeric',month:'short', year: 'numeric' }));
         setPage(0)
         meFilter(value,dateTo,statusValue)
    }

    if(type == 'to'){
         setDateTo(value)
        setToTitle(value.toLocaleDateString('en-US',{day:'numeric',month:'short', year: 'numeric' }));
        setPage(0)
        meFilter(date,value,statusValue)
    }
    

    SheetManager.hide('date-list')
}
const meFilter = async(filterDate,filterDateTo,filterStatus) => {
  console.log("loading")
  setEndPage(false)
   const API_URL2 = process.env.API_URL
    const formatDate = moment(filterDate).format('YYYY-MM-DD');
    const formatDateTo = moment(filterDateTo).format('YYYY-MM-DD');
    const url = `${API_URL2}/customer/review-form?user_id=${user.id}&from=${formatDate}&to=${formatDateTo}&status_id=${filterStatus}&expand=customer,form,submission,user,outcome&page=${page}`;
     console.log(url)
     const token = ""
      setLoading(true)
      const listData = await fetchWrapper.get(url,token);
      setLoading(false)
        setTotal(listData.count)
       if(page == 0){
          setData(listData.list);
       }else{
          
          setData([...data, ...listData.list]);
       }
          
      
       if(listData.list.length > 0){

          const pageVal = page + 1;
               setPage(pageVal)
               setEndPage(false)
      }else{
            setEndPage(true)
      }
      

     
}

const renderFooter = () => {

   
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        
         
          {loading ? (
            <>
            <Text>Loading</Text>
            <ActivityIndicator
              color="black"
              style={{marginLeft: 8}} />
              </>
          ) : null}
        
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };


   const ItemView = ({item}) => {
    
    return (
      // Flat List Item

      <CustomerCardReview type='view' date={date} dateTo={dateTo} statusValue={statusValue}  mode={true}  data={item} navigation={navigation} />
    );
  };

  const loadNext = () => {

    
    meFilter(date,dateTo,statusValue)
}
    const meScroll = () => {
 
  if(!endPage){
      loadNext()
  }
  
 
}
  return (
     <View style={{margin:0,backgroundColor:'#fff'}}>
     <View style={{margin:10}}>
     <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:22}}>Review Forms</Text>
     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
      endFillColor="#fff" style={{marginBottom: 15}}>


        <TouchableOpacity style={{backgroundColor: '#008B8B',borderRadius: 5,paddingHorizontal: 8,paddingVertical: 5,marginRight: 10}}

            onPress={() => SheetManager.show('status-list',{payload:{meChange:meChange}})}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <Text style={{fontSize: 14,fontWeight: 400,color: '#fff',marginRight: 5,fontFamily:'Poppins-Regular'}}>{channelTitle}</Text>
              <Icon name="chevron-down" color="#fff" style={{fontSize: 16,marginLeft:10}} />
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={{backgroundColor: '#008B8B',borderRadius: 5,paddingHorizontal: 8,paddingVertical: 5,marginRight: 10}}

            onPress={() => SheetManager.show('date-list',{payload:{meChangeDate:meChangeDate,type:'from'}})}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <Text style={{fontSize: 14,fontWeight: 400,color: '#fff',marginRight: 5,fontFamily:'Poppins-Regular'}}>{fromTitle}</Text>
              <Icon name="calendar-alt" color="#000" style={{fontSize: 16,color: '#fff',marginLeft:10}} />
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={{backgroundColor: '#008B8B',borderRadius: 5,paddingHorizontal: 8,paddingVertical: 5,marginRight: 0}}

            onPress={() => SheetManager.show('date-list',{payload:{meChangeDate:meChangeDate,type:'to'}})}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <Text style={{fontSize: 14,fontWeight: 400,color: '#fff',marginRight: 5,fontFamily:'Poppins-Regular'}}>{toTitle}</Text>
              
              <Icon name="calendar-alt" color="#fff" style={{fontSize: 16,color: '#fff',marginLeft:10}} />
            </View>
          </TouchableOpacity>

      </ScrollView>
     

       <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
         
          
          renderItem={ItemView}
          ListFooterComponent={renderFooter}
          onEndReached={meScroll}
         
        />

      
    </View>
    </View>
  )
}

export default ReviewForm
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