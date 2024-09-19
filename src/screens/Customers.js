import { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,ScrollView,ActivityIndicator,StyleSheet,FlatList,SafeAreaView,TextInput,Button } from 'react-native'
import React from 'react'
import { fetchWrapper } from '../components/helpers';
import NetInfo from "@react-native-community/netinfo";
import CustomerCard from './customer/CustomerCard';
import { MMKV } from 'react-native-mmkv'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDown from './customerdetail/DropDown'
import { useForm, Controller } from "react-hook-form"
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
const Customers = ({navigation,route}) => {

  const [networkState, setNetworkState] = useState(false);
  const [endPage, setEndPage] = useState(false);

  const [filterVisible, setFilterVisible] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [companyList, setCompanyList] = useState([]);
   const [workingDateList, setWorkingDateList] = useState([]);
  const [bucketList, setBucketList] = useState([]);
 const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  
  const [page, setPage] = useState(0);

     const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    
  })
  
  const [refreshing, setRefreshing] = useState(false);
   const storage = new MMKV({
      id: `izak-10`,
      
    })


    let customer  = storage.getString('customer') ? JSON.parse(storage.getString('customer')) : [];


  const paramType = 'today';
  
  const [loading,setLoading] = useState(false);
  const [type,setType] = useState(paramType);
  const [total,setTotal] = useState(0);
  
   let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];
  const [list, setList] = useState([]);

    useEffect(() => {
       
       loadCompanyList();
       loadWorkingDate();
               loadBucketList();
        NetInfo.fetch().then(state => {
          //state = false;
          setNetworkState(state);

          if(state?.isInternetReachable){
               loadOutCome();

                //sendData();
                
                loadList(paramType,state);
          }  
          
          
        });


        const unsubscribe = NetInfo.addEventListener(state => {
            setNetworkState(state);
            loadList(paramType,state)
           
          });

          // Unsubscribe from network state updates
          return () => {
            unsubscribe();
          };
        

          


        
          
         
         
      }, [type,searchData,route]);

      const sendData = async() => {
           const API_URL2 = process.env.API_URL
           setLoading(true)
          let customerStorageOffline  = storage.getString('customer') ? JSON.parse(storage.getString('customer')) : [];
          let delIds = [];
          const results = await Promise.all(customerStorageOffline.map(async (rs,index) => {
             
               
              //console.log(rs.id)

               
                if(rs?.offline){

                  
                 
                 
                   var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "multipart/form-data");


                     var formdata = new FormData();

                    const offline = rs.offline;
                    
                   
                   
                    if(offline?.imageVal){
                        for (const file of offline?.imageVal) {
                      
                  
                           const ffData = {
                            uri : file.uri,
                            type: 'image/jpeg',
                            name: file.name
                           }     
                           
                          // data.append('file', fs.createReadStream('/Users/mac/Downloads/cameraFlipIcon.png'));
                        formdata.append('files[]', ffData);
                      }

                    }
                    

                     formdata.append("form_id",offline.form_id)
                     formdata.append("ref_id", offline.ref_id);
                     formdata.append("customer_id", offline.customer_id);
                     formdata.append("contactData",offline.contactData);
                     formdata.append("formData",offline.formData);
                     formdata.append("outcome_type_id",offline.outcome_type_id);
                     formdata.append("user_id",offline.user_id);
                     formdata.append('location',offline.location);
                     formdata.append('location_submit', offline.location_submit);

                     
                    var requestOptions = {
                      method: 'POST',
                      headers: myHeaders,
                      body: formdata,
                     // redirect: 'follow'
                    };

                    
                     const url = `${API_URL2}/customer/save-form`;
                   
                     return await postData(url,requestOptions,rs)

                }
                return false
          }))
          results.map(ids => {
              customerStorageOffline = customerStorageOffline.filter(item => item.id !== ids);
          })
          console.log(customerStorageOffline)
          setLoading(false)
         // console.log(delIds)
           storage.set('customer', JSON.stringify(customerStorageOffline));
           loadList(paramType,networkState)
          // console.log("removed")
         
          

      }

    const postData = async(url,requestOptions,rs) => {
       
        const fR = await fetch(`${url}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                      console.log(rs.id)
                        console.log(result)
                        return rs.id
                        //console.log(result)
                        //customerStorageOffline = customerStorageOffline.filter(item => item.id !== rs.id);


                    })
                    .catch(error => {
                        return false
                       
                    });
                    return fR;
    }

    const loadOutCome = async (type="text") => {
        if(networkState?.isInternetReachable){
           const API_URL2 = process.env.API_URL
            const url = `${API_URL2}/customer/out-come-list-all`;
       
           setLoading(true)
        
            const data  = await fetchWrapper.get(url)
            setLoading(false)
            const listOutcome = data.map(item => {

                return {label:item.name,value:item.id,company_id:item.company_id}
            })

             storage.set('outcomelist', JSON.stringify(listOutcome))

        
        }
           
        
    }

    const loadCompanyList = async (type="text") => {
        
           const API_URL2 = process.env.API_URL
            const url = `${API_URL2}/customer/company-list`;
            console.log(url)
           setLoading(true)
        
            const data  = await fetchWrapper.get(url)
            setLoading(false)
            const listCompany = data.map(item => {

                return {label:item.name,value:item.id}
            })
            console.log(listCompany)
            setCompanyList(listCompany)

        
       
           
        
    }

    const loadBucketList = async (type="text") => {
        if(networkState?.isInternetReachable){
           const API_URL2 = process.env.API_URL
            const url = `${API_URL2}/customer/bucket-list?company_id=1`;
            console.log(url)
           setLoading(true)
        
            const data  = await fetchWrapper.get(url)
            setLoading(false)
            const listBucket = data.map(item => {

                return {label:item.name,value:item.id}
            })
            
            setBucketList(listBucket)

        
        }
           
        
    }

    const loadWorkingDate = async (type="text") => {
       
           const API_URL2 = process.env.API_URL
            const url = `${API_URL2}/customer/date-tab?user_id=${user.id}`;
            console.log(url)

           setLoading(true)
        
            const data  = await fetchWrapper.get(url)
            setLoading(false)
           
            
            setWorkingDateList(data)

        
        
           
        
    }

  const onSubmit = async(data) => {
    console.log(date)
    console.log(date.toDateString())
      data.assign_date = date.toDateString()
      setList([])
      setFilterVisible(false)
      setPage(0)
      setSearchData(data)
      loadList(paramType,networkState,data)
      
  }

  const loadNext = () => {

    
    loadList(type,networkState,searchData)
}
  const meScroll = () => {
  console.log(endPage)
  console.log("End Page")
  if(!endPage){
      loadNext()
  }
  
 
}

  const loadList = async() => {
      
      const stateVal = networkState
      const searchParam = JSON.stringify(searchData)
      setEndPage(false)
     if(stateVal?.isInternetReachable){
      
      const API_URL2 = process.env.API_URL
      const url = `${API_URL2}/customer/index?user_id=${user.id}&expand=customer,form&type=${type}&page=${page}&param=${searchParam}`;
      console.log(url)
      const token = ""
      setLoading(true)
      const listData = await fetchWrapper.get(url,token);
      setLoading(false)
      listData.list.map(item => {

            const checkData = customer.filter(rss => rss.id == item.id);
              if(checkData.length == 0){


                  customer.push(item);
                  storage.set('customer', JSON.stringify(customer));
              
              

              }
      })

      setTotal(listData.count)
       if(page == 0){
          setList(listData.list);
       }else{
          console.log("here")
          setList([...list, ...listData.list]);
       }
       
      if(listData.list.length > 0){

          const pageVal = page + 1;
               setPage(pageVal)
               setEndPage(false)
      }else{
            setEndPage(true)
      }


       
      
      
    }else{
        //storage.delete('customer')
        let customerStorage  = storage.getString('customer') ? JSON.parse(storage.getString('customer')) : [];
        
        
         setList(customerStorage);
    }

  }
   
  const loadByType = (typeValue) =>{
      setList([])
      setPage(0)
      
      setType(typeValue);
      loadList(typeValue,networkState)
  }


const clearFilter = () => {
    reset({ company_id: "",tracking_id:"",min_bal:"",max_bal:"",cycle_day:"",bucket_id:"" })
    setFilterVisible(false)
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
      <CustomerCard type={type} mode={networkState?.isInternetReachable}  data={item} navigation={navigation} />
    );
  };



  return (
    <>
    
    
    

     <View style={{margin:10}}>
     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
      endFillColor="#fff" style={{marginBottom: 15}}>
      <View style={{flexDirection:'row'}}>
          {workingDateList?.map((item,index) => {

              return(
                    <TouchableOpacity key={index}
                    onPress={() => {
                          setList([])
                          setPage(0)
                          setDate(moment(item.working_date).toDate())
                          setSearchData({assign_date:item.working_date})
                          loadList()
                    }}
                    style={{borderWidth:1,borderRadius:6,padding:5,margin:5,borderColor:'#008B8B',backgroundColor:'#008B8B'}}
                    >
                        <Text style={{color:'#fff',fontWeight:'bold'}}>
                        

                        {moment(item.working_date).format('dd D MMM YYYY')}</Text>
                    </TouchableOpacity>

                )

          })}
      </View>
      </ScrollView>

        <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>Customer: {list.length} / {total}</Text>
        
       
        {networkState?.isInternetReachable &&
        <TouchableOpacity
            onPress={sendData}
            style={{flexDirection:'column',alignItems:'end',justifyContent:'end',display:'none'}}
        >
        
            <FontAwesome5 name="sync-alt" style={{fontSize: 20,color: 'blue',textAlign:'right'}} />
            <Text style={{color:'blue',textAlign:'right',fontSize:20}}>Sync Data</Text>
        </TouchableOpacity>
        }

        <TouchableOpacity
            onPress={() => setFilterVisible(true)}
            style={{flexDirection:'column',alignItems:'end',justifyContent:'end'}}
        >
        
            <FontAwesome5 name="filter" style={{fontSize: 20,color: 'blue',textAlign:'right'}} />
           
        </TouchableOpacity>
     </View> 
     {filterVisible && 
     <View style={{margin:10}}>
        <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:20}}>Filter</Text>
         <View>
            <Text style={styles.name}>Company</Text>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({ field }) => (
                  <DropDown field={field} label="Company" item={companyList} />
              )}
              name={"company_id"}
            />
        </View>
        <View>
            <View style={{flexDirection:'row'}}>
              <View style={{width:'50%',marginRight:5}}>

                    <Text style={styles.name}>Tracking ID</Text>

                    <Controller
                        control={control}
                        rules={{
                          required: false,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Tracking ID"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholderTextColor= '#008B8B'
                             style={{backgroundColor:'#fff',borderColor:'#008B8B',borderRadius:6,height:40, borderWidth: 1,color: '#008B8B',textAlign: 'left',fontSize: 14,width: '100%',marginTop:0,marginBottom:10}}
                          />
                        )}
                        name="tracking_id"
                      />

              </View>
              <View style={{width:'50%'}}>

                    <Text style={styles.name}>Name</Text>

                      <Controller
                          control={control}
                          rules={{
                            required: false,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                              placeholder="Name"
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                              placeholderTextColor= '#008B8B'
                               style={{backgroundColor:'#fff',borderColor:'#008B8B',borderRadius:6,height:40, borderWidth: 1,color: '#008B8B',textAlign: 'left',fontSize: 14,width: '100%',marginTop:0,marginBottom:10}}
                            />
                          )}
                          name="name"
                        />


              </View>
            </View>

            
        </View>
        <View>
            <Text style={styles.name}>Balance</Text>
            <View style={{flexDirection:'row'}}>
                  <View style={{width:'50%',marginRight:5}}>
                         <Controller
                        control={control}
                        rules={{
                          required: false,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Min Balance"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholderTextColor= '#008B8B'
                             style={{backgroundColor:'#fff',borderColor:'#008B8B',borderRadius:6,height:40, borderWidth: 1,color: '#008B8B',textAlign: 'left',fontSize: 14,width: '100%',marginTop:0,marginBottom:10}}
                          />
                        )}
                        name="min_bal"
                      />
                      </View>
                       <View style={{width:'50%'}}>
                           <Controller
                            control={control}
                            rules={{
                              required: false,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                              <TextInput
                                placeholder="Max Balance"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor= '#008B8B'
                                 style={{width:'50%',backgroundColor:'#fff',borderColor:'#008B8B',borderRadius:6,height:40, borderWidth: 1,color: '#008B8B',textAlign: 'left',fontSize: 14,width: '100%',marginTop:0,marginBottom:10}}
                              />
                            )}
                            name="max_bal"
                          />
                      </View>
            </View>
        </View>

        <View>
            <Text style={styles.name}>Cycle Day</Text>
             <Controller
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Cycle Day"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor= '#008B8B'
                     style={{backgroundColor:'#fff',borderColor:'#008B8B',borderRadius:6,height:40, borderWidth: 1,color: '#008B8B',textAlign: 'left',fontSize: 14,width: '100%',marginTop:0,marginBottom:10}}
                  />
                )}
                name="cycle_day"
              />
        </View>

        <View>
            <Text style={styles.name}>Bucket</Text>

            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({ field }) => (
                  <DropDown field={field} label="Bucket" item={bucketList} />
              )}
              name={"bucket_id"}
            />
        </View>

        <View>
        <Text style={styles.name}>Assign Date</Text>
         <TextInput style={styles.inputStyle}
                  placeholder={''}
                  onChangeText={() => setOpen(true)}
                 
                 style={{backgroundColor:'#fff',borderColor:'#008B8B',borderRadius:6,height:40, borderWidth: 1,color: '#008B8B',textAlign: 'left',fontSize: 14,width: '100%',marginTop:0,marginBottom:10}}
                 onFocus={() => setOpen(true)}
                 value={date.toDateString()}

              />   
     <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
   
        </View>

        <View style={{margin:5,flexDirection:'row'}}>
            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}

                style={{backgroundColor:'#008B8B',width:100,borderRadius:6,padding:5,marginRight:5}}
            >

                  <Text style={{color:'#fff',textAlign:'center'}}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => clearFilter()}

                style={{backgroundColor:'#fff',width:100,borderRadius:6,padding:5,borderColor:'#008B8B',borderWidth:1}}
            >

                  <Text style={{color:'#008B8B',textAlign:'center'}}>Clear</Text>
            </TouchableOpacity>
        </View>
       
     </View>
    }
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => index.toString()}
         
          
          renderItem={ItemView}
          ListFooterComponent={renderFooter}
          onEndReached={meScroll}
         
        />
      </View>
    </SafeAreaView>

     
    
    </>
  )
}
const styles=StyleSheet.create({
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
export default Customers