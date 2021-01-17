import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom"
import Friend from "./Friend/Friend"


function Navbar(props) {
		
	let friendsElements = props.navbarPage.friends
		.map( f => <Friend name={f.name} />)

	return (
	<nav className={s.nav}>
	  <div className={s.navItems}>
        <div className={s.item}><NavLink to="/profile" activeClassName={s.active}>Profile</NavLink></div>
        <div className={s.item}><NavLink to="/messages" activeClassName={s.active}>Messages</NavLink></div>
        <div className={s.item}><NavLink to="/news" activeClassName={s.active}>News</NavLink></div>
        <div className={s.item}><NavLink to="/music" activeClassName={s.active}>Music</NavLink></div>
        <div className={s.item  + " " + s.big}><NavLink to="/users" activeClassName={s.active}>Find users</NavLink></div>
        <div className={s.item  + " " + s.big}><NavLink to="/settings" activeClassName={s.active}>Settings</NavLink></div>
    </div>	
  	<div className={s.friendsTitle}>
  		<h2>Friends</h2>
      <div className={s.friends}>        
  		  {friendsElements}
      </div>
  	</div>

  </nav>
      )
}

export default Navbar