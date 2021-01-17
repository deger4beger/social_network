import {NavLink} from "react-router-dom"
import userPhoto from "../../assets/images/userImage.png"
import s from "./Users.module.css"

let UsersList = (props) => {
	return (	
	<div>
		{
		props.users.map( u => <div key={u.id}>		
			<span>
				<div>
					<NavLink to={"/profile/" + u.id}>
					<img src={u.photos.small != null ? u.photos.small : userPhoto}
						 className={s.userPhoto}/>
					</NavLink>	 
				</div>
				<div>
					<button disabled={props.followingInProgress.some(id => id === u.id)} onClick={ () => {							
						u.followed ? props.unfollow(u.id)
						: props.follow(u.id)
						}}>
						{u.followed ? "Unfollow" : "Follow"}
					</button>

				</div>
			</span>
			<span>
				<span>
					<div>{u.name}</div>
					<div>{u.status}</div>
				</span>
				<span>
					<div>{"u.location.country"}</div>
					<div>{"u.location.city"}</div>
				</span>
			</span>
		</div>
			)
		}
	</div>	
	)
}

export default UsersList