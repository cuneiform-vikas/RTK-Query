import React from "react";
import { useGetAllUsersQuery } from "../features/usersApi";
import { Link } from "react-router-dom";

const Read = () => {
  const { data, error, isLoading } = useGetAllUsersQuery();

  return (
    <div className="list">
      {error ? (
        <h1>Oh no, there was an error</h1>
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : data ? (
        <ol>
          {data.map((user) => (
            <li key={user.id}>
              <Link to={`/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
};

export default Read;
