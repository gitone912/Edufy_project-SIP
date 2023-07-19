import React from "react";
import {
  Typography,
  Alert,
  Avatar,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useListAllCourseQuery } from "@/services/courseServiceApi";

export function AllCourses() {
  const courseResponse = useListAllCourseQuery();
  const res = courseResponse.data;
  console.log("Courses", res);

  return (
    <div className="mx-auto my-20">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Courses
          </Typography>
        </CardHeader>
        <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              All Posts
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              latest posts
            </Typography>
            <div className="mt-6 grid grid-cols-2 gap-12 md:grid-cols-3 xl:grid-cols-4">
            {res?.map(({ id, title, description }) => (
    <Card
      key={id}
      shadow={false}
      className="relative grid h-[20rem] w-full max-w-[15rem] items-end justify-center overflow-hidden text-center md:w-[100%] lg:w-[100%] p-4"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center bg-[url('https://source.unsplash.com/random/')]`}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12">
        <Typography variant="h2" color="white" className="mb-6 font-medium leading-[1.5]">
          {title}
        </Typography>
        <Typography variant="h5" className="mb-4 text-gray-400">
          {description}
        </Typography>
      </CardBody>
    </Card>
  ))}
            </div>
          </div>
      </Card>
    </div>
  );
}
