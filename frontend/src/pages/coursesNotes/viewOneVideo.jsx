import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
  import React from "react";
  import { useGetOneVideoQuery } from "@/services/courseServiceApi";
  import { useParams } from "react-router-dom";
  
  export function ViewVideo() {
    const { videoId } = useParams();
    console.log("videoId", videoId);
    const videoResponse = useGetOneVideoQuery(videoId);
    const res = videoResponse.data;
  
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
                  </CardBody>
                </Card>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  