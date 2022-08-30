import {Image, SafeAreaView, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import ScanCodeScreen from './src/screen/ScanCodeScreen';
import AddCodeScreen from './src/screen/AddCodeScreen';
import ScanProvider from './src/Context/ScanContext';

const TabNavigator = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScanProvider>
        <NavigationContainer>
          <TabNavigator.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: {
                left: 10,
                right: 10,
                bottom: 10,
                height: 70,
                elevation: 3,
                borderRadius: 25,
                position: 'absolute',
              },
            }}>
            <TabNavigator.Screen
              name="Scan Code"
              component={ScanCodeScreen}
              options={{
                tabBarIcon: ({focused}) => {
                  return (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={require('./src/asset/scan.png')}
                        resizeMode="cover"
                        style={{
                          width: 30,
                          height: 30,
                          marginBottom: 5,
                          tintColor: focused ? '#0087FF' : 'hsl(0, 0%, 75%)',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: focused ? '#0087FF' : 'hsl(0, 0%, 75%)',
                        }}>
                        SCAN
                      </Text>
                    </View>
                  );
                },
              }}
            />
            <TabNavigator.Screen
              name="Add Code"
              component={AddCodeScreen}
              options={{
                tabBarIcon: ({focused}) => {
                  return (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={require('./src/asset/add.png')}
                        resizeMode="cover"
                        style={{
                          height: 30,
                          width: 30,
                          marginBottom: 5,
                          tintColor: focused ? '#0087FF' : 'hsl(0, 0%, 75%)',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: focused ? '#0087FF' : 'hsl(0, 0%, 75%)',
                        }}>
                        ADD
                      </Text>
                    </View>
                  );
                },
              }}
            />
          </TabNavigator.Navigator>
        </NavigationContainer>
      </ScanProvider>
    </SafeAreaView>
  );
};

export default App;
