import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Dashboard } from '@/screens';
import { useTheme } from '@/theme';
import Attendance from '@/screens/Attendance';
import Profile from '@/screens/Profile';
import Customers from '@/screens/Customers';
import Announcements from '@/screens/Announcemnts';
import Progress from '@/screens/Progress';
import ReviewForm from '@/screens/ReviewForm';
import DownloadReport from '@/screens/DownloadReport';
import AccountSetting from '@/screens/AccountSetting';
const Stack = createStackNavigator();
function ApplicationNavigator() {
    const { variant, navigationTheme } = useTheme();
    return (<NavigationContainer theme={navigationTheme}>
			<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Dashboard" component={Dashboard}/>
				<Stack.Screen name="Attendance" component={Attendance}/>
				<Stack.Screen name="Customers" component={Customers}/>
				<Stack.Screen name="Announcements" component={Announcements}/>
				<Stack.Screen name="Progress" component={Progress}/>
				<Stack.Screen name="ReviewForm" component={ReviewForm}/>
				<Stack.Screen name="DownloadReport" component={DownloadReport}/>
				<Stack.Screen name="AccountSetting" component={AccountSetting}/>
				<Stack.Screen name="Profile" component={Profile}/>


			</Stack.Navigator>
		</NavigationContainer>);
}
export default ApplicationNavigator;
