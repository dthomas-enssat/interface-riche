import { useEffect, useState } from "react";
import { useChatroom } from "../hooks/use-chatroom";

export function Message({message, onClickMessage}) {
    const onSelectMessage = () => {
        onClickMessage && onClickMessage(message);
    }

    return (
        <p onClick={() => onSelectMessage()}>
            {message.name} 
            {message.moment && <span>
                ・{message.moment}
                </span>
            } : {message.message}
        </p>
    )
}

export function Chatroom({moment, className, onClickMessage}) {
    const [name, setName] = useState();
    const { message, sendMessage } = useChatroom(name);

    const orderedMessage = message.sort((a, b) => b.when - a.when);

    const messageRender = (message, index) => {
        return (
            <Message key={index} message={message} onClickMessage={onClickMessage} />
        )
    }

    const messagesRender = orderedMessage?.map(messageRender);

    useEffect(() => {
        setName("user" + (Math.random() * 1001))
    }, [])

    return (
        <section className={className}>
            <h2>Chat</h2>
            <div>
                {messagesRender}
            </div>
            <div>
                Toto
            </div>
        </section>
    )
}