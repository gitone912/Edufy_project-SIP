import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Alert,
  Avatar,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useGetOnePlaylistQuery } from "@/services/courseServiceApi";
import { Navbar, Footer } from "@/widgets/layout";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

export function VideoList() {
  const navbarRoutes = [
    {
      name: "dashboard",
      path: "/dashboard/home",
      icon: ChartPieIcon,
    },
    {
      name: "profile",
      path: "/dashboard/home",
      icon: UserIcon,
    },
  ]
  const {playlistId }=  useParams();
  const [videos, setVideos] = useState([]);
    const Response = useGetOnePlaylistQuery(playlistId);
    const res = Response.data;
    useEffect(() => {
        if (res) {
            setVideos(res.all_videos);
        }
    }, [res]);

  

  return (
    <>
    <style>
      {`
      `}
    </style>
     <div className="relative min-h-screen w-full">
      <div className="container relative z-40 mx-auto p-4">
        <Navbar routes={navbarRoutes} />
      </div>
    {videos?.map(({ id, title, description, course,video_link }) => (
     <p>{title} {video_link}</p>
      ))}
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-black">
        <Footer />
      </div>
    </div>
         
            
          
    </>
  );
}
