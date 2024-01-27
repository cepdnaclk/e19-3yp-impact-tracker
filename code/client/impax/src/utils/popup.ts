import Swal from "sweetalert2";

export const showErrorPopup = async (title: string, text: string) => {
  await Swal.fire({
    icon: "error",
    title: title,
    text: text,
    background: "#000000",
    iconColor: "#FF0000",
    confirmButtonColor: "#FF0000",
  });
};



export const showSuccessPopup = async (title: string, text: string) => {
  await Swal.fire({
    icon: "success",
    title: title,
    text: text,
    background: "#000000",
    iconColor: "#5cb85c",
    confirmButtonColor: "#5cb85c",
  });
};