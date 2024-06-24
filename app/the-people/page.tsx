"use client";
import React, { useEffect, useState } from "react";

const RandomPeoplePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const response = await fetch("https://jsonplaceholder.org/users");
        const data = await response.json();
        setUsers(data);
      };
      getPosts();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        users &&
        users.map((u) => {
          return <div>{u["firstname"]}</div>;
        })
      )}
    </div>
  );
};

export default RandomPeoplePage;
