import React from 'react'
import styles from "./style.module.css"

function TextLogin({title, icon, ...props}) {
	return (
		<div className={styles.container}>
			<input placeholder=' ' {...props}/>
			<label>{title}</label>
	        <span></span>
		</div>
	)
}

export default TextLogin