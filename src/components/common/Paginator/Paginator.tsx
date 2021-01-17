import s from "./Paginator.module.css"
import React, {useState} from "react"

type Props = {
	totalUsersCount: number
	pageSize: number 
	currentPage: number
	onPageChanged: (pageNumber: number) => void
	portionSize: number
}

const Paginator: React.FC<Props> = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize}) => {

	let pagesCount = Math.ceil(totalUsersCount / pageSize)

	let pages: Array<number> = [] 

	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	let portionCount = Math.ceil(pagesCount / portionSize)
	let [portionNumber, setPortionNumber] = useState(1)
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
	let rightPortionPageNumber = portionNumber * portionSize

	return (
	<div className={s.common}>
		<div>
			{ portionNumber > 1 &&
			<button onClick={ () => {setPortionNumber(portionNumber - 1)}}>PREV</button>}
		</div>
		<div>
			{pages
				.filter(p => p>= leftPortionPageNumber && p <= rightPortionPageNumber)
				.map( p => {
				return <span className={currentPage === p ?
					s.selectedPage + " " + s.pageNumber : s.pageNumber} 
					key={p}
					onClick={ (e) => {onPageChanged(p) }}>{p}</span>
			})}
		</div>
		<div>
			{ portionCount > portionNumber &&
			<button onClick={ () => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
		</div>
	</div>
	)
}

export default Paginator