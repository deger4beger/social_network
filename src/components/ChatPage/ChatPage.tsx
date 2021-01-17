import React, { useEffect, useState } from "react"

type ChatMessageType = {
	message: string,
	photo: string,
	userId: number,
	userName: string
}

// const Chat: React.FC = () => {
// 	return 
// 		<div>
// 			<Messages />
// 			<AddMessageForm />
// 		</div>
// }

const Chat: React.FC = () => {

	const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

	useEffect( () => {	
		let ws: WebSocket	
		const closeHandler = () => {
			setTimeout(createChannel, 3000)
		}		
		function createChannel() {
			ws?.removeEventListener("close", closeHandler)
			ws?.close() 
			ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
			ws.addEventListener("close", closeHandler)
			setWsChannel(ws)
		}
		createChannel()

		return () => {
			ws.removeEventListener("close", closeHandler)
			ws.close()
		}
	}, [])

	return <div>
		<Messages wsChannel={wsChannel} />
		<AddMessageForm wsChannel={wsChannel} />
	</div>
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
	const [messages, setMessages] = useState<ChatMessageType[]>([])

	useEffect(() => {
		const messageHandler = (e: MessageEvent) => {
			let newMessages = JSON.parse(e.data)
			setMessages((prev) => [...prev, ...newMessages])
		}
		wsChannel?.addEventListener("message", messageHandler)

		return () => {
			wsChannel?.removeEventListener("message", messageHandler)
		}
	}, [wsChannel])

	return <div style={{height: "500px", overflowY: "auto"}}>
		{messages.map((m, index) => <MessageItem key={index} message={m} />)}
	</div>
}

const MessageItem: React.FC<{message: ChatMessageType}> = ({message}) => {

	return <div>
		<img src={message.photo} style={{width: "30px"}} alt="" /><b style={{marginLeft: "15px"}}>{message.userName}</b>
		<br />
		{message.message}
		<hr />
	</div>
}

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

	const [message, setMessage] = useState("")
	const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending")

	useEffect( () => {
		let openHandler = () => {
			setReadyStatus("ready")
		}
		wsChannel?.addEventListener("open", openHandler)

		return () => {
			wsChannel?.removeEventListener("open", openHandler)
		}
	}, [wsChannel])

	const sendMessage = () => {
		if (!message) {
			return
		}
		wsChannel?.send(message)
		setMessage("")
	}

	return <div>
		<div>
			<textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
		</div>
		<div>
			<button onClick={sendMessage} disabled={wsChannel === null || readyStatus === "pending"}>Send</button>
		</div>
	</div>
}


export default Chat

