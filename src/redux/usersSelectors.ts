import {createSelector} from "reselect"
import { AppStateType } from './reduxStore';

export const getUsers = (state: AppStateType) => {
	return state.usersPage.users
}

// export const getUsersSuperSelector = createSelector(getUsers, (users) => {
// 	return users.filter(u => true)
// })


export const getpageSize = (state: AppStateType) => {
	return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
	return state.usersPage.totalUsersCount
}	
export const getCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
	return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
	return state.usersPage.followingInProgress
}

export const getUsersFilter = (state: AppStateType) => {
	return state.usersPage.filter
}

