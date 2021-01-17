import {sendMessageCreator}
     from "../../redux/messagesReducer"
import Dialogs from "./Dialogs"     
import {connect} from "react-redux"
import {withAuthRedirect} from "./../../hoc/withAuthRedirect"
import {compose} from "redux"

let mapStateToProps = (state) => {
	return {
		messagesPage: state.messagesPage,
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (message) => {
			dispatch(sendMessageCreator(message))
		}
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs)