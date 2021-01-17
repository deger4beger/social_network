import { useSelector } from "react-redux"
import {Users} from "./Users"
import React from "react"
import Preloader from "../common/Preloader/Preloader"


import {getIsFetching} from "../../redux/usersSelectors"


type UsersPagePropsType = {

}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

	const isFetching = useSelector(getIsFetching)

	return <div>
		{isFetching ? <Preloader /> : null }
		<Users />		
	</div>	
}











// let mapDispatchToProps = (dispatch) => {
// 	return {
// 		toggleFollow: (userID) => {
// 			dispatch(toggleFollowAC(userID))
// 		},		
// 		setUsers: (users) => {
// 			dispatch(setUsersAC(users))
// 		},
// 		setCurrentPage: (pageNumber) => {
// 			dispatch(setCurrentPageAC(pageNumber))
// 		},
// 		setTotalUsersCount: (totalCount) => {
// 			dispatch(setTotalUsersCountAC(totalCount))
// 		},
// 		toggleIsFetching: (isFetching) => {
// 			dispatch(toggleIsFetchingAC(isFetching))
// 		}
// 	}
// }

