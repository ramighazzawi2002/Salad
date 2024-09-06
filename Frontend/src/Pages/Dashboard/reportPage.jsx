import React, { useState, useEffect } from "react";
import {
  Flag,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Book,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import ItemDetails from "./ItemDetails"; // Make sure to import the new component

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const reportsResponse = await axios.get(
          `http://localhost:3000/api/reports/get-pending-reports?page=${currentPage}&limit=3`
        );
        console.log(reportsResponse.data.reports);
        setReports(
          reportsResponse.data.reports.map(report => {
            return {
              id: report._id,
              reporter: report.reporter?.name || "Unknown",
              reportedItem: report.reportableType,
              itemId: report.reportableId,
              reason: report.reason,
              status: report.status,
              date: report.updatedAt,
            };
          })
        );
        setCurrentPage(reportsResponse.data.currentPage);
        setTotalPages(reportsResponse.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentPage]);

  const handleReport = async (id, approved, reportableItem, reportItemId) => {
    console.log(id, approved, reportableItem, reportItemId);
    if (reportableItem === "Recipe") {
      if (approved) {
        try {
          await axios.delete(
            `http://localhost:3000/api/recipes/${reportItemId}`
          );
          await axios.put(
            `http://localhost:3000/api/reports/change-to-completed/${id}`
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await axios.put(
            `http://localhost:3000/api/reports/change-to-completed/${id}`
          );
        } catch (error) {
          console.error(error);
        }
      }
    } else if (reportableItem === "Dish") {
      if (approved) {
        try {
          await axios.delete(
            `http://localhost:3000/api/dishes/${reportItemId}`
          );
          await axios.put(
            `http://localhost:3000/api/reports/change-to-completed/${id}`
          );
          console.log("Dish");
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await axios.put(
            `http://localhost:3000/api/reports/change-to-completed/${id}`
          );
        } catch (error) {
          console.error(error);
        }
      }
    } else if (reportableItem === "Review") {
      if (approved) {
        try {
          await axios.delete(
            `http://localhost:3000/api/reviews/${reportItemId}`
          );
          await axios.put(
            `http://localhost:3000/api/reports/change-to-completed/${id}`
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await axios.put(
            `http://localhost:3000/api/reports/change-to-completed/${id}`
          );
        } catch (error) {
          console.error(error);
        }
      }
    }

    setReports(prev => prev.filter(report => report.id !== id));
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    dismissed: "bg-red-100 text-red-800",
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "dismissed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const ItemIcon = ({ type }) => {
    switch (type) {
      case "Review":
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case "Recipe":
        return <Book className="w-4 h-4 text-purple-500" />;
      case "Dish":
        return <Flag className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const formatDate = dateString => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleItemClick = (reportedItem, itemId) => {
    setSelectedItem({ type: reportedItem, id: itemId });
  };
  const closeItemDetails = () => {
    setSelectedItem(null);
  };

  const getItemTypeIcon = itemType => {
    switch (itemType) {
      case "Recipe":
        return <Book className="w-4 h-4" />;
      case "Dish":
        return <Flag className="w-4 h-4" />;
      case "Review":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Flag className="w-6 h-6 mr-2" />
        Reports
      </h2>
      <div className="space-y-6">
        {reports.map(report => (
          <div key={report.id} className="bg-gray-50 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="font-semibold text-gray-700">
                  {report.reporter}
                </span>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                  statusColors[report.status]
                }`}
              >
                <StatusIcon status={report.status} />
                <span>
                  {report.status.charAt(0).toUpperCase() +
                    report.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="mb-2 flex items-center space-x-2">
              <ItemIcon type={report.reportedItem} />
              <span className="text-sm text-gray-600">
                {report.reportedItem} (ID: {report.itemId})
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1 text-orange-500" />
              Reason: {report.reason}
            </p>
            <p className="text-xs text-gray-400 mb-3">
              Reported on: {formatDate(report.date)}
            </p>
            <button
              className="mt-4 mb-4 inline-flex items-center px-4 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out"
              onClick={() =>
                handleItemClick(report.reportedItem, report.itemId)
              }
            >
              <Eye className="w-4 h-4 mr-2" />
              View {report.reportedItem} Details
              {getItemTypeIcon(report.reportedItem) && (
                <span className="ml-2">
                  {getItemTypeIcon(report.reportedItem)}
                </span>
              )}
            </button>
            {report.status === "pending" && (
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    handleReport(
                      report.id,
                      true,
                      report.reportedItem,
                      report.itemId
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition duration-300 ease-in-out flex items-center flex-1 justify-center"
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> Approve Report
                </button>
                <button
                  onClick={() =>
                    handleReport(
                      report.id,
                      false,
                      report.reportedItem,
                      report.itemId
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition duration-300 ease-in-out flex items-center flex-1 justify-center"
                >
                  <XCircle className="w-4 h-4 mr-1" /> Dismiss Report
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedItem && (
        <ItemDetails
          itemType={selectedItem.type}
          itemId={selectedItem.id}
          onClose={closeItemDetails}
        />
      )}
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

export default ReportsPage;
