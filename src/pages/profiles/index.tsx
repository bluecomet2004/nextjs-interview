import { useEffect } from "react";
import {
  CircularProgress
} from "@mui/material";
import ProfileTable from "@/components/ProfileTable";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

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
      {
        !profiles ?
          <CircularProgress size={72} className="m-8" />
        : (
          <>
            <h1 className="font-bold text-5xl text-center pt-12">PROFILE LIST</h1>
            <ProfileTable profiles={profiles.results} />
          </>
        )
      }
    </div>
  )
}
