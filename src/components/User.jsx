import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../features/usersApi";
import Update from "./Update";

const User = () => {
  const [open, setOpen] = useState(false);

  const { data, error, isLoading } = useGetAllUsersQuery();
  const { id } = useParams();
  const navigate = useNavigate();

  // Delete Method
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      navigate("/");
      // custom reloading behavior
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    setOpen(!open);
  };

  if (error) {
    return <div>Oh no, there was an error</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    const user = data.find((user) => user.id === id);
    return (
      <div className="user-details">
        <h1>{user.name}</h1>
        <p>
          <b>User's Email:</b> {user.email}
        </p>
        <p>
          <b>User's Phone: </b> {user.phone}
        </p>
        <button onClick={() => handleDelete(user.id)}>Delete</button>
        <button onClick={() => handleUpdate(user.id)}>
          {open ? "Close" : "Edit"}
        </button>

        {/* _________Update Method________ */}
        {open && <Update {...user} />}

        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }
};

export default User;
