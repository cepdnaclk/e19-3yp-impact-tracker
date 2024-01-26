import Swal from "sweetalert2";

export const showPopup = async (title: string, text: string) => {
  await Swal.fire({
    icon: "error",
    title: title,
    text: text,
    background: "#000000",
    iconColor: "#FF0000",
    confirmButtonColor: "#FF0000",
  });
};
