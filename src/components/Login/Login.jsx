// import s from "./News.module.css"
import {Form, Field} from "react-final-form"
import {Element} from "../common/FormsControls/FormsControls"
import {required} from "../../utils/validators/validator"
import s from "./Login.module.css"
import {login} from "../../redux/authReducer"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import { FORM_ERROR } from 'final-form'

const Input = Element("input")

function LoginForm(props) {
	return (	
		<Form
		onSubmit={props.onSubmit}>
			{({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<div className={s.form1}>
						<div>
							<Field placeholder={"Login"} name={"email"} className={s.input}
								component={Input} validate={required}/>
						</div>
						<div>
							<Field placeholder={"Password"} name={"password"} className={s.input}
								component={Input}validate={required} type="password"/>
						</div>
						<div className={s.checkbox}>
							<Field type={"checkbox"} name={"rememberMe"} component={"input"}/> remember me
						</div>
						<div>
							{props.errorMessage && <div className={s.submitError}>{props.errorMessage}</div>}
						</div>
						<div>
							{ props.captchaUrl && <img src={props.captchaUrl} alt="" className={s.captcha}/> }
							{ props.captchaUrl && <Field placeholder={"Symbols from image"} name={"captcha"} 
								className={s.input} component={Input} validate={required} /> }
						</div>
						<div className={s.buttonBlock}>
							<button className={s.button}>Login</button>
						</div>
					</div>
				</form>
			)}
		</Form>
	)
}

function Login(props) {
	const onSubmit = (formData) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
	}

	if (props.isAuth) {
		return <Redirect to="/profile" />
	}

	return (
		<div className={s.form}>
			<h1>Login</h1>
			<LoginForm onSubmit={onSubmit} errorMessage={props.errorMessage} captchaUrl={props.captchaUrl}/>
		</div>
		)
}

const mapStateToProps = (state) => ({
	captchaUrl: state.auth.captchaUrl,
	isAuth: state.auth.isAuth,
	errorMessage: state.auth.errorMessage
})

export default connect(mapStateToProps, {login})(Login)