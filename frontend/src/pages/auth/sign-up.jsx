import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/userAuthApi";
import { storeToken, storeId } from "../../services/LocalStorageService";
import { Alert } from "@material-tailwind/react";
import { useCreateAccountProfileMutation } from "@/services/userAccountApi";
import { useCreateDashboardMutation } from "@/services/courseServiceApi";
import { v4 as uuidv4 } from 'uuid';

export function SignUp() {

  const [server_error, setServerError] = useState({});
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [createUser, responseInfo] = useCreateAccountProfileMutation();
  const [createDashboard, responseInfo1] = useCreateDashboardMutation();
  // const [saveUserId, responseInfo2] = useSaveUserIdMutation();
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
      terms: data.get("terms"),
    };

   
    const res = await registerUser(actualData);
    const response = await createUser({ user: actualData.email,name: actualData.name });
    const DashboardResponse = await createDashboard({ user: actualData.email });
    // console.log("res", res);
    // console.log("res", response);
    // console.log("res", DashboardResponse);

    if (res.error) {
      setServerError(res.error.data.errors);
    }

    

      storeToken(res.data.data.token);
      storeId(DashboardResponse.data.id);
      
     

      // console.log(userId, actualData.name, actualData.email);

        window.location.href = "/dashboard/home";
        if (res.isLoading) return <div>is loading......</div>;
  if (res.isError)
    return <div>error occurred {res.error.error}</div>;
  if (isLoading) return <div>is loading......</div>;
      
    }
  

  
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
        <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Full Name" size="lg" type="text"
                  name="name"
                  required/>
                  {server_error.name ? (
                <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-small">
                  {server_error.name[0]}
                </Alert>
              ) : null}
            <Input type="email" label="Email" size="lg" id="email"
                  name="email"
                  
                  autoComplete="email"
                  required/>
                  {server_error.email ? (
                <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-small">
                  {server_error.email[0]}
                </Alert>
              ) : null}
            <Input type="password" label="Password" size="lg" id="password"
                  name="password"
                 
                  autoComplete="current-password"
                  required/>
                   {server_error.password ? (
                <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-small">
                  {server_error.password}
                </Alert>
              ) : null}
            <Input type="password" label="Confirm Password" size="lg"  id="password"
                  name="confirmPassword"
                  
                  required/>
                  {server_error.confirmPassword ? (
                <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-small">
                  {server_error.confirmPassword[0]}
                </Alert>
              ) : null}
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" name="terms"
              id="terms"/>
            </div>
            {server_error.terms ? (
              <span style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>
                {server_error.terms[0]}
              </span>
            ) : null}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
