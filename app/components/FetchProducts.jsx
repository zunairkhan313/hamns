"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const getAllCheckouts = async () => {
  try {
    const res = await fetch("api/checkout", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading topics: ", error);
    return null; // Return null in case of error
  }
};

const UserAddress = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCheckouts();
      console.log("checkouts", result?.Checkouts);
  
      setData(
        result?.Checkouts?.filter(
          (item) => item?.email
        )?.reverse()[0]
      );
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error loading no information available.</div>;
  }

  return (
    <>
      {
        <div key={data?._id}>
          <p className="font-text">Email : {data?.email}</p>
          <br />
          <p className="font-text">Phone Number : {data?.num}</p>
          <br />
          <p className="font-text">Name : {data?.name}</p>
          <br />
          <p className="font-text">Country : {data?.country}</p>
          <br />
          <p className="font-text">City : {data?.city}</p>
          <br />
          <p className="font-text">Address : {data?.address}</p>
          <br />
        </div>
      }
    </>
  );
};

export default UserAddress;
