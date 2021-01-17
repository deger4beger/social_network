import s from "./Users.module.css"
import Paginator from "../common/Paginator/Paginator"
import { UserType } from '../../types/types';
import React, { useEffect } from "react"
import UsersList from './UsersList';
import UsersSearchForm from './UsersSearchForm';
import { FilterType, follow, requestUsers, unfollow } from '../../redux/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getTotalUsersCount,
	getUsers, getUsersFilter, getpageSize } from '../../redux/usersSelectors';
import { useHistory } from 'react-router-dom';
import * as queryString from "querystring"

type Props = {}
type QueryParamsType = {term?: string, page?: string, friend?: string}


export const Users: React.FC<Props> = (props) => {

	const totalUsersCount = useSelector(getTotalUsersCount)   
	const pageSize = useSelector(getpageSize) 
	const currentPage = useSelector(getCurrentPage)  
	const filter = useSelector(getUsersFilter)
	const users = useSelector(getUsers)
	const followingInProgress = useSelector(getFollowingInProgress)

	const dispatch = useDispatch() 
	const history = useHistory()

	useEffect( () => {
		const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

		let actualPage = currentPage
		let actualFilter = filter

		if (!!parsed.page) actualPage = Number(parsed.page)
		if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

		switch(parsed.friend) {
			case "null":
				actualFilter = {...actualFilter, friend: null}
				break
			case "true":
				actualFilter = {...actualFilter, friend: true}
				break
			case "false":
				actualFilter = {...actualFilter, friend: false}
				break		
		} 	

		dispatch(requestUsers(actualPage, pageSize, actualFilter,
		users.length))
	}, [])
	
	useEffect( () => {
		const query: QueryParamsType = {}

		if (!!filter.term) query.term = filter.term
		if (filter.friend !== null) query.friend = String(filter.friend)
		if (currentPage !== 1) query.page = String(currentPage)

		history.push({
			pathname: "/users",
			search: queryString.stringify(query)
		})

	}, [filter, currentPage])


	const onPageChanged = (pageNumber: number) => {
		dispatch(requestUsers(pageNumber, pageSize, filter))
	}  

	const onFilterChanged = (filter: FilterType) => {
		dispatch(requestUsers(1, pageSize, filter))
	}

	const doFollow = (userId: number) => {
		dispatch(follow(userId))
	}

	const doUnfollow = (userId: number) => {
		dispatch(unfollow(userId))
	}

	return (
		<div>
			<UsersSearchForm onFilterChanged={onFilterChanged}/>

			<Paginator currentPage={currentPage} onPageChanged={onPageChanged}
				totalUsersCount={totalUsersCount} pageSize={pageSize}
				portionSize={10} />

			<UsersList users={users} followingInProgress={followingInProgress}
				follow={doFollow} unfollow={doUnfollow} />
			
		</div>
	)
}
