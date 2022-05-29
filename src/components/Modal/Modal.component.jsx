import React from "react";
import styles from "./style.module.css";

const Modal = ({ isOpen, setOpen, children }) => {
	return (
		<>
			{isOpen && (
				<div className={styles.overlay}>
					<div className={styles.container}>
						<div className={styles.header}>
							<button
								id={styles.button}
								onClick={() => setOpen(false)}
							>
								<i class="fa-solid fa-xmark" />
							</button>
						</div>
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
