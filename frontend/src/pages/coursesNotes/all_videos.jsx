import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Tooltip,
    Button,
  } from "@material-tailwind/react";
  import React from "react";
  import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
  } from "@heroicons/react/24/solid";
  import { Link } from "react-router-dom";
  import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
  import { conversationsData, projectsData } from "@/data";
  import { useGetLoggedUserQuery } from "@/services/userAuthApi";
  import { getToken } from "../../services/LocalStorageService";
  import { useGetAccountProfileMutation } from "@/services/userAccountApi";
  import { useState, useEffect } from "react";
import { useListAllVideosQuery } from "@/services/courseServiceApi";
import { useParams } from "react-router-dom";
import { useUpdateDashboardMutation } from "@/services/courseServiceApi";
import { useGetOneDashboardQuery } from "@/services/courseServiceApi";
import { getId } from "@/services/LocalStorageService";
  export function AllVideos() {
    const id = getId();
  const Response1 = useGetOneDashboardQuery(id);
  const [updateDashboard, updatePlaylistInfo] = useUpdateDashboardMutation();
  if (Response1.isSuccess) {
    var courses = Response1.data.courses;
    var videos = Response1.data.videos;
    var notes = Response1.data.notes;
    var playlist = Response1.data.playlists;
    var all_notes = Response1.data.all_notes;
    console.log("courses", courses);
    console.log("videos", videos);
    console.log("notes", notes);
    console.log("playlist", playlist);
    console.log("all_notes", all_notes);
    // Separate lists for IDs
    var courseIds = Response1.data.courses.map((course) => course.id);
   
    var videoIds = Response1.data.videos.map((video) => video.id);

    var noteIds = Response1.data.notes.map((note) => note.id);

    var playlistIds = Response1.data.playlists.map((playlist) => playlist.id);

    var allNoteIds = Response1.data.all_notes.map((note) => note.id);
    console.log("courseIds", courseIds);
  }
    const {courseId} = useParams();
    console.log("courseId",courseId)
    const videosResponse = useListAllVideosQuery();
    const filteredVideos = videosResponse.data?.filter(
      (video) => video.course === parseInt(courseId)
    );
    const viewVideo = (videoId) => {
      videoIds.push(videoId);
    updateDashboard(
      {
        id: id,
        courses: courseIds,
        videos: videoIds,
        notes: noteIds,
        playlists: playlistIds,
        all_notes: allNoteIds,
      }
    );
      window.location.href = `view-video/${videoId}`;
    }

    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8"></div>
  
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
          <CardBody className="p-4">
            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                Posts
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
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
                {filteredVideos?.map(
                  ({
                    img,
                    id,
                    title,
                    description,
                    codes,
                    video_link,
                    videoNumber,
                    
                  }) => (
                    <Card key={title} color="transparent" shadow={false}>
                      <CardHeader
                        floated={false}
                        color="gray"
                        className="mx-0 mt-0 mb-4 h-full xl:h-full w-full rounded-none bg-transparent"
                      >
                        <img
                          src={img}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
                      </CardHeader>
                      <CardBody className="py-0 px-1">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {videoNumber}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mt-1 mb-2"
                        >
                          {title}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {description}
                        </Typography>
                      </CardBody>
                      <div class="px-6 pt-4 pb-2"></div>
                      <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                        
                          <Button
                            variant="outlined"
                            size="sm"
                            type="submit"
                            onClick={() => viewVideo(id)}
                          >
                            view video
                          </Button>
                       
                      </CardFooter>
                    </Card>
                  )
                )}
              </div>
            </div>
          </CardBody>
        </Card>
        
      </>
    );
  }
  

  