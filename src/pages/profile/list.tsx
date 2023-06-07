import { useEffect } from "react";
import {
  CircularProgress
} from "@mui/material";
import ProfileTable from "@/components/ProfileTable";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function ProfileList() {
  const { payload: profiles } = useSelector((store: any) => store.results);
  const router = useRouter();

  useEffect(() => {
    if(!profiles) {
      router.push('/');
    }
  }, [profiles, router]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-5xl text-center pt-12">PROFILE LIST</h1>

      {
        !profiles ?
          <CircularProgress size={72} className="m-8" />
        : <ProfileTable profiles={profiles.results} />
      }
    </div>
  )
}
