import profileReducer from "./profileReducer"
import messagesReducer from "./messagesReducer"
import navbarReducer from "./navbarReducer"


let store = {
	_state: {

		profilePage: {
			posts: [
				{id: 1, message: "Hi, how are you ?", likesCount: 17},
				{id: 2, message: "It's my first post", likesCount: 9},
				{id: 2, message: "eropgkret oeprkg", likesCount: 2},
				{id: 2, message: "qwdwqht h tht w wwww", likesCount: 0}
			],
			newPostText: ""

		},

		messagesPage: {
			dialogs: [
				{id: 1, name: "Vlad"},
				{id: 2, name: "Dmitry"},
				{id: 3, name: "Alexandr"},
				{id: 4, name: "Danil"},
				{id: 5, name: "Bakhyt"},
				{id: 6, name: "Talgat"}
			],

			messages: [
				{id: 1, message: "Hi"},
				{id: 2, message: "How are you doing ?"},
				{id: 3, message: "Who are you ?"},
				{id: 4, message: "Yo"},
				{id: 5, message: "Yo"}
			],

			newMessageText: ""
		},

		navbarPage: {
			friends: [
				{name: "Vlad"},
				{name: "Dmitry"},
				{name: "Alexander"},
				{name: "Danil"}
			]
		}
	},

	_callSubscriber() {
		console.log(2)
	},

	getState() {
		return this._state
	},


	subscribe(observer) {
		this._callSubscriber = observer
	},

	dispatch(action) {		
		this._state.profilePage = profileReducer(this._state.profilePage, action)
		this._state.messagesPage = messagesReducer(this._state.messagesPage, action)
		this._state.navbarPage = navbarReducer(this._state.navbarPage, action)

		this._callSubscriber()
	}
}

export default store