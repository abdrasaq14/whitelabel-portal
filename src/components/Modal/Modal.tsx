import React, { FunctionComponent, useRef } from "react";
import useOnClickOutside from "../../hooks/useClickOutside";
import clsx from "clsx";

interface ModalPropsInterface {
	onClick?: () => void;
	children: React.ReactNode;
	open: boolean;
	header?: any;
	className?: string
}

const Modal: FunctionComponent<ModalPropsInterface> = ({ children, onClick = () => { }, open, header, className }) => {
	const modalRef = useRef<any>();

	useOnClickOutside(modalRef, () => {
		onClick();
	});

	return (
		<>
			{open && (
				<div className="modal-background fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-70 z-[90]">
					<div className="flex items-end md:items-center justify-around min-w-44 h-screen">
						<div
							ref={modalRef}
							className={clsx(
								"items-center align-middle max-w-4xl bg-white rounded",
								className
							)}
						>
							<div className="modal-head flex border-b justify-between items-center px-3 py-3 ">
								<h3 className="text-xl text-[#111111] font-semibold">{header}</h3>
								<a
									onClick={onClick}
									href="#"
									role="button"
									className="focus:outline-none ml-auto focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
								>
									<img src="/icons/close-circle.svg"/>
								</a>
							</div>
							<div className="modal-body py-5">{children}</div>
						</div>
					</div>
				</div>
			)}
		</>

	);
};

export default Modal;
