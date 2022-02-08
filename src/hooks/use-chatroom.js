import { useEffect, useState } from "react";

export function useChatroom(name) {
    const [webSocket, setWebSocket] = useState();
    const [message, setMessage] = useState([]);

    useEffect(() => {
        if (!webSocket) {
            const webSocket = new WebSocket("wss://imr3-react.herokuapp.com");
            setWebSocket(webSocket);
        } else {
            webSocket.onmessage = (body) => {
                const newMessage = JSON.parse(body.data);
                setMessage([...message, ...newMessage]);
            };
        }
    }, [webSocket, message])

    const sendMessage = (message, moment) => {
        if(!name) {
            throw new Error("no name register");
        }

        if(webSocket) {
            const messageToSend = { name: name, message: message };
            if (moment) {
                messageToSend.moment = moment;
            }
            webSocket.send(JSON.stringify(messageToSend));
        }
    }

    return { message, sendMessage };
}