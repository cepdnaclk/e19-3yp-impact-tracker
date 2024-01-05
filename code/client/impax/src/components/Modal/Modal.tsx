// import React, { useRef } from "react";
// import { createPortal } from "react-dom";
// import styles from "./Modal.module.scss";

// interface Props {
//   children: string | JSX.Element | JSX.Element[];
//   isOpen: boolean;
//   onClose: () => void;
// }
// const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
//   if (!isOpen) return null;

//   //Click on outside element will close the modal
//   const ModalRef = useRef<HTMLDivElement>(null);
//   const handleOutsideClick = (e: React.MouseEvent) => {
//     if (ModalRef.current && !ModalRef.current.contains(e.target as Node))
//       onClose();
//   };

//   return createPortal(
//     <div className={styles.modalContainer} onClick={handleOutsideClick}>
//       <div ref={ModalRef} className={styles.modal}>
//         <button onClick={onClose}>Close</button>
//         {children}
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default Modal;
