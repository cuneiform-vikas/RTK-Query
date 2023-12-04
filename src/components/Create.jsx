import React, { useState } from "react";
import {
  useAddNewUserMutation,
  useGetAllUsersQuery,
} from "../features/usersApi";

const Create = () => {
  const { data } = useGetAllUsersQuery();
  const [addNewUser, { isLoading }] = useAddNewUserMutation();

  const [userData, setUserData] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    if (data) {
      const id = data.length + 1;
      setUserData({ ...userData, id, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewUser(userData);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Please enter name"
        name="name"
        value={userData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="Please enter email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="Please enter phone"
        name="phone"
        value={userData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="submit"
        value={isLoading ? "Wait..." : "Add New"}
        disabled={isLoading}
      />
    </form>
  );
};

export default Create;
