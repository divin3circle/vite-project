import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { auth } from "./config/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import Home from "./components/Home";

function App() {
  const [loading, setLoading] = useState(false);
  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(auth?.currentUser);
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        {auth?.currentUser ? (
          <Home />
        ) : (
          <>
            <SignUp setLoading={setLoading} />
            <SignIn setLoading={setLoading} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
