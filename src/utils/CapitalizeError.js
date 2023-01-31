import { toast } from "react-toastify";

export function capitalizeError(error) {
  if (error) {
    toast.error(
      `${error.message.slice(0, 1).toUpperCase()}${error.message.slice(1)}`
    );
  }
}
export function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
