import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useGetOneVideoQuery } from "@/services/courseServiceApi";
import { useParams } from "react-router-dom";
import { useGetLoggedUserQuery } from "@/services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";
import { useUpdateWeeklyUpdateMutation, useUpdateMonthlyUpdateMutation } from "@/services/courseServiceApi";

export function ViewVideo() {
  const { access_token } = getToken();
  const [profileDetails, setProfileDetails] = useState(null);
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);
  const { videoId } = useParams();
  console.log("videoId", videoId);
  const videoResponse = useGetOneVideoQuery(videoId);
  const res = videoResponse.data;
  const [weekly, setWeekly] = useState(null);

  const handleEmailFetch = async (videoDurationInHours) => {
    try {
      if (loggedUser && loggedUser.data && loggedUser.data.email) {
        const email = loggedUser.data.email;
        console.log("Email", email);
        const weeklyUpdateData = {
          user_email: email,
          hours_spent: videoDurationInHours
        };
        const monthlyUpdateData = {
          user_email: email,
          hours_spent: videoDurationInHours, // Update this value with appropriate data
        };
        console.log("weeklyUpdateData", weeklyUpdateData);
        console.log("monthlyUpdateData", monthlyUpdateData);
        // Call the mutations
        sendWeeklyUpdate(weeklyUpdateData);
        sendMonthlyUpdate(monthlyUpdateData);

        // Here, you can also implement the logic to send the data via email
        // For demonstration purposes, we're just logging the data to the console.
        console.log("Weekly Update Data:", weeklyUpdateData);
        console.log("Monthly Update Data:", monthlyUpdateData);
      } else {
        console.error("Logged user or email not available.");
      }
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
    }
  };

  const [updateWeeklyUpdate] = useUpdateWeeklyUpdateMutation();
  const [updateMonthlyUpdate] = useUpdateMonthlyUpdateMutation();

  const sendWeeklyUpdate = (data) => {
    try {
      const response = updateWeeklyUpdate(data);
      console.log("Weekly Update Mutation Response:", response);
    } catch (error) {
      console.error("Failed to update weekly data:", error);
    }
  };

  const sendMonthlyUpdate = (data) => {
    try {
      const response = updateMonthlyUpdate(data);
      console.log("Monthly Update Mutation Response:", response);
    } catch (error) {
      console.error("Failed to update monthly data:", error);
    }
    window.location.href = "/dashboard/home";
  };
    return (
      <div>
        <Card>
          <CardBody className="p-4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 p-6 rounded-t-lg"
            >
              <Typography variant="h6" color="white">
                Video
              </Typography>
            </CardHeader>
  
            <div className="px-4 pb-4">
              <Typography variant="h6" color="blue-gray-500" className="mb-2">
                All Videos
              </Typography>
              <Typography variant="small" className="font-normal text-blue-gray-500">
                Latest Videos
              </Typography>
  
              <div className="mt-6">
                <Card color="transparent" shadow={false}>
                  <CardHeader
                    floated={false}
                    color="gray"
                    className="mx-0 mt-0 mb-4 rounded-t-lg"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <iframe
                      src={res && res.video_link}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full absolute top-0 left-0"
                    />
                  </CardHeader>
  
                  <CardBody className="py-0 px-2">
                    <Typography
                      variant="h5"
                      color="blue-gray-800"
                      className="mt-1 mb-2"
                    >
                      {res && res.title}
                    </Typography>
  
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {res && res.description}
                    </Typography>
                    <Button

                      color="lightBlue"
                      buttonType="filled"
                      size="small"
                      rounded={false} d
                      iconOnly={false}
                      ripple="light"
                      className="mt-4"
                      onClick={() => handleEmailFetch(res?.videoDurationInHours)}
                    >
                     click if completed { res?.videoDurationInHours} Minutes
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  