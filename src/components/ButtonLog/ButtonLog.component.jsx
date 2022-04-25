import React from 'react'
import styles from "./style.module.css"

function ButtonLog({ title, ...props}) {
	return (
		<button className={styles.button} {...props}> 
			{title}
		</button>
	)
}

export default ButtonLog