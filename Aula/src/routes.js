import { createStackNavigator } from 'react-navigation'

import Log from './pages/log';
import Main from './pages/main';
import Product from './pages/product';


export default createStackNavigator({
	Log,
	Main,
	Product

},{
	navigationOptions : {
		headerStyle: {
			backgroundColor:"#000"
		},
		headerTintColor: "#fff"
	},
});