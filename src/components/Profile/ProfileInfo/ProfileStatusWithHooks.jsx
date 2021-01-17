import s from "./ProfileInfo.module.css"
import React, {useState, useEffect} from "react"

const ProfileStatusWithHooks = (props) => {
   
  	let [editMode, setEditMode] = useState(false)
  	let [status, setStatus] = useState(props.status)

  	useEffect( () => {
  		setStatus(props.status)
  	}, [props.status] )

  	const activateEditMode = () => {
  		setEditMode(true)
  	}

  	const deactivateEditMode = () => {
  		setEditMode(false)
  		props.updateStatus(status)
  	}

  	const onStatusChange = (e) => {
  		setStatus(e.target.value)
  	}

	return(
		<div>
			{editMode ? 		    
			    <div>
			    	<input value={status} onBlur={deactivateEditMode}
			    		 autoFocus={true} onChange={onStatusChange}/>
			    </div>
			: 	<div className={s.statusText}>
			    	<span onDoubleClick={ activateEditMode }>{props.status || "-----"}</span>
			    </div>
		    }
	    </div>	
	    )
}

export default ProfileStatusWithHooks