import s from "./ProfileInfo.module.css"
import Preloader from "./../../common/Preloader/Preloader"
import photo from "../../../assets/images/userImage.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import React, {useState} from "react"
import ProfileDataForm from "./ProfileDataForm"


function ProfileInfo(props) {

  const profile = props.profile

  let [editMode, setEditMode] = useState(false)

	if (props.isFetching || !profile) {
    return <div className={s.preloader}>
      <Preloader />
    </div>
  }

  const onMainPhotoChange = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    props.saveProfile(formData)
    .then( () => setEditMode(false))
  } 

  return (
    <div>
      <div className={s.info}>
        <img src={profile.photos.large ? profile.photos.large : photo} className={s.userPhoto}/>
        { props.isOwner && <input type="file" onChange={onMainPhotoChange} className={s.changePhoto}/>}        
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        { props.errorMessage ? <div>{props.errorMessage}</div> : ""}
        { editMode ? <ProfileDataForm profile={profile} onSubmit={onSubmit}/> : <ProfileData profile={profile}
          isOwner={props.isOwner} goToEditMode={ () => setEditMode(true)}/> }
              
      </div>
    </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
  return <div> 
    { isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
    <div>
      <b>Full name:</b> {profile.fullName}
    </div>
    <div>
      <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
    </div>
    { profile.lookingForAJob && 
    <div>
      <b>My professional skills</b> {profile.lookingForAJobDescription}
    </div>
    }
    <div>
      <b>About me:</b> {profile.aboutMe}
    </div>
    <div>
      <b>Contacts:</b> {Object.keys(profile.contacts).map(
          key => <Contact key={key} title={key} value={profile.contacts[key]}/>)}  
    </div>
  </div> 
}



export const Contact =({title, value}) => {
  return <div><b>{title}:</b> {value}</div>
}

export default ProfileInfo