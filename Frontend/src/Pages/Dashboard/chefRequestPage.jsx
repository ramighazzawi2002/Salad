import React, { useState, useEffect } from "react";
import {
  UserCircle,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
const ChefRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    (async () => {
      const requestResponse = await axios.get(
        `http://localhost:3000/api/chef-request/get?page=${currentPage}&limit=1`
      );
      console.log(requestResponse.data);
      setRequests(
        requestResponse.data.chefRequest.map(request => {
          return {
            id: request._id,
            name: request.name,
            experience: request.yearsOfExperience,
            cuisine: request.culinarySpecialties.join(", "),
            status: request.isApproved ? "approved" : "pending",
            user_id: request.user_Id,
            yearsOfExperience: request.yearsOfExperience,
          };
        })
      );
      setCurrentPage(requestResponse.data.currentPage);
      setTotalPages(requestResponse.data.totalPages);
    })();
  }, [currentPage]);
  const handleRequest = (id, approved, user_id, yearsOfExperience) => {
    if (approved) {
      axios.put(`http://localhost:3000/api/chef-request/approve/${id}`);
      axios.put(
        `http://localhost:3000/api/users/update-role/${user_id}/${yearsOfExperience}`
      );
    } else {
      axios.delete(`http://localhost:3000/api/chef-request/delete/${id}`);
    }
    setRequests(prev => prev.filter(request => request.id !== id));
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    disapproved: "bg-red-100 text-red-800",
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "disapproved":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Chef Requests</h2>
      <div className="space-y-6">
        {requests.map(request => (
          <div key={request.id} className="bg-gray-50 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <UserCircle className="w-10 h-10 text-gray-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {request.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {request.experience} of experience
                  </p>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
                  statusColors[request.status]
                }`}
              >
                <StatusIcon status={request.status} />
                <span>
                  {request.status.charAt(0).toUpperCase() +
                    request.status.slice(1)}
                </span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              <span className="font-medium">Cuisine specialties:</span>{" "}
              {request.cuisine}
            </p>
            {request.status === "pending" && (
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    handleRequest(
                      request.id,
                      true,
                      request.user_id,
                      request.yearsOfExperience
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out flex-1"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleRequest(
                      request.id,
                      false,
                      request.user_id,
                      request.yearsOfExperience
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out flex-1"
                >
                  Disapprove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
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

export default ChefRequestsPage;
