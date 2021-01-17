import {Element} from "../../common/FormsControls/FormsControls"
import {required, maxLenghtCreator} from "../../../utils/validators/validator"
import {Form, Field} from "react-final-form"



const Input = Element("input")
const Textarea = Element("textarea")
const maxLength40 = maxLenghtCreator(40)


const ProfileDataForm = ({profile, onSubmit}) => {
	return (	
		<Form
		onSubmit={onSubmit}
		initialValues={profile}
		>
			{({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<div> 
					    <div><button>save</button></div>
					    <div>
					      <b>Full name:</b> <Field placeholder={"Full name"} name={"fullName"}
								component={Input} validate={required}/>
					    </div>
					    <div>
					      <b>Looking for a job:</b> <Field name={"lookingForAJob"}
								component={Input} type="checkbox"/>
					    </div>
					    <div>
					      <b>My professional skills</b> <Field name={"lookingForAJobDescription"}
								component={Textarea} placeholder={"My professional skills"}
								validate={maxLength40}/>
					    </div>
					    <div>
					      <b>About me:</b> <Field name={"aboutMe"}
								component={Textarea} placeholder={"About me"}/>
					    </div>
					    <div>
					      <b>Contacts:</b> {Object.keys(profile.contacts).map(
					          key => <div key={key}>
					          	<b>{key}:</b> <Field placeholder={key} name={"contacts." + key}
													component={Input}/>
					          </div>)}  
					    </div>
					  </div> 
				</form>
			)}
		</Form>
	)
}

export default ProfileDataForm