import { storeToRefs } from "pinia";
import { useToastStore } from "@/store/toast";
import { toast } from "vue3-toastify";

export default function useToast() {
  const { currToastId } = storeToRefs(useToastStore());

  const setLoadingToast = (msg: string) => {
    removeCurrToast();

    const loadingToastId = toast(msg, {
      type: "loading",
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });

    currToastId.value = loadingToastId;
  };

  const setErrorToast = (msg: string) => {
    removeCurrToast();

    const errorToastId = toast(msg, {
      type: "error",
      position: toast.POSITION.BOTTOM_CENTER,
      closeOnClick: false,
    });

    currToastId.value = errorToastId;
  };

  const removeCurrToast = () => {
    if (currToastId.value) {
      toast.remove(currToastId.value);
      currToastId.value = null;
    }
  };

  return { setLoadingToast, setErrorToast, removeCurrToast };
}
