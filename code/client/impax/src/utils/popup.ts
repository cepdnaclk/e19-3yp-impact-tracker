import Swal, { SweetAlertIcon } from "sweetalert2";

export const showPopup = async (type:string,title: string, text: string) => {
  await Swal.fire({
    icon: type as SweetAlertIcon,
    title: title,
    text: text,
    background: "#000000",
    iconColor: "#FF0000",
    confirmButtonColor: "#FF0000",
  });
};
