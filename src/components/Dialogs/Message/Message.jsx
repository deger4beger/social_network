import s from "./../Dialogs.module.css"

function Message(props) {
	return <div className={s.dialog}>{props.message}</div>
}

export default Message