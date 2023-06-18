import { doc, setDoc } from "firebase/firestore";
import { store } from "../firebase/firebaseConfig";
const flag = 0;
export const StoreSubject = (item) => {
  setDoc(doc(store, "Subjects", item.title), {
    SubjectName: item.title,
    ImgUrl: item.url,
  }).catch((e) => {
    flag = 1;
  });
  if (flag != 0) {
    return false;
  }
  return true;
};
