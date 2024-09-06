// Users Page Component
import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
const UsersPage = () => {
  const [users, setUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    (async () => {
      const usersResponse = await axios.get(
        `http://localhost:3000/api/users/all-users-pagination?page=${currentPage}&limit=5`
      );
      console.log(usersResponse.data);
      setUsers(usersResponse.data.users);
      setCurrentPage(usersResponse.data.currentPage);
      setTotalPages(usersResponse.data.totalPages);
    })();
  }, [currentPage]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleUserStatus = id => {
    setUsers(
      users.map(user =>
        user._id === id ? { ...user, isActivated: !user.isActivated } : user
      )
    );
    console.log(id);
    axios.put(`http://localhost:3000/api/users/toggle-active/${id}`);
    console.log("User status updated");
  };

  const filteredUsers =
    users &&
    users.filter(
      user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 border rounded"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users &&
            filteredUsers.map(user => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {user.name}
                </td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-center">
                  <span
                    className={`px-2 py-1 rounded ${
                      user.isActivated
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActivated ? "Active" : "inActive"}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => toggleUserStatus(user._id)}
                    className={`${
                      user.isActivated
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white px-4 py-2 rounded`}
                  >
                    {user.isActivated ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-6 flex justify-center items-center space-x-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
