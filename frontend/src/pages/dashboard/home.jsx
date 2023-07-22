import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { useGetOneDashboardQuery } from "@/services/courseServiceApi";
import { getId } from "@/services/LocalStorageService";
import Error404 from "../NoAuth404";
export function Home() {
  const id = getId()
  const Response = useGetOneDashboardQuery(id);
  if (Response.isLoading) return <div>Loading...</div>;
  if (Response.isError) return <div>{Response.error.message}<Error404/> </div>;
  if(Response.isSuccess){
    var courses = Response.data.courses
    var videos = Response.data.videos
    var notes = Response.data.notes
    var playlist = Response.data.playlists
    console.log("courses",courses)
    console.log("videos",videos)
    console.log("notes",notes)
    console.log("playlist",playlist)
  }
  const handleClick = (NotesId) => {
    window.location.href = `/notes/${NotesId}`;
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossOrigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <Typography variant="h5" color="black" className="mb-1">
        Your selected Playlists
      </Typography>
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {playlist?.map(({ icon, title,footerLabel, total_hours_playlist,color }) => (
            <StatisticsCard
              key={title}
              value ={total_hours_playlist}
              title="Total Time Of Plalist"
              color= {color}
              icon={<i className={"fa-brands fa-" + icon + " fa-2xl text-white"}></i>}

              // {React.createElement(icon, {
              //   className: "w-6 h-6 text-white",
              // })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                 
                  &nbsp;{footerLabel}
                </Typography>
              }
            />
          ))}
        </div>
        
        <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map((props) => (
            <StatisticsChart
              key={props.title}
              {...props}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          ))}
        </div>
        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-2">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  Courses Overview
                </Typography>
                <Typography
                  variant="small"
                  className="flex items-center gap-1 font-normal text-blue-gray-600"
                >
                  <CheckIcon
                    strokeWidth={3}
                    className="h-4 w-4 text-blue-500"
                  />
                  <strong>Ongoing</strong>
                </Typography>
              </div>
              <Menu placement="left-start">
                <MenuHandler>
                  <IconButton size="sm" variant="text" color="blue-gray">
                    <EllipsisVerticalIcon
                      strokeWidth={3}
                      fill="currenColor"
                      className="h-6 w-6"
                    />
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem>Action</MenuItem>
                  <MenuItem>Another Action</MenuItem>
                  <MenuItem>Something else here</MenuItem>
                </MenuList>
              </Menu>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      "Title",
                      "Description",
                      "Codes",
                      "Video Link",
                      "Video Number",
                      "Course",
                    ].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {videos?.map(({ id, title, description, codes, video_link, videoNumber, course }) => {
                    const className = `py-3 px-5 ${
                      id === videos[videos.length - 1].id
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={id}>
                        <td className={className}>{title}</td>
                        <td className={className}>{description}</td>
                        <td className={className}>{codes}</td>
                        <td className={className}>
                          <a
                            href={video_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Video Link
                          </a>
                        </td>
                        <td className={className}>{videoNumber}</td>
                        <td className={className}>{course}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Todo Tasks
              </Typography>
            </CardHeader>
            <CardBody className="pt-0">
              {notes?.map(
                ({ id,icon, color, title, content }, key) => (
                  <div key={title} className="flex items-start gap-4 py-3">
                    <div
                      className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                        key === ordersOverviewData.length - 1
                          ? "after:h-0"
                          : "after:h-4/6"
                      }`}
                    >
                      
             {<i className={"fa-brands fa-" + icon + " fa-2xl text-"+color}></i>}
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium"
                      >
                        {title}
                      </Typography>
                      <Typography
                        as="span"
                        variant="small"
                        className="text-xs font-medium text-blue-gray-500"
                      >
                        {content}
                      </Typography>
                      
                    </div>
                    <button
                    onClick={() => handleClick(id)} // Pass the playlist ID when the button is clicked
                    className="bg-grey-100 text-blue-900 "
                  >
                    View Notes
                  </button>
                  </div>
                )
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
