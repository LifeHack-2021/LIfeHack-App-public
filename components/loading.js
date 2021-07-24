import React from "react"
import {
    Spinner,
    HStack,
    Heading,
    Center,
} from "native-base"

let LoadIcon = (props) => {
    return (
        <HStack space={2}>
            <Heading color="secondary.300">{props.text}</Heading>
            <Spinner color="secondary.300" accessibilityLabel="Loading posts" />
        </HStack>
    )
}

export default function Loading(props) {
    return (
        <Center flex={1}>
            <LoadIcon text={props.text} />
        </Center>
    )
}