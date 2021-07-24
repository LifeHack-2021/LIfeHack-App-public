import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box, usePropsResolution } from 'native-base';
import DonationsPage from '../recipientViews/donationsPage/donationsPage';
import WishlistPage from '../recipientViews/wishlistPage/wishlistPage';
import ItemPage from '../recipientViews/myItemsPage/itemPage';
import PostPage from '../recipientViews/postPage/postPage';
import RecipientProfile from '../recipientViews/profilePage/profile';
import Chat from '../recipientViews/chat/chat';

const initialLayout = { width: Dimensions.get('window').width };

export default function RecipientTabNav(props) {

  const [index, setIndex] = React.useState(3);
  // revert back to 0 for build

  const [routes] = React.useState([
    // { key: 'first', title: 'Donations' },
    { key: 'second', title: 'Wishlist' },
    { key: 'third', title: 'Chat' },
    { key: 'fourth', title: 'Post' },
    { key: 'fifth', title: 'Profile' }
  ]);


  // const FirstRoute = () => (
  //   <DonationsPage userInfo={props.userInfo} />
  // );

  const SecondRoute = () => (
    <WishlistPage isFABVisible={index == 0} userInfo={props.userInfo} />
  );

  const ThirdRoute = () => (
    <Chat userInfo={props.userInfo} />
  );

  const FourthRoute = () => (
    <PostPage toHome={() => { setIndex(0) }} userInfo={props.userInfo} />

  );

  const FifthRoute = () => (
    <RecipientProfile userInfo={props.userInfo} toChat={() => { setIndex(3) }} />
  );


  const renderScene = SceneMap({
    // first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
    fifth: FifthRoute
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
                  console.log(i);
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