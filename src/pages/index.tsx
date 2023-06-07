import { useState, useEffect } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import ProfileList from "@/components/ProfileList";
import { generateProfile } from '../utils/profile';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    axios
      .get("https://randomuser.me/api?results=20")
      .then((res) => {
        console.log(res.data);
        setProfiles(res.data.results.map(generateProfile));
      })
      .catch((err) => {
        console.error(err);
        alert("Profile request failed");
      });
  }, []);

  if (!profiles) return <h1>Loading profiles...</h1>;

  return <ProfileList profiles={profiles} />;
}
