import React, { useEffect, useState } from "react"
import { Button, Heading, Center, Image, Text, Box, View, useToast } from "native-base"

import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function DonationModal(props) {
    let toast = useToast()

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [chosenDate, setChosenDate] = useState('Unset')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let d = date.toString().split('GMT')[0]
        setChosenDate(d)
        hideDatePicker()
        toast.show({
            title: `Date set to : ${d}`,
            status: "success",
            placement: 'top'
        })
    };

    return (
        <Center marginTop={5}>
            <Heading size="lg">{props.obj.title}</Heading>
            <Text bold color="gray.500">Category: {props.obj.category}</Text>

            {props.obj.status == 'redeemed' ? (
                <Text>Delivery time: {chosenDate}</Text>
            ) : <></>}
            <Text color="gray.400">Donated By: {props.obj.donor}</Text>
            <Box
                bg="white"
                shadow={4}
                rounded="lg"
                maxWidth="95%"
                minWidth="90%"
                marginTop={3}
            >
                <Image source={{ uri: props.obj.imageLink }} alt="image base" resizeMode="cover" height={240} roundedTop="md" />
            </Box>
            <Box
                rounded="lg"
                maxWidth="95%"
                minWidth="90%"
                marginTop={3}
            >
                <Text textAlign='center'>{props.obj.description}</Text>
            </Box>


            <Button.Group variant="outline" space={3} marginTop={5}>
                {props.obj.status == 'redeemed' ? (
                    <>
                        <Button onPress={showDatePicker}>Pick delivery time</Button>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </>
                ) : (<></>)
                }

                <Button
                    onPress={() => {
                        props.setModalVisible(!props.modalVisible)
                    }}
                    colorScheme="muted"
                >
                    CLOSE
                </Button>
            </Button.Group>

        </Center >
    )
}