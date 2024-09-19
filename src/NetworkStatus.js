import React,{useState,useEffect} from 'react'
import { PermissionsAndroid, Linking,StyleSheet,View,Text } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
const NetworkStatus = () => {
  // Define state variables for network state and color

	const colors = {
	  connected: "#4CAF50",
	  internetReachable: "#FFEB3B",
	  disconnected: "#F44336"
	};
  const [networkState, setNetworkState] = useState(null);
  const [color, setColor] = useState(colors.disconnected);

  // Define a function to update the color based on network state
  const updateColor = state => {
    if (state.isConnected && state.isInternetReachable) {
      setColor(colors.connected);
    } else if (state.isConnected && !state.isInternetReachable) {
      setColor(colors.internetReachable);
    } else {
      setColor(colors.disconnected);
    }
  };

  // Use useEffect hook to subscribe and unsubscribe to network state updates
  useEffect(() => {
    // Get the network state once
    NetInfo.fetch().then(state => {
      setNetworkState(state);
      updateColor(state);
    });

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkState(state);
      updateColor(state);
    });

    // Unsubscribe from network state updates
    return () => {
      unsubscribe();
    };
  }, []);

  // Return a view with a text and a color indicator
  return (
    <View style={{height:20}} >
      <Text style={{color:networkState?.isInternetReachable ? 'green' : 'white',

      fontSize: 12,
    fontWeight: "bold",
    color:'white',
    textAlign:'center',
    margin: 0
  }}>
     
        {networkState?.isInternetReachable ? 'Online' : "Offline"}
       
      </Text>
      
    </View>
  );
};
export default NetworkStatus;
const styles = StyleSheet.create({
  container: {
   
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color:'white',
    textAlign:'center',
    margin: 0
  },
  indicator: {
    width: 50,
    height: 50,
    borderRadius: 50
  }
});