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
import { useGetOneDashboardQuery } from "@/services/courseServiceApi";
import { getId } from "@/services/LocalStorageService";
import Error404 from "../NoAuth404";
import { useGetUserMonthlyRepMutation } from "@/services/courseServiceApi";
import { useGetUserWeeklyRepMutation } from "@/services/courseServiceApi";
import { useGetLoggedUserQuery } from "@/services/userAuthApi";
import { getToken } from "@/services/LocalStorageService";
import { useState,useEffect } from "react";
import { chartsConfig } from "@/configs";
export function Home() {




  const id = getId()
  const Response = useGetOneDashboardQuery(id);
  const { access_token } = getToken();
  const [profileDetails, setProfileDetails] = useState(null);
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);
  const [getUserWeeklyReport, { isLoading: isProfileLoading }] = useGetUserWeeklyRepMutation();
  const [getUserMonthlyReport, { isLoading: isProfileLoading1 }] = useGetUserMonthlyRepMutation();
  const [weekly, setWeekly] = useState(null);
  const [monthly, setMonthly] = useState(null);
  
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
  const handlevideoClick = (videoId) => {
    window.location.href = `courses/view-video/${videoId}`;
  };
  useEffect(() => {
  }, [loggedUser]);
  const handleEmailFetch = async () => {
    try {
      if (loggedUser && loggedUser.data && loggedUser.data.email) {
        const email = loggedUser.data.email;
        console.log("Email", email);
        const Weeklyresponse = await getUserWeeklyReport(email);
        const Monthlyresponse = await getUserMonthlyReport(email);
        setWeekly(Weeklyresponse.data);
        setMonthly(Monthlyresponse.data);  
      } else {
        console.error("Logged user or email not available.");
      }
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
    }
  };
  useEffect(() => {
    handleEmailFetch();
  }, [loggedUser]);


  const getCurrentWeekNumber = () => {
    const now = new Date();
    const dayOfMonth = now.getDate();
    const weekNumber = Math.ceil(dayOfMonth / 7);
    
    return weekNumber;
  };

  // Function to get the current month number
  const getCurrentMonthNumber = () => {
    const now = new Date();
    const monthNumber = now.getMonth() + 1;
    return monthNumber;
  };

  // Use the current week and month number to filter the data
  const currentMonthNumber = getCurrentMonthNumber();
  const currentWeekNumber = getCurrentWeekNumber();
  console.log("weekNumber", currentWeekNumber);

  const weeklyData = weekly?.filter(
    (data) =>
      data.week_number === currentWeekNumber && data.month_number === currentMonthNumber
  );
  const monthlyData = monthly?.filter(
    (data) => data.month === currentMonthNumber
  );

  const websiteViewsChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Minutes",
        data: weeklyData ? weeklyData.map((data) => data.hours_watched) : [],

      },
    ],
    options: {
      ...chartsConfig,
      colors: "#fff",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: weekly ? weeklyData.map((data) => `${data.weekday}`) : [],
      },
    },
  };

  const dailySalesChart = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Minutes",
        data: monthly ? monthly.map((data) => data.hours_watched) : [],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#fff"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: monthly ? monthly.map((data) => `${data.month}`) : [],
      },
    },
  };

  const completedTasksChart = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Tasks",
        data: weeklyData ? weeklyData.map((data) => data.playlists_completed) : [],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#fff"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: weekly ? weeklyData.map((data) => data.weekday) : [],
      },
    },
  };

  const statisticsChartsData = [
    {
      color: "blue",
      title: "Weekly View",
      description: "Weekly performance Minutes spent on learning",
      footer: "last updated on Monday",
      chart: websiteViewsChart,
    },
    {
      color: "pink",
      title: "Monthly view",
      description: "Monthly performance Minutes spent on learning",
      footer: "last updated 1st June 2023",
      chart: dailySalesChart,
    },
    {
      color: "green",
      title: "Completed Tasks",
      description: "Completed Tasks in a week",
      footer: "last updated yesterday",
      chart: completedTasksChart,
    },
  ];



if (Response.isLoading) return <div>Loading.....</div>;
  if (Response.isError) return <div>{Response.error.message}<Error404/> </div>;
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
                  <strong>Previous 5 Videos</strong>
                  
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
                {videos?.slice(0, 5).reverse().map(({ id, title, description, codes, video_link, videoNumber, course }) => {
  const className = `py-3 px-5 ${
    id === videos[videos.length - 1].id ? "" : "border-b border-blue-gray-50"
  }`;

  return (
    <tr key={id}>
      <td className={className}>{title}</td>
      <td className={className}>{description}</td>
      <td className={className}>{codes}</td>
      <td className={className}>
        <button onClick={() => handlevideoClick(id)} className="bg-grey-100 text-blue-900">
          View Video
        </button>
      </td>
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
                Saved Notes
              </Typography>
            </CardHeader>
            <CardBody className="pt-0">
              {notes?.map(
                ({ id,icon, color, title, content }, key) => (
                  <div key={title} className="flex items-start gap-4 py-3">
                    <div
                      className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] `}
                    >
                      
             {<i className={"fa-brands fa-" + icon + " fa-2xl text-blue"}></i>}
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
