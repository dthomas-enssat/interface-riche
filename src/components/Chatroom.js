import { useEffect, useState } from "react";
import { useChatroom } from "../hooks/use-chatroom";
import styles from "./Chatroom.module.css"

// css

import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { 
    Avatar,
    Button,
    Comment,
    Input, 
    Space,
    Typography
} from 'antd';
const { Title } = Typography;

export function MessageControl({
    moment,
    sendMessage
}) {
    const [message, setMessage] = useState("");

    const sendNewMessage = () => {
        sendMessage(message, moment);
        setMessage("");
    }

    return (
        <Input.Group compact>
            <Input style={{ width: 'calc(100% - 32px)' }} value={message} onChange={(e) => setMessage(e.target.value)} onPressEnter={() => sendNewMessage()}></Input>
            <Button type="primary" onClick={() => sendNewMessage()} icon={<SendOutlined />}></Button>
        </Input.Group>
    )
}

export function Message({message, onClickMessage}) {
    const onSelectMessage = () => {
        onClickMessage && onClickMessage(message);
    }

    const timeWith0 = (value) => {
        return value = (value <= 9) ? '0' + value : value;
    }

    const momentToDate = (value) => {
        const hours = timeWith0(Math.floor(value / 3600));
        const minutes = timeWith0(Math.floor((value - hours * 3600) / 60));
        const seconds = timeWith0(Math.floor(value - hours * 3600 - minutes * 60));
        if(parseInt(hours)) {
            return hours + ':' + minutes + ':' + seconds
        } else {
            return '00:' + minutes + ':' + seconds
        }
    }

    return (
        <Comment
            author={message.name} 
            avatar={<Avatar icon={<UserOutlined />} />}
            onClick={() => onSelectMessage()} 
            className={styles.content}
            content={
                <p>{message.message}</p>
            }
            datetime={message.moment ? momentToDate(message.moment) : ""}>
        </Comment>
    )
}

export function Chatroom({
    moment, 
    className, 
    onClickMessage
}) {
    const [name, setName] = useState();
    const { message, sendMessage } = useChatroom(name);

    const orderedMessage = message.sort((a, b) => b.when - a.when);

    const messageRender = (message, index) => {
        return (
            <Message key={index} message={message} onClickMessage={onClickMessage}/>
        )
    }

    const messagesRender = orderedMessage?.map(messageRender);

    useEffect(() => {
        setName("user" + (Math.floor(Math.random() * 1001)))
    }, [])

    return (
        <section className={className}>
            <Title level={2}>Chat</Title>
            <Space direction="vertical" className={styles.chat}>
                {messagesRender}
            </Space>
            <div className={styles.message}>
                <MessageControl moment={moment} sendMessage={sendMessage} />
            </div>
        </section>
    )
}