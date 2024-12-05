import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      // Check if the error is a 401 Unauthorized
      if (err.response && err.response.status === 401) {
        // User is not authenticated; set currentUser to null
        dispatch(setCurrentUser(null));
        console.warn("User not authenticated");
      } else {
        // Log other errors
        console.error("An unexpected error occurred:", err);
      }
    } finally {
      setPending(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  if (!pending) {
    return children;
  }
}
