import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box, Text } from 'native-base';

import DonateItemPage from '../donorViews/donatePage/donateItem'
import Stories from '../donorViews/storiesPage/stories'
import Chats from '../donorViews/chats/chats'
import DonorProfile from '../donorViews/profilePage/donorProfile';

export default function DonorTabNav(props) {

  const [index, setIndex] = React.useState(0);
  let [showModal, setShowModal] = React.useState(false)


  const [routes] = React.useState([
    { key: 'first', title: 'Stories' },
    { key: 'second', title: 'Donate' },
    { key: 'third', title: 'Chats' },
    { key: 'fourth', title: 'Profile' },
  ]);


  const FirstRoute = () => (
    <Stories toChats={() => { setIndex(2) }} showModal={showModal} setShowModal={setShowModal} />
  );

  const SecondRoute = () => (
    <DonateItemPage showModal={showModal} setShowModal={setShowModal} toHome={() => { setIndex(0) }} userInfo={props.userInfo} />
  );

  const ThirdRoute = () => (
    <Chats userInfo={props.userInfo} />
  );

  const FourthRoute = () => (
    <DonorProfile userInfo={props.userInfo} />
  );


  const initialLayout = { width: Dimensions.get('window').width };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute
  });

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <Box
              flex={1}
              alignItems='center'
              p={2}
            >
              <Pressable
                onPress={() => {
                  // console.log(i);
                  setIndex(i);
                }}>
                <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{ marginTop: StatusBar.currentHeight + 50 }}
    />
  );
}