import * as React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { ImageBackground } from 'react-native'
import {
    KeyboardAvoidingView,
    VStack,
    Button,
    FormControl,
    Input,
    Image,
    Text,
    Box,
    ScrollView,
    View,
    Heading,
    Center,
    Alert
} from 'native-base';
import { margin } from 'styled-system';

import axios from 'axios'
import { SERVER_URL } from './variables';

// let mockData = {
//     123: {
//         name: 'Jonathon Ang',
//         password: '123',
//         lowIncome: false
//     },
//     321: {
//         name: 'Germaine Tan',
//         password: '321',
//         lowIncome: true,
//     }
// }

export default function LoginPage(props) {

    const [scrollOffset, setScrollOffset] = React.useState({ y: 0 })
    const [formData, setData] = React.useState({ id: '', password: '' });
    const [marginVal, setMarginVal] = React.useState(210)

    React.useEffect(() => {
        if (props.loginAuth == false) { setMarginVal(70) } else { setMarginVal(210) }
    })

    function submitHandler() {
        axios.post(`${SERVER_URL}/users/authLogin`, {
            username: formData.id,
            password: formData.password
        })
            .then(res => {
                if (res.data.status == 300) {
                    console.log('Login Failed')
                    props.setLoginAuth(false)
                } else {
                    console.log('Login Success')
                    // console.log('USERINFO LOG',res.data.userInfo)
                    props.setUserInfo(res.data.userInfo)
                    props.setLoginAuth(true)
                }
            })
            .catch(err => { console.log(err) })
    }

    return (
        <Box
            // alignContent='center'
            contentOffset={scrollOffset}
            // my={marginVal}
            mx={5}
            // bgColor=''
            py={30}

            my={10}

            shadow={9}
            style={{
                // shadowRadius: '10px',
                // shadow: '10px',
                // borderWidth: '1px',
                borderRadius: '10',
                // borderStyle: 'solid',
                backgroundColor: '#F7F7F7',
                marginTop: marginVal,
                marginBottom: 210
            }}
        >
            <Box
                mx='auto'
            >
                <Heading size="xl" color='primary.500'>Welcome</Heading>
            </Box>
            <VStack py={2} width="90%" mx={3}>
                <FormControl isRequired style={{ width: 300 }} mx='auto' my={5}>
                    <FormControl.Label _text={{ bold: true }}>SingPass ID</FormControl.Label>
                    <Input
                        onFocus={() => { setScrollOffset({ y: 25 }); console.log('focus') }}
                        onBlur={() => { setScrollOffset({ y: 0 }) }}
                        placeholder="SingPass ID"
                        onChangeText={(value) => setData({ ...formData, id: value })}
                    />

                </FormControl>
                <FormControl isRequired style={{ width: 300 }} mx='auto'>
                    <FormControl.Label _text={{ bold: true }}>Password</FormControl.Label>
                    <Input
                        onFocus={() => { setScrollOffset({ y: 50 }) }}
                        onBlur={() => { setScrollOffset({ y: 0 }) }}

                        placeholder="Password"
                        onChangeText={(value) => setData({ ...formData, password: value })}
                    />
                </FormControl>

                {/* Add categories here  */}
                <Box py={6}>
                    <Button mx='auto' style={{ width: 300 }} onPress={() => { submitHandler() }} mt={5} colorScheme="cyan">
                        Sign In
                    </Button>
                </Box>
            </VStack>
        </Box>

    );
}