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
  ];
  const { playlistId } = useParams();
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
      <div className="grid grid-cols-4 gap-4 h-screen">
        <div className="col-span-1 p-4">
          <div className="h-full w-full">
            {videos?.map(({ id, title, description, course, video_link }) => (
              <p key={id} className="cursor-pointer" onClick={() => window.open(video_link, "_blank")}>
                {title}
              </p>
            ))}
          </div>
        </div>
        <div className="col-span-3">
          <div className="embed-responsive embed-responsive-16by9 relative w-full h-full">
            <iframe
              className="embed-responsive-item absolute bottom-0 left-0 right-0 top-0 h-full w-full"
              src="https://www.youtube.com/embed/vlDzYIIOYmM?enablejsapi=1&origin=https%3A%2F%2Fmdbootstrap.com"
              allowFullScreen
              data-gtm-yt-inspected-2340190_699="true"
              id={240632615}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2 col-end-7">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="dark:border-neutral-500 dark:bg-neutral-600 border-b bg-white font-medium">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          First
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700 border-b">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          1
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">Mark</td>
                      </tr>
                      <tr className="dark:border-neutral-500 dark:bg-neutral-600 border-b bg-white">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          2
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                      </tr>
                      <tr className="bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700 border-b">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          3
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
