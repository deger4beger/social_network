
type FriendsType = {
	name: string
}

let initialState = {
	friends: [
		{name: "Vlad"},
		{name: "Dmitry"},
		{name: "Alexander"},
		{name: "Danil"}
	] as Array<FriendsType>
}

export type InitialStateType = typeof initialState

const navbarReducer = (state = initialState, action: any): InitialStateType => {


	return state
}

export default navbarReducer