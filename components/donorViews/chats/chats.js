import React, { useEffect, useState, useCallback } from 'react'
import { Text, Heading, Box } from 'native-base'
import axios from 'axios'
import { SERVER_URL } from '../../variables'

import { StreamChat } from 'stream-chat';
import { GiftedChat } from 'react-native-gifted-chat'

const client = StreamChat.getInstance('hquqzzg8qp2f');


function OneChat(props) {
    const [messages, setMessages] = useState([]);


    let connUser = async () => {
        try {
            let res = await client.connectUser(
                {
                    id: props.userInfo.username,
                    name: props.userInfo.username,
                },
                props.userInfo.userToken
            );
        }
        catch (err) {
            console.log(err)
        }

    }

    let connChannel = async () => {
        const channel = client.channel('messaging', props.channel, {
            members: [props.recipient, props.userInfo.username]
        });
        await channel.create();
        setMyChannel(channel)
    }

    let sendMsg = async (msg) => {
        const channel = client.channel('messaging', props.channel, {
            members: [props.recipient, props.userInfo.username]
        });
        await channel.create();
        try {
            const message = await channel.sendMessage({
                text: msg
            });
            console.log(message.message.id)
        }
        catch (err) {
            console.log(err)
        }
    }

    let getMsg = async () => {
        const channel = client.channel('messaging', props.channel, {
            members: [props.recipient, props.userInfo.username]
        });
        await channel.create();
        try {
            let reps = await channel.watch()
            let msgs = reps.messages

            let arrMsg = []
            for (let i = 0; i < msgs.length; i++) {
                let obj = { createdAt: msgs[i].created_at, user: {} }
                obj._id = i
                obj.user.name = msgs[i].user.id
                if (msgs[i].user.id == props.userInfo.username) {
                    obj.user._id = 1
                } else {
                    obj.user._id = 2
                }
                obj.text = msgs[i].text
                arrMsg.push(obj)
            }

            arrMsg.sort((a, b) => {
                if (a.createdAt > b.createdAt) { return -1 }
                if (a.createdAt < b.createdAt) { return 1 }
                return 0
            })

            console.log(arrMsg, 'adkfasdf')
            setMessages(arrMsg)

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        connUser()
        getMsg()
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        sendMsg(messages[0].text)
        console.log(messages)
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}

export default function Chat(props) {
    const [myChannels, setMyChannels] = useState([])
    let recipient = 'Daren'
    let setup = async () => {
        try {
            let res = await client.connectUser(
                {
                    id: props.userInfo.username,
                    name: props.userInfo.username,
                },
                props.userInfo.userToken
            );
        }
        catch (err) {
            console.log(err)
        }
        try {
            let filter = { type: 'messaging', members: { $in: [props.userInfo.username] } }
            let sort = [{ last_message_at: -1 }]
            let channels = await client.queryChannels(filter, sort, {
                watch: true,
                state: true
            })
            let finArr = myChannels
            for (const c of channels) {
                console.log(c.cid, 'channel id ')
                finArr.push(c.cid)
            }
            setMyChannels(finArr)

        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        setup()
    })
    return (
        <>
            <Box
                bg='white'
                my={2}
                mx={3}
                py={3}
                shadow={2}>
                <Heading textAlign='center'>{recipient}</Heading>
            </Box>

            <OneChat userInfo={props.userInfo} channel='TestChannel' recipient={recipient} />
        </>
    )
}