import { forwardRef } from "react";

const Modal = forwardRef(({ onCloseModal, children }, ref) => {
	return (
		<dialog className='modal' ref={ref}>
			<div className='modal-actions' onClick={onCloseModal}>
				test
			</div>
			{children}
		</dialog>
	);
});

export default Modal;