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
  import { getToken } from '../../services/LocalStorageService'
  import { useGetAccountProfileMutation } from "@/services/userAccountApi";
  import { useState, useEffect } from "react";
  import { useGetPostsQuery } from "@/services/userAccountApi";
  import { useParams } from "react-router-dom";
  
  export function ViewPost() {
    const { access_token } = getToken();
    const { postId } = useParams();
    console.log("Post ID", postId);
    const postsResponse = useGetPostsQuery(postId);
  
    console.log("Posts",postsResponse.data)
    const res = postsResponse.data;
      
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
          <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
            <CardBody className="p-4">
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
                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                  <Card color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src="http://127.0.0.1:8000/media/post_img/s.jpeg"
                        alt="Post Image"
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {res && res.user}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
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
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <div>
                        <Button color="gray" ripple="light">
                          <i className="fas fa-heart"></i> {res && res.likes_count}
                        </Button>
                        <Button color="gray" ripple="light">
                          <i className="fas fa-comment"></i> {res && res.comments_count}
                        </Button>
                        <Button color="gray" ripple="light">
                          <i className="fas fa-share"></i> {res && res.shares_count}
                        </Button>
                      </div>
                      <div>
                        <Button color="gray" ripple="light">
                          <i className="fas fa-map-marker-alt"></i> {res && res.location}
                        </Button>
                        <Button color="gray" ripple="light">
                          {res && res.hashtags}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
  