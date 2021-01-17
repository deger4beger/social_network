import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import {Form, Field} from "react-final-form"
import {Element} from "../common/FormsControls/FormsControls"
import {required, maxLenghtCreator} from "../../utils/validators/validator"

const Textarea = Element("textarea")

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const maxLenght15 = maxLenghtCreator(15)


function DialogsForm(props) {
	return (	
		<Form
		onSubmit={props.onSubmit}>
			{({ handleSubmit, form }) => (
				<form onSubmit={handleSubmit}>
					<div className={s.form}>
						<div className={s.field1} >
							<Field id="sendMessage"
						 		  className={s.sendArea} 
						 		  placeholder="Enter your message"
						 		  name={"messageText"} component={Textarea}
						 		  validate={composeValidators(required, maxLenght15)}/>	
						</div> 		  										
						<button className={s.button}>Send message</button>
					</div>		
				</form>
			)}
		</Form>
	)
}

function Dialogs(props) {

	let dialogsElements = props.messagesPage.dialogs
		.map( d => <DialogItem name={d.name} key={d.id} />)

	let messagesElements = props.messagesPage.messages
		.map( m => <Message message={m.message} key={m.id}/>)

	let onSendMessageClick = (formData, form) => {
		props.sendMessage(formData.messageText)
	}

	return (
		<div className={s.dialogs}>

			<div className={s.dialogsItems}>
				{dialogsElements}
			</div>

			<div className={s.messages}>
				{messagesElements}
				<DialogsForm onSubmit={onSendMessageClick}/>	
			</div>
			
		</div>
	)
}

export default Dialogs