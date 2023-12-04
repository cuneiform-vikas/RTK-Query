import { useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../features/usersApi";

const Update = ({ id, name, email, phone }) => {
  const { data } = useGetAllUsersQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [userData, setUserData] = useState({
    id: id,
    name: name,
    email: email,
    phone: phone,
  });

  const handleChange = (e) => {
    if (data) {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userData);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        name="name"
        value={userData.name}
        onChange={handleChange}
        ref={focus}
        required
      />
      <input
        type="text"
        placeholder="Enter email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="Enter phone"
        name="phone"
        value={userData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="submit"
        value={isLoading ? "Wait..." : "Update"}
        disabled={isLoading}
      />
    </form>
  );
};

export default Update;
