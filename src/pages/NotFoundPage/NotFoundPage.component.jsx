import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import image from "../../assets/images/undraw_page_not_found_re_e9o6.svg";

function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<div className={styles.container}>
			<img src={image} alt="404" />
			<button
				onClick={() => {
					navigate("/");
				}}
			>
				¡Click aqui!
			</button>
		</div>
	);
}

export default NotFoundPage;
