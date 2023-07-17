import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useUpdateAccountProfileMutation } from "@/services/userAccountApi";
import { useGetAccountProfileMutation } from "@/services/userAccountApi";
import { getToken } from "@/services/LocalStorageService";
import { useGetLoggedUserQuery } from "@/services/userAuthApi";
import { useEffect } from "react";

export function EditProfile() {
  const { access_token } = getToken();
  const [updateProfile, responseInfo] = useUpdateAccountProfileMutation();
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);

  useEffect(() => {}, [loggedUser]);

  const handleUpdateProfile = async (e) => {
    try {
      if (loggedUser && loggedUser.data && loggedUser.data.email) {
        const email = loggedUser.data.email;
        const name = loggedUser.data.name;
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = {
          name: name,
          user: email,
          description: formData.get("description"),
          location: formData.get("location"),
          skills: formData.get("skills"),
          mobileNumber: formData.get("mobileNumber"),
          social_link1: formData.get("social_link1"),
          social_link2: formData.get("social_link2"),
          social_link3: formData.get("social_link3"),
        };
        console.log("data", data);
        const response = await updateProfile(data);
        console.log("response", response);
        window.location.href = "/dashboard/profile";
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  if (responseInfo.isLoading) return <div>is loading......</div>;
  if (responseInfo.isError)
    return <div>error occured {responseInfo.error.error} </div>;
  

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Edit Profile
          </Typography>
        </CardHeader>
        <CardBody className="flex items-center justify-center overflow-x-scroll px-0 pt-0 pb-2">
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleUpdateProfile}>
            <div className="mb-4 flex flex-col gap-6">
            <Typography color="gray">Profile Information</Typography>
            <Input size="lg" label="Name" value={loggedUser?.data.email} readOnly />
<Input size="lg" label="Email" value={loggedUser?.data.name} readOnly />

              <Input size="lg" label="Description"  name="description" required/>
              <Input size="lg" label="Location" name="location" required/>
              <Input size="lg" label="Skills" name="skills" required/>
              <Input size="lg" label="Mobile Number" name="mobileNumber"/>
              <Input size="lg" label="Instagram" name="social_link1" />
              <Input size="lg" label="linked In" name="social_link2"/>
              <Input size="lg" label="Facebook" name="social_link3"/>
              
            </div>

            <Button className="mt-6" fullWidth type="submit">
              Update
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
