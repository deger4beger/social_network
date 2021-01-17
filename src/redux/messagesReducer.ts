const SEND_MESSAGE = "SEND_MESSAGE"

type DialogType = {
	id: number
	name: string
}
type MessagesType = {
	id: number
	message: string
}

let initialState = {
	dialogs: [
		{id: 1, name: "Vlad"},
		{id: 2, name: "Dmitry"},
		{id: 3, name: "Alexandr"},
		{id: 4, name: "Danil"},
		{id: 5, name: "Bakhyt"},
		{id: 6, name: "Talgat"}
	] as Array<DialogType>,

	messages: [
		{id: 1, message: "Hi"},
		{id: 2, message: "How are you doing ?"},
		{id: 3, message: "Who are you ?"},
		{id: 4, message: "Yo"},
		{id: 5, message: "Yo"}
	] as Array<MessagesType>
}

export type InitialStateType = typeof initialState

export const messagesReducer = (state = initialState, action: any): InitialStateType => {
	
	switch(action.type) {
		case SEND_MESSAGE:
			return {
				...state,
				messages: [...state.messages, {id: 6, message: action.data}]
			}
		default: 
			return state	
	}	
}

type sendMessageCreatorActionType = {
	type: typeof SEND_MESSAGE,
	data: string
}

export const sendMessageCreator = (data: string): sendMessageCreatorActionType => ({ type: SEND_MESSAGE, data })

export default messagesReducer