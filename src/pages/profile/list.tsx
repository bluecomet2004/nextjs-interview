import { useState, useEffect } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import {
  CircularProgress
} from "@mui/material";
import ProfileTable from "@/components/ProfileTable";
import Swal from "sweetalert2";

const inter = Inter({ subsets: ["latin"] });

export default function ProfileList() {
  const [profiles, setProfiles]: any = useState(null);

  useEffect(() => {
    axios.get('https://randomuser.me/api?results=50')
      .then(({data}) => {
        setProfiles(data.results);
      })
      .catch(error => {
        Swal.fire({
          title: "Failed",
          icon: "error",
          text: "Cannot load the data."
        });

        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-5xl text-center pt-12">PROFILE LIST</h1>

      {
        !profiles ? <CircularProgress size={72} /> : <ProfileTable profiles={profiles} />
      }
    </div>
  )
}
