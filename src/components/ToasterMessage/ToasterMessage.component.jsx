import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ToasterMessage = () => {
	return (
		<>
			<Toaster toastOptions={{ duration: 5000 }} />
		</>
	);
};

export { toast };

export default ToasterMessage;
