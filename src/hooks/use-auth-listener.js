import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
  const { app } = useContext(FirebaseContext);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userAuth"))
  );

  useEffect(() => {
    const listener = app.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        localStorage.setItem("userAuth", JSON.stringify(userAuth));
        setUser(userAuth);
      } else {
        localStorage.removeItem("userAuth");
        setUser(null);
      }
    });

    return () => {
      listener();
    };
  }, [app]);

  return { user };
}
