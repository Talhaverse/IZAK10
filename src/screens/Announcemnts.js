import { View, Text,FlatList,ActivityIndicator,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import  moment from 'moment'
import { fetchWrapper } from '../components/helpers';
import { MMKV } from 'react-native-mmkv'
const Announcemnts = () => {
  const [loading,setLoading] = useState(false);
  const [endPage, setEndPage] = useState(false);
  const [total,setTotal] = useState(0);
const [page, setPage] = useState(0);
const [data, setData] = useState([]);
const storage = new MMKV({
      id: `izak-10`,
      
    })
  let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];

useEffect(() => {
      meFilter()
    }, []);


const meFilter = async() => {
  setEndPage(false)
   const API_URL2 = process.env.API_URL
    
    const url = `${API_URL2}/announcement/list?user_id=${user.id}&&expand=announcement.user&page=${page}`;
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
          <View style={{backgroundColor:'#c7ecec',borderWidth:1,borderRadius:6,margin:10,padding:10}}>
             <Text style={{fontWeight:'bold',fontSize:14,color:'#000'}}>{item?.announcement?.name}</Text>
              <Text style={{fontWeight:'normal',fontSize:14,color:'#000'}}>{item?.announcement?.description}</Text>

              <View style={{flexDirection:'row'}}>
                <View style={{width:'60%'}}>
                    <Text style={{color:'black',fontSize:12}}>Created By: {item?.announcement?.user?.full_name}</Text>
                </View>
                <View style={{width:'40%'}}>
                    <Text style={{textAlign:'right',color:'black',fontSize:12}}>{moment(item.announcement.created_at).format('DD MMM YYYY hh:mm A')}</Text>
                </View>
              </View>
          </View>
      
    );
  };

  const loadNext = () => {

    
    meFilter()
}
    const meScroll = () => {
 
  if(!endPage){
      loadNext()
  }
}
  return (
    <View style={{margin:0,backgroundColor:'#fff'}}>
     <View style={{margin:10}}>
     <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:22}}>Announcements</Text>
    
     

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

export default Announcemnts

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