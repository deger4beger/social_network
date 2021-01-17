import s from "./Post.module.css"

function Post(props) {
	return(
  	<div className={s.item}>
      <div className={s.avaMessage}>
        <div className={s.ava}>
          <img src="https://img3.goodfon.ru/original/2278x1312/1/ae/james-cameron-avatar-neytiri.jpg"/>
        </div>  
        <div className={s.message}>
          {props.message}
        </div>
      </div> 
      <div className={s.like}>
      	<span>{props.likesCount}</span>
      	<span> like</span>
      </div>
  	</div>
    )
}

export default Post