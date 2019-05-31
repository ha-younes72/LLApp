/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

//import { iconsMap, iconsLoaded } from './utils/AppIcons';
import configureStore from './store/configureStore';
//import { MessageBar } from 'react-native-messages';
//import firebase from 'react-native-firebase';

/*
function start() {
  const store = configureStore();
  registerScreens(store);
  Navigation.events().registerAppLaunchedListener(async () => {
    //setDefaultOptions();
    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setRoot({
        root: {
          component: {
            name: 'leaflet.Initializing'
          }
        },
      });
    });
  });
}


module.exports = {
  start
};
*/


class App extends Component {
	constructor(props) {
		super(props);
		console.log('This is the Start')
		//iconsLoaded.then(() => {
		this.startApp();
		console.log('This is the End')
		//})
	}

	startApp() {
		const store = configureStore();
		registerScreens(store);
		console.log('Screens REgisterd')
		Navigation.events().registerAppLaunchedListener(() => {
			Navigation.setRoot({
				root: {
					component: {
						name: 'leaflet.Initializing'
					}
				},
			});
		});

		const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener( (selectedTabIndex,unSelectedTabIndex) =>{
			console.log("Selected: ",selectedTabIndex, "Unselected: ",unSelectedTabIndex)
		})
	}
	/*render (){
		return(
			<View style={{flex:1}}>
				<MessageBar/>
			</View>
		);
	}*/

}

export default App;
/*
const navigatorStyle = {
	navBarTranslucent: true,
	drawUnderNavBar: true,
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	statusBarTextColorScheme: 'light',
	drawUnderTabBar: true
};

class App extends Component {
	constructor(props) {
		super(props);
		iconsLoaded.then(() => {
			this.startApp();
		});
	}

	startApp() {
		Navigation.startTabBasedApp({
			tabs: [
				{
					label: 'Movies',
					screen: 'movieapp.Movies',
					icon: iconsMap['ios-film-outline'],
					selectedIcon: iconsMap['ios-film'],
					title: 'Movies',
					navigatorStyle,
					navigatorButtons: {
						rightButtons: [
							{
								title: 'Search',
								id: 'search',
								icon: iconsMap['ios-search']
							}
						]
					}
				},
				{
					label: 'TV Shows',
					screen: 'movieapp.Movies',
					icon: iconsMap['ios-desktop-outline'],
					selectedIcon: iconsMap['ios-desktop'],
					title: 'Movies',
					navigatorStyle
				}
			],
			tabsStyle: {
				tabBarButtonColor: 'white',
				tabBarSelectedButtonColor: 'white',
				tabBarBackgroundColor: 'black'
			}
		});
	}
}
*/
//export default App;
