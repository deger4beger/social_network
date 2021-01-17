import axios from "axios"
import { ProfileType } from '../types/types';

const instance = axios.create({
	withCredentials: true,
	baseURL: "https://social-network.samuraijs.com/api/1.0/",
	headers: {
		"API-KEY": "2797f993-0854-48ee-b676-f11fed5bb0dd"
	}
})

export const usersAPI = {
	getUsers(currentPage: number, pageSize: number, term: string = "", friend: null | boolean = null) {
	return instance.get(`users?
				page=${currentPage}
				&count=${pageSize}&term=${term}`
				 + (friend === null ? "" : `&friend=${friend}`)).then(response => response.data)
	}
}

export const followAPI = {
	
	follow(id: number) {
		return instance.post(`follow/${id}`)
			.then(response => response.data)
	},

	unfollow(id: number) {
		return instance.delete(`follow/${id}`)
			.then(response => response.data)
	}
}

export const profileAPI = {
	getUserProfile(userId: number) {
		return instance.get(`profile/` + userId)
			.then(response => response.data)
	},

	getStatus(userId: number) {
		return instance.get(`profile/status/` + userId)
			.then(response => response.data)
	},

	updateStatus(status: string) {
		return instance.put(`profile/status`, { status })
			.then(response => response.data)
	},
	savePhoto(photoFile: any) {
		const formData = new FormData()
		formData.append("image", photoFile)
		return instance.put(`profile/photo`, formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		})
			.then(response => response.data)
	},
	saveProfile(profile: ProfileType) {
		return instance.put("profile", profile)
			.then(response => response.data)
	}
}

export enum ResultCodes {
	Success = 0,
	Error = 1,
}

export enum ResultCodeForCaptcha {
	CaptchaIsRequired = 10
}

type getMyDataResponseType = {
	data: { id: number, email: string, login: string}
	resultCode: ResultCodes
	messages: Array<string>
}

type loginType = {
	data: { userId: number }
	resultCode: ResultCodes | ResultCodeForCaptcha
	messages: Array<string>
}

export const authAPI = {
	getMyData() {
		return instance.get<getMyDataResponseType>(`auth/me`)
			.then(response => response.data)
	},

	login(email: string, password: string, rememberMe=false, captcha: null | string = null) {
		return instance.post<loginType>(`auth/login`, { email, password, rememberMe, captcha })
			.then(response => response.data)
	},
	logout() {
		return instance.delete(`auth/login`)
			.then(response => response.data)
	}
}

export const securityAPI = {
	getCaptchaUrl() {
		return instance.get(`/security/get-captcha-url`)
			.then(response => response.data)
	}
}
