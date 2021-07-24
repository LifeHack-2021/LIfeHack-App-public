import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, NativeBaseProvider, Text, Alert } from 'native-base'

import LoginPage from './components/loginPage';
import DonorTabNav from './components/navigation/donorTabNav';
import RecipientTabNav from './components/navigation/recipientTabNav';

function App() {
  //setting pages 
  let [login, setLogin] = useState(true)
  let [donatePage, setDonatePage] = useState(false)
  let [userInfo, setUserInfo] = useState({ id: '', password: '' })
  let [loginAuth, setLoginAuth] = useState(null)

  //user info - {lowIncome: [true/false], id: [singpass id], password: [user pw]}
  // defaults to lowincome, see ./components/templates/loginPage.js


  const config = {
    dependencies: {
      'linear-gradient': require('expo-linear-gradient').LinearGradient
    }
  }

  return (
    <NativeBaseProvider config={config}>
      {
        loginAuth == false ?
          (<Alert w="100%" my={50} colorScheme='red'>
            <Alert.Icon />
            <Alert.Title>Login Failed</Alert.Title>
            <Alert.Description>
              Either ID or Password is incorrect
            </Alert.Description>
          </Alert>)
          : <></>
      }

      {loginAuth != true ? <LoginPage
        setUserInfo={(x) => { setUserInfo(x) }}
        setLoginAuth={(x) => { setLoginAuth(x) }}
        loginAuth={loginAuth}
      /> : userInfo['role'] == 'recipient' ? <RecipientTabNav userInfo={userInfo} />
        :
        <DonorTabNav userInfo={userInfo} />
      }
    </NativeBaseProvider>
  )
}

export default App
