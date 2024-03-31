import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
type Trip = {
  id: number;
  destination: string;
  date: string;
};

type User = {
  id: string;
  userBio: {
    id: string;
    name: string;
    email: string;
    age: number;
    followers: number;
    following: number;
    bio: string;
  };
  trips: {
    myTrips: Trip[];
    upcomingTrips: Trip[];
  };
};
function Home() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const user = auth?.currentUser;
  const userRef = collection(db, "users");
  const q = query(userRef, where("id", "==", user?.uid));

  useEffect(() => {
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setUserData(doc.data() as User);
        });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, [q]);
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error, "error");
    }
  };
  const increaseFollowers = async () => {
    try {
      setLoading(true);
      const user = auth?.currentUser;
      if (userData && user) {
        const newFollowers = Math.floor(Math.random() * 100);
        const updatedData = {
          ...userData,
          userBio: {
            ...userData.userBio,
            followers: userData.userBio.followers + newFollowers,
          },
        };
        setUpdatedUser(updatedData);
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, updatedData);
        setUserData(updatedData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome {user?.email}</h2>
      <h2>{userData?.userBio.followers} Followers</h2>
      <p>{userData?.trips.myTrips.length} My Trips</p>
      <p>{userData?.trips.upcomingTrips.length} Upcoming Trips</p>
      <button onClick={logOut}>Sign Out</button>
      <div style={{ margin: 10 }}>
        <button onClick={increaseFollowers}>Increase Followers</button>
      </div>
    </div>
  );
}

export default Home;
