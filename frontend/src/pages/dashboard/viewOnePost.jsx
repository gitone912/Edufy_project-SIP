import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import React from "react";
  import { Link } from "react-router-dom";
  import { useGetPostsQuery } from "@/services/userAccountApi";
  import { useParams } from "react-router-dom";
  
  export function ViewPost() {
    const { postId } = useParams();
    const postsResponse = useGetPostsQuery(postId);
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
  
        <div >
          <Card >
            <CardBody className="p-4">
              <CardHeader
                variant="gradient"
                color="blue"
                className="mb-8 p-6 rounded-t-lg"
              >
                <Typography variant="h6" color="white">
                  Post
                </Typography>
              </CardHeader>
  
              <div className="px-4 pb-4">
                <Typography variant="h6" color="blue-gray-500" className="mb-2">
                  All Posts
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  Latest Posts
                </Typography>
  
                <div className="mt-6 ">
                  <Card color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 rounded-t-lg "
                    >
                      <img
                        src={res && res.img}
                        alt="Post Image"
                        className="h-full w-full  rounded-t-lg "
                      />
                    </CardHeader>
  
                    <CardBody className="py-0 px-2">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {res && res.user}
                      </Typography>
  
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
  
                    <CardFooter className="mt-6 flex items-center justify-between py-2 px-4">
                      <div>
                        <Button
                          color="blue"
                          ripple="light"
                          size="regular"
                          buttonType="outline"
                          rounded={false}
                          block={false}
                          iconOnly={false}
                          // Replace "fas fa-heart" with appropriate icon class
                          icon={<i className="fas fa-heart"></i>}
                        >
                          {res && res.likes_count}
                        </Button>
  
                        <Button
                          color="blue"
                          ripple="light"
                          size="regular"
                          buttonType="outline"
                          rounded={false}
                          block={false}
                          iconOnly={false}
                          // Replace "fas fa-comment" with appropriate icon class
                          icon={<i className="fas fa-comment"></i>}
                        >
                          {res && res.comments_count}
                        </Button>
  
                        <Button
                          color="blue"
                          ripple="light"
                          size="regular"
                          buttonType="outline"
                          rounded={false}
                          block={false}
                          iconOnly={false}
                          // Replace "fas fa-share" with appropriate icon class
                          icon={<i className="fas fa-share"></i>}
                        >
                          {res && res.shares_count}
                        </Button>
                      </div>
  
                      <div>
                        <Button
                          color="gray"
                          ripple="light"
                          size="regular"
                          buttonType="outline"
                          rounded={false}
                          block={false}
                          iconOnly={false}
                          // Replace "fas fa-map-marker-alt" with appropriate icon class
                          icon={<i className="fas fa-map-marker-alt"></i>}
                        >
                          {res && res.location}
                        </Button>
  
                        <Button
                          color="gray"
                          ripple="light"
                          size="regular"
                          buttonType="outline"
                          rounded={false}
                          block={false}
                          iconOnly={false}
                        >
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
  