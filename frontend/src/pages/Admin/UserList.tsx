import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../redux/api/usersApiSlice";
import Message from "./Message";
import { UserInfo } from "../../types/users/userTypes";
import { isCustomError } from "../../utils/IsCustomError.";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditTableUserId] = useState<String | null>(null);
  const [editableUserName, setEditTbleUserName] = useState<String | null>(null);
  const [editableUserEmail, setEditTableUserEmail] = useState<String | null>(
    null
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
      } catch (e) {
        let result: string;

        if (isCustomError(e)) {
          result = e.data?.message || "An unknown error occurred";
        } else {
          result = (e as Error).message;
        }

        toast.error(result);
      }
    }
  };

  const toggleEdit = (id: string, username: string, email: string) => {
    setEditTableUserId(id);
    setEditTbleUserName(username);
    setEditTableUserEmail(email);
  };

  const updateHandler = async (id: string) => {
    await updateUser({
      userId: id,
      name: editableUserName,
      email: editableUserEmail,
    }).unwrap();

    setEditTableUserId(null);
    setEditTbleUserName(null);
    setEditTableUserEmail(null);
    refetch();

    try {
    } catch (e) {
      let result: string;

      if (isCustomError(e)) {
        result = e.data?.message || "An unknown error occurred";
      } else {
        result = (e as Error).message;
      }

      toast.error(result);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          {isCustomError(error)
            ? error.data?.message
            : (error as any)?.message || "An unknown error occurred"}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          {/* Admin Menu */}
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UserInfo) => (
                <tr key={user.id}>
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">
                    {editableUserId === user.id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={
                            typeof editableUserName === "string"
                              ? editableUserName
                              : ""
                          }
                          className="rounded-lg px-4 py-2"
                          onChange={(e) => setEditTbleUserName(e.target.value)}
                        />
                        <button
                          onClick={() => updateHandler(user.id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.name}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user.id, user.name, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableUserId === user.id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={
                            typeof editableUserEmail == "string"
                              ? editableUserEmail
                              : ""
                          }
                          onChange={(e) =>
                            setEditTableUserEmail(e.target.value)
                          }
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user.id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p>{user.email}</p>
                        <button
                          onClick={() =>
                            toggleEdit(user.id, user.name, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user.id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
