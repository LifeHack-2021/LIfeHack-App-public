import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native'
import {
    VStack,
    Button,
    FormControl,
    Input,
    Image,
    Text,
    Box,
    ScrollView,
    View,
    Center,
    Select,
    CheckIcon
} from 'native-base';

// let mockData = [
//     {
//         'name': 'laptop',
//         'category': 'electronics'
//     },
//     {
//         'name': 'phone',
//         'category': 'electronics'
//     },
//     {
//         'name': 'sanitizer',
//         'category': 'household items'
//     }
// ]

function DonateForm(props) {
    let [scrollOffset, setScrollOffset] = React.useState({ y: 0 })
    let [itemType, setItemType] = React.useState(props.recoItemList[0].items[0])
    let [itemsObj, setItemsObj] = React.useState(props.recoItemList[0].items)
    let [catType, setCatType] = React.useState(props.recoItemList[0].name)

    useEffect(() => {
        props.setData({ 'name': props.recoItemList[0].items[0], category: props.recoItemList[0].name })
    }, [])

    function submitHandler() {
        props.handleSubmit()
    }

    function retakePic() {
        props.setTakePic(true)
    }


    return (
        <ScrollView
            contentOffset={scrollOffset}
        >
            <Box
                mx='auto'
                my={10}
            >
                <ImageBackground
                    source={{ uri: props.photo.uri }}
                    alt='photo failed to load'
                    style={{ width: 300, height: 300, borderRadius: 30 / 2 }}
                />

                <View
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 260,
                        backgroundColor: 'transparent',
                    }}
                >
                    <Button colorScheme='muted' onPress={() => { retakePic() }}>
                        <Text style={{ color: 'white' }}>Retake</Text>
                    </Button>
                </View>
            </Box>
            <VStack width="90%" mx={3}>
                <FormControl isRequired style={{ width: 250 }} mx='auto'>
                    <FormControl.Label _text={{ bold: true }}>Category</FormControl.Label>
                    <Select
                        selectedValue={catType}
                        minWidth={200}
                        accessibilityLabel="Select type of good"
                        placeholder="Select type of good"
                        onValueChange={(itemValue) => {
                            setCatType(itemValue)
                            props.setData({ ...props.formData, category: itemValue })
                            for (let i = 0; i < props.recoItemList.length; i++) {
                                if (props.recoItemList[i].name == itemValue) {
                                    setItemsObj(props.recoItemList[i].items)
                                }
                            }
                        }}
                        _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />,
                        }}
                    >
                        {
                            props.recoItemList.map(e => {
                                return (
                                    <Select.Item label={`${e.name}`} value={e.name} />
                                )
                            })
                        }
                    </Select>
                </FormControl>

                <FormControl isRequired style={{ width: 250 }} mx='auto' my={5}>
                    <FormControl.Label _text={{ bold: true }}>Name</FormControl.Label>
                    <Select
                        selectedValue={itemType}
                        minWidth={200}
                        accessibilityLabel="Select type of good"
                        placeholder="Select type of good"
                        onValueChange={(itemValue) => {
                            setItemType(itemValue)
                            props.setData({ ...props.formData, name: itemValue })
                        }}
                        _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />,
                        }}
                    >
                        {
                            itemsObj.map(e => {
                                return (
                                    <Select.Item label={`${e.name} | ${e.confidence}`} value={e.name} />
                                )
                            })

                        }
                    </Select>

                </FormControl>


                <Button onPress={() => { submitHandler() }} mt={5} colorScheme="cyan">
                    Submit
                </Button>
            </VStack>

        </ScrollView>

    );
}
export default DonateForm