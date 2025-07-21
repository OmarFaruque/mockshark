'use client'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (!userId) return;

    axios
      .get(`https://mockshark-backend.vercel.app/api/v1/customer/auth/users/${userId}`)
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        console.error("User fetch failed", err);
      });
  }, []);

  return user;
}
