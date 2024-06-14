// import * as dotenv from "dotenv";
// dotenv.config();
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/v1/auth/user-auth"
      );
      if (res.data.ok) {
        console.log("if chala");
        setOk(true);
      } else {
        console.log("else chala");

        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  console.log(ok);

  return ok ? <Outlet /> : <Spinner />;
}
