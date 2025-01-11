import { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,ScrollView,ActivityIndicator,StyleSheet,FlatList,SafeAreaView,TextInput,Button } from 'react-native'
import React from 'react'
import { fetchWrapper } from '../components/helpers';
import NetInfo from "@react-native-community/netinfo";
import { useNetInfo } from '@react-native-community/netinfo'
import CustomerCard from './customer/CustomerCard';
import { MMKV } from 'react-native-mmkv'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDown from './customerdetail/DropDown'
import { useForm, Controller } from "react-hook-form"
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import {SheetManager} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomerCardReview from './customer/CustomerCardReview';
import SubBucket from './customer/SubBucket';

const Customers = ({navigation,route}) => {

  const [networkState, setNetworkState] = useState(false);
  const [endPage, setEndPage] = useState(false);
  const [syncStart, setSyncStart] = useState(false);
  
  const [channelTitle, setChannelTitle] = useState('In Process');

    const dateStr = new Date();
   const [fromTitle, setFromTitle] = useState(dateStr.toLocaleDateString('en-US',{day:'numeric',month:'short', year: 'numeric' }));
      const [toTitle, setToTitle] = useState(dateStr.toLocaleDateString('en-US',{day:'numeric',month:'short', year: 'numeric' }));
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [searchDataText,setSearchDataText] = useState('')
  const [companyList, setCompanyList] = useState([]);
   const [workingDateList, setWorkingDateList] = useState([]);
  const [bucketList, setBucketList] = useState([]);
 const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [statusValue, setStatusValue] = useState(1);
  const [bucketValue, setBucketValue] = useState(0);
  const [bucketTitle, setBucketTitle] = useState('Select Bucket');
  const [bucketBreakUp, setBucketBreackup] = useState({});
  
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
  const [totalCustomer,setTotalCustomer] = useState(0);
  
   let user  = storage.getString('user') ? JSON.parse(storage.getString('user')) : [];
  const [list, setList] = useState([]);

  
const netInfo = useNetInfo();

//netInfo.isInternetReachable = false;

  useEffect(() => {
    console.log('net info changed, new state: ', netInfo)
     if(netInfo?.isInternetReachable){
        sendData();
     }
  }, [netInfo,refreshing])

    useEffect(() => {
      
       loadCompanyList();
       loadOutCome();
       //loadWorkingDate();
       loadBucketList();
        // NetInfo.fetch().then(state => {
        //   //state = false;
        //   setNetworkState(state);
          
        //   if(state?.details?.isInternetReachable){
               

        //         sendData();
                
        //         //loadList(state);
        //   }  
          
          
        // });


        // const unsubscribe = NetInfo.addEventListener(state => {

           
        //     setNetworkState(state);
        //     loadList(state)
           
        //   });

        //   // Unsubscribe from network state updates
        //   return () => {
        //     unsubscribe();
        //   };
        

          


        
          
         
         
      }, [searchData]);

     useEffect(() => {
       
        setPage(0)
        loadListRefresh();
      }, [route]);

      const sendData = async() => {
        
            setSyncStart(true);
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
                     formdata.append('complete_date',offline.complete_date);
                     
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
        
          await results.map(ids => {
              customerStorageOffline = customerStorageOffline.filter(item => item.id !== ids);
          })

         
          //console.log(customerStorageOffline)
          setLoading(false)
         // console.log(delIds)
           storage.set('customer', JSON.stringify(customerStorageOffline));
           console.log("removed")

           //storage.delete('customer')
           
           loadListRefresh(statusValue)
            setSyncStart(false);
           //navigation.navigate('Customers',{id:Math.random()})
           //loadList(networkState)
          // console.log("removed")
         
          

      }

    const postData = async(url,requestOptions,rs) => {
       
        const fR = await fetch(`${url}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                     
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
        
           const API_URL2 = process.env.API_URL
            const url = `${API_URL2}/customer/out-come-list-all`;
       
           setLoading(true)
        
            const data  = await fetchWrapper.get(url)
            setLoading(false)
            if(data){
                const listOutcome = data.map(item => {

                    return {label:item.name,value:item.id,company_id:item.company_id}
                })
                //console.log(listOutcome)
                 storage.set('outcomelist', JSON.stringify(listOutcome))
            }
            
            

        
        
           
        
    }

    const loadCompanyList = async (type="text") => {
        
           const API_URL2 = process.env.API_URL
            const url = `${API_URL2}/customer/company-list`;
            
           setLoading(true)
        
            const data  = await fetchWrapper.get(url)
            setLoading(false)
            const listCompany = data.map(item => {

                return {label:item.name,value:item.id}
            })
           
            setCompanyList(listCompany)

        
       
           
        
    }

    const loadBucketList = async (type="text") => {
        if(netInfo?.isInternetReachable){
           const API_URL2 = process.env.API_URL
            const url = `${API_URL2}/customer/bucket-list?company_id=1`;
           
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
          

           setLoading(true)
        
            const data  = await fetchWrapper.get(url)
            setLoading(false)
           
            
            setWorkingDateList(data)

        
        
           
        
    }

  const onSubmit = async(data) => {
    
      data.assign_date = date.toDateString()
      setList([])
      setFilterVisible(false)
      setPage(0)
      setSearchData(data)
      let textData = '';
       if(data.company_id){
        const compName = companyList.filter(rss => rss.value == data.company_id)
        
       textData = textData + 'Company: ' + compName[0].label;
      }
      if(data.tracking_id){
        textData = textData + ', Tracking: ' + data.tracking_id;
      }
      if(data.customer_name){
        textData = textData + ', Name: ' + data.customer_name;
      }

      if(data.min_bal && data.max_bal){
        textData = textData + ', Balance: ' + data.min_bal + "-" + data.max_bal;
      }
       
      if(data.cycle_day){
        textData = textData + ', Cycle Day: ' + data.cycle_day;
      }

      if(data.bucket_id){
        const bucketName = bucketList.filter(rss => rss.value == data.bucket_id)
        textData = textData + ', Bucket: ' + bucketName[0].label;
      }

      if(data.assign_date){
        textData = textData + ', Date: ' + data.assign_date;
      }
       
       
      
       
     
      setSearchDataText(textData)
      loadList(netInfo)
      
  }

  const loadNext = () => {

    
    loadList(netInfo)
}
  const meScroll = () => {
    if(netInfo?.isInternetReachable){
         if(!endPage){
               
              loadNext()
          }
    }
         
  
 
}

 const loadListRefresh = async(status_id='') => {
      
     
      const searchParam = JSON.stringify(searchData)
      setEndPage(false)
      setList([])
      let statusDataValue = statusValue
      if(status_id != ''){
          statusDataValue = status_id;
      }


     
     if(netInfo?.isInternetReachable){
              const API_URL2 = process.env.API_URL
              const url = `${API_URL2}/customer/index?user_id=${user.id}&expand=customer,form,customer.bucket&type=${type}&page=0&param=${searchParam}&status=${statusDataValue}`;
             
              const token = ""
              setLoading(true)
              const listData = await fetchWrapper.get(url,token);

              if(listData.success === false){
                    
                    storage.delete('user');
                                 navigation.navigate('Login');
                    return false;
              }
              setLoading(false)
               console.log(customer.length)
              listData.list.map(item => {

                    const checkData = customer.filter(rss => rss.id == item.id);
                    console.log(checkData.length)
                      if(checkData.length == 0){

                            
                          customer.push(item);
                          storage.set('customer', JSON.stringify(customer));
                      
                      

                      }
              })
              
              console.log(customer.length)
              storage.set('customer-total', listData.total_count);


              setTotal(listData.count)
              setTotalCustomer(listData.total_count)
               
                  setList(listData.list);
              
               
              if(listData.list.length > 0){

                  const pageVal = page + 1;
                       setPage(pageVal)
                       setEndPage(false)
              }else{
                    setEndPage(true)
              }

        }else{

            
                let priority_id = 0;
                if(status_id === 0){
                    priority_id = 1;
                }
                
                let customerStorageRef  = storage.getString('customer') ? JSON.parse(storage.getString('customer')) : [];
            
                 const filterData = customerStorageRef.filter((item) => item.priority_id == priority_id)
                 //console.log(customerStorageRef.length + " Storage Count ddd" + " " + status_id + " " + priority_id)
                 setList(filterData);
                 
                 setTotalCustomer(filterData.length)

        }
       
      
      
    

  }
  const loadList = async(state) => {
      
      const stateVal = state
      const searchParam = JSON.stringify(searchData)
      setEndPage(false)

     if(netInfo?.isInternetReachable){
      
      const API_URL2 = process.env.API_URL
      const url = `${API_URL2}/customer/index?user_id=${user.id}&expand=customer,user,form,submission,outcome,customer.bucket&type=${type}&page=${page}&param=${searchParam}&status=${statusValue}`;
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
      storage.set('customer-total', listData.total_count);
      setTotal(listData.count)
      setTotalCustomer(listData.total_count)
       if(page == 0){
          setList(listData.list);
       }else{
          
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

        let priority_id = 0;
                if(statusValue == 0){
                    priority_id = 1;
                }
     
        let customerStorage  = storage.getString('customer') ? JSON.parse(storage.getString('customer')) : [];
        
         const filterData = customerStorage.filter((item) => item.priority_id == priority_id)
         
         setList(filterData);
         console.log(filterData.length)
         setTotalCustomer(filterData.length)
         //setTotalCustomer(storage.getString('customer-total'))
    }

  }
   
  const loadByType = (typeValue) =>{
      setList([])
      setPage(0)
      
      setType(typeValue);
      loadList(netInfo)
  }


const clearFilter = () => {
    reset({ company_id: "",tracking_id:"",min_bal:"",max_bal:"",cycle_day:"",bucket_id:"" })
    setSearchData({})
    setPage(0)
    setFilterVisible(false)
    setSearchDataText('')
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
    if(item.status_id == 1){
           return (
      
          <View style={{margin:10,marginTop:0}}>
          <CustomerCard type={type} mode={netInfo?.isInternetReachable}  data={item} navigation={navigation} />
            </View>
          
      
        );
    }else{

         return (
      
      
         
     
          <CustomerCardReview type='view-user'   mode={true}  data={item} navigation={navigation} />
      
       );

    }
   
  };
  const changeStatus = () => {
        setRefreshing(refreshing => !refreshing);
    }

const meChange = (value,type) => {
    setChannelTitle(value.label);
    changeStatus();
    setStatusValue(value.value)
 
    setPage(0)
    if(value.value != 200){
        loadListRefresh(value.value);
    }
    
    SheetManager.hide('work-status-list')
}
const meChangeBucket = (id,name,pending,picked,completed) => {
    setBucketTitle(name);
  
    setBucketValue(id)
    
    setPage(0)
    
    setBucketBreackup({pending,picked,completed})
    SheetManager.hide('bucket-list')
}

const meChangeDate = () => {

}
  return (
    <>
    
    
    

     <View style={{margin:10}}>

     <View style={{flexDirection:'row'}}>
          <View style={{width:'50%'}}>
              <Text style={{color:'#008B8B',fontWeight:'bold',fontSize:22}}>Customer</Text>
          </View>

          <View style={{width:'50%'}}>

                  <TouchableOpacity style={{width:'100%',backgroundColor: '#008B8B',borderRadius: 5,paddingHorizontal: 8,paddingVertical: 5,marginRight: 10,justifyContent:'flex-end',alignItems:'end'}}

            onPress={() => SheetManager.show('work-status-list',{payload:{meChange:meChange,netInfo:netInfo}})}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <Text style={{width:'85%',fontSize: 14,fontWeight: 400,color: '#fff',marginRight: 5,fontFamily:'Poppins-Regular'}}>{channelTitle}</Text>
              <Icon name="chevron-down" color="#fff" style={{fontSize: 16,marginLeft:5}} />
            </View>
          </TouchableOpacity>
          
        </View>
       
     </View>
     


     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
      endFillColor="#fff" style={{marginBottom: 5}}>
      <View style={{flexDirection:'row',display:'none'}}>
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
                    style={{borderWidth:1,borderRadius:6,padding:5,margin:5,borderColor:'#008B8B',backgroundColor:(item.working_date == moment(date).format("YYYY-MM-DD")) ? '#008B8B' : '#fff'}}
                    >
                        <Text style={{color:(item.working_date == moment(date).format("YYYY-MM-DD")) ? '#fff' : '#008B8B',fontWeight:'bold'}}>
                        
                        {moment(item.working_date).format('dd MMM D YYYY')}</Text>

                        
                    </TouchableOpacity>

                )

          })}
      </View>
      </ScrollView>
      {statusValue != 200 &&
      <>
      
       <View style={{flexDirection:'row',justifyContent:'flex-end'}}>

       {netInfo?.isInternetReachable &&
       <>
        <TouchableOpacity
            onPress={sendData}
            style={{flexDirection:'row',alignItems:'end',justifyContent:'flex-end',
            
          }}
        >
        
            <FontAwesome5 name="sync-alt" style={{fontSize: 16,color: 'blue',textAlign:'right',marginRight:10}} />
            <Text style={{color: syncStart ? 'green' : 'blue',textAlign:'right',fontSize:16,fontWeight:'bold'}}>Sync Data</Text>
        </TouchableOpacity>


             <TouchableOpacity
            onPress={() => setFilterVisible(true)}
            style={{flexDirection:'column',alignItems:'end',justifyContent:'flex-end'}}
        >
        
            <FontAwesome5 name="filter" style={{fontSize: 16,color: 'blue',textAlign:'right'}} />
           
        </TouchableOpacity>
        </>
        }

       
       </View>

       {netInfo?.isInternetReachable ?
       <>
       <View style={{flexDirection:'row'}}>
          <View style={{width:'50%'}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>Total Customer: {totalCustomer}</Text>
          </View>
          <View style={{width:'50%'}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:15,textAlign:'right'}}>Filter Customer: {list.length} / {total}</Text>
          </View>
        
       </View>
        </>
        :
          <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>Total Customer Offline: {totalCustomer}</Text>
        }
        <Text
          style={{color:'#008B8B',fontSize:14,fontWeight:'bold'}}
        >
        {
          searchDataText
        }
        </Text>
       </>
       } 

        
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
                 value={searchData.assign_date}

              />   
     <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          setSearchData({assign_date:date.toDateString()})
          //setSearchDataText("Date:" + date.toDateString())
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
      
        {statusValue == 200 ? 


            <SubBucket 
            bucketBreakUp={bucketBreakUp}
            type={type} mode={netInfo?.isInternetReachable} route={route}  navigation={navigation}
            user={user} bucketTitle={bucketTitle} bucketValue={bucketValue} meChangeBucket={meChangeBucket} />
        :
                <View style={styles.container}>
                <FlatList
                      data={list}
                      keyExtractor={(item, index) => index.toString()}
                     
                      
                      renderItem={ItemView}
                      ListFooterComponent={renderFooter}
                      onEndReached={meScroll}
                     
                    />
                 </View>
        }
        
     
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