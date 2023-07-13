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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserToken } from "../../features/authSlice";
import { getToken, storeToken } from "../../services/LocalStorageService";
import { useLoginUserMutation } from "../../services/userAuthApi";
import { Alert } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { storeId } from "../../services/LocalStorageService";
import { useGetUserIdMutation } from "../../services/userAuthApi";
export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState({});
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const [getUserId, { data: responseInfo, error }] = useGetUserIdMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const actualData = {
      email: email,
      password: password,
    };




    // const res3 = await getUserId({
    //   email: actualData.email,
    // });
    // console.log(res3);
    // if (res3.error) {
    //   console.log(res3.error);
    //   setServerError(res3.error);
    // }
    // if (res3.data) {
    //   storeId(res3.data.user_cart_id);
    //   console.log(res3.data.user_cart_id);
    // }



    const res = await loginUser(actualData);
    if (res.error) {
      console.log(res.error.data.data);
      setServerError(res.error.data.data);
    }
    if (res.data) {
      storeToken(res.data.data.token);

      let { access_token } = getToken();
      dispatch(setUserToken({ access_token: access_token }));
      window.location.href = "/dashboard/home";
    }
  };
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
      <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          
          <CardBody className="flex flex-col gap-4">
          {serverError.errors && (
            <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-medium">
              {serverError.errors}
            </Alert>
          )}
          {serverError.non_field_errors && (
            <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-medium">
              {serverError.non_field_errors[0]}
            </Alert>
          )}
            <Input type="email" label="Email" size="lg" id="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required/>
            <Input type="password" label="Password" size="lg" 
              id="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
        </form>
      </div>
    </>
  );
}

export default SignIn;
