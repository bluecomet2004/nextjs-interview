import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { Chip, CircularProgress, Grow } from '@mui/material';
import { Card, Avatar } from '@mui/material';
import { User } from "@/utils/types";
import { formatDate } from "@/utils/functions";

export default function ProfileDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { payload: profiles } = useSelector((store: any) => store.results);
  const [user, setUser]: any = useState(null);
  
  useEffect(() => {
    if(!profiles) {
      router.push('/');
    } else {
      setUser(profiles.results.find((profile: User) => profile.login.uuid === id));
    }
  }, [profiles, router, id]);

  return (
    <div className="flex flex-col justify-center items-center">
      {
        !profiles ?
          <CircularProgress size={72} className="m-8" />
        : (
          user &&
          <div>
            <h1 className="font-bold text-5xl text-center pt-12">USER DETAILS</h1>
            <Link href={'/profiles'} className="hover:text-blue-500 hover:underline">BACK</Link>

            <Grow in={true}>
              <Card className="flex flex-col md:flex-row items-center mt-4 p-8 overflow-visible">
                <div className="w-72 h-72 p-2 border-2 border-grey">
                  <Avatar src={user.picture.large} className="w-full h-full rounded-none" />
                </div>

                <div className="p-4 pl-8">
                  <h1 className="text-3xl pb-3">{user.name.title}. {user.name.first} {user.name.last}</h1>
                  <Chip label={user.nat} variant="outlined" className="mr-1" />
                  <Chip label={user.gender} variant="outlined" className="mr-1" />
                  <Chip label={user.email} variant="outlined" className="mr-1" />

                  <p className="text-lg pt-6">Birthday: {formatDate(user.dob.date)}</p>
                  <p className="text-lg pt-3">Address: {user.location.street.number} {user.location.street.name} {user.location.city}, {user.location.state}, {user.location.country}</p>
                  <p className="text-lg pt-3">Cell: {user.cell}</p>
                  <p className="text-lg pt-3">Phone: {user.phone}</p>
                  <p className="text-lg pt-3">Signed: {formatDate(user.registered.date)}</p>
                </div>
              </Card>
            </Grow>
          </div>
        )
      }
    </div>
  )
}