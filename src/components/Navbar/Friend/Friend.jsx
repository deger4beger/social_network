import s from "./Friend.module.css"


function Friend(props) {
	return (
		<div className={s.item}>
			<div className={s.image}></div>
			<div className={s.name}>{props.name}</div>
		</div>
	)
}

export default Friend