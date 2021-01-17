import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer"
import { render, screen } from '@testing-library/react';


let state = {
		posts: [
				{id: 1, message: "Hi, how are you ?", likesCount: 9},
				{id: 2, message: "It's my first post", likesCount: 17},
		]
	}

test('new post should be added', () => {
	// 1. test data
	let action = addPostActionCreator("privet-poka")  


	// 2. action
	let newState = profileReducer(state, action)

	//3. expectation
	expect(newState.posts.length).toBe(3)
	expect(newState.posts[0].message).toBe("privet-poka")
});

test('decrement length after deleting', () => {
	// 1. test data
	let action = deletePost(1)  


	// 2. action
	let newState = profileReducer(state, action)

	//3. expectation
	expect(newState.posts.length).toBe(1)
});
