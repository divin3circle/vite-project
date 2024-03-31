import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useState } from "react";
import { db } from "../config/firebase.js";
import { addDoc, collection } from "firebase/firestore";

type SignUpProps = {
  setLoading: (loading: boolean) => void;
};

function SignUp({ setLoading }: SignUpProps) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const userRef = collection(db, "users");

  const signUp = async () => {
    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(userRef, {
        id: user.user.uid,
        userBio: {
          id: user.user.uid,
          name: email,
          email: email,
          age: 0,
          followers: 0,
          following: 0,
          bio: "",
        },
        trips: {
          myTrips: [
            {
              id: 1,
              destination: "",
              date: "",
            },
          ],
          upcomingTrips: [
            {
              id: 1,
              destination: "",
              date: "",
            },
          ],
        },
      });
      console.log(user.user.uid);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h4>Sign Up</h4>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;
