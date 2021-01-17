import s from "./Profile.module.css"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"

function Profile(props) {
	
	return(
    <div>
      <ProfileInfo profile={props.profile} isFetching={props.isFetching}
      				status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner}
      				savePhoto={props.savePhoto} saveProfile={props.saveProfile}
      				errorMessage={props.errorMessage}/>
      <MyPostsContainer /> 
    </div>
    )
}

export default Profile