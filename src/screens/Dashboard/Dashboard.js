import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, ScrollView, Alert,StyleSheet,SafeAreaView,Image } from 'react-native';
import { Brand } from '@/components/molecules';
import { useNavigation } from '@react-navigation/native';




function Dashboard() {
    const navigation = useNavigation();

    const Box = ({ imageSource, text,screenname }) => (
        
        
        <TouchableOpacity onPress={() => navigation.navigate(screenname)}>
    
        <View style={styles.box}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.text}>{text}</Text>
        </View>
    
        </TouchableOpacity>
      );
   

    
    return (
    <SafeAreaView style={{flex:1}}>
			<View style={styles.upperview}>
                <View style={{display: 'flex',flexDirection: 'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:30,color: 'white',padding:20,fontWeight: 'bold'}}>MISTER TESTER</Text>
                    <TouchableOpacity style={{backgroundColor: 'red',display:'flex',flexDirection: 'row',height:40,width:76,borderRadius:30,alignItems:'center',padding:8,justifyContent:"space-evenly"}}>
                        <Image source={require('../../theme/assets/images/alarm.png')} style={{width: 20, height: 20}}/>
                        <Text style={{color: 'white',fontSize:15,marginTop:2}}>SOS</Text>
                    </TouchableOpacity>
                </View>

                    <Text style={{color: 'white',fontSize:20,padding:20}}>Supervisor(s):</Text>
            </View>
            
            
            
                        <ScrollView style={{ flexGrow:1}}>
                            
                            <View style={{padding:20,flexDirection: 'row',flexWrap:'wrap',justifyContent: 'space-between'}}>

                            <Box screenname={"Attendance"}  imageSource={require('../../theme/assets/images/taskdone.png')} text="Attendance" />
                            <Box screenname={"Customers"} imageSource={require('../../theme/assets/images/defaulters.png')} text="Customers" />
                            <Box screenname={"Announcements"} imageSource={require('../../theme/assets/images/announcement.png')} text="Announcements" />
                            <Box screenname={"Progress"} imageSource={require('../../theme/assets/images/progress.jpg')} text="Progress" />
                            <Box screenname={"ReviewForm"} imageSource={require('../../theme/assets/images/form.png')} text="Review Forms" />
                            <Box screenname={"DownloadReport"} imageSource={require('../../theme/assets/images/review.png')} text="Download Reports" />
                            <Box screenname={"AccountSetting"} imageSource={require('../../theme/assets/images/attendance.png')} text="Account Setting" />
                            <Box screenname={"Profile"} imageSource={require('../../theme/assets/images/pers.png')} text="Profile" />
                            
                            </View>

                        </ScrollView>
            
            </SafeAreaView>);
}
 export default Dashboard;

 const styles = StyleSheet.create({ 

    upperview: {
        height: 200,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#0052e2',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },


        box: {
            width: 150,
            height: 150,
            backgroundColor: '#ffffff',
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