import s from "./MyPosts.module.css"
import Post from "./Post/Post"
import React from "react"
import {Form, Field} from "react-final-form"
import {required, maxLenghtCreator} from "../../../utils/validators/validator"
import {Element} from "../../common/FormsControls/FormsControls"

const Textarea = Element("textarea")

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const maxLenght10 = maxLenghtCreator(10)

function MyPostsForm(props) {
  return (  
    <Form
    onSubmit={props.onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={s.form}>
            <div>
              <Field className={s.formArea} name={"postText"}
                 component={Textarea} placeholder="Start typing"
                 validate={composeValidators(required, maxLenght10)}/>
            </div> 
            <button className={s.addPostButton}>Add post</button>
          </div>    
        </form>
      )}
    </Form>
  )
}

function MyPosts(props) {
  let postsElements = props.posts
    .map( p => <Post message={p.message} likesCount = {p.likesCount} key={p.id}/>)

  let onAddPost = (formData) => {
     props.addPost(formData.postText)
  }

	return(
        <div>
          <h3 className={s.title}>My posts</h3>
          <div>
            <MyPostsForm onSubmit={onAddPost}/>
          </div>
          <div className={s.posts}>
            {postsElements}
          </div>
        </div>

    )
}

export default MyPosts