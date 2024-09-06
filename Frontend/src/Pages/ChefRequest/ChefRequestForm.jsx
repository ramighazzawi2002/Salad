import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ChefRequestForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    yearsOfExperience: "",
    culinarySpecialties: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "yearsOfExperience" && value < 0) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit the request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3c6e47",
      cancelButtonColor: "#f87171",
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      stopKeydownPropagation: true,
      stackOnTop: true, // This ensures the alert appears on top of other modals
      customClass: {
        popup: "swal2-popup", // Add custom class if needed
      },
    });

    if (result.isConfirmed) {
      const dataToSubmit = {
        ...formData,
        yearsOfExperience: formData.yearsOfExperience,
      };

      try {
        await axios.post(
          "http://localhost:3000/api/chef-request/post",
          dataToSubmit,
          { withCredentials: true }
        );
        Swal.fire({
          icon: "success",
          title: "Request Submitted",
          text: "We will contact you after reviewing your request.",
          confirmButtonColor: "#3c6e47",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          stopKeydownPropagation: true,
          stackOnTop: true,
        });
        setFormData({
          name: "",
          yearsOfExperience: "",
          culinarySpecialties: "",
        });
        if (onClose) onClose();
      } catch (error) {
        console.error("Error submitting form", error);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "There was an issue submitting your request. Please try again later.",
          confirmButtonColor: "#f87171",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          stopKeydownPropagation: true,
          stackOnTop: true,
        });
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Submission Canceled",
        text: "Your request was not submitted.",
        confirmButtonColor: "#3c6e47",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: true,
        stackOnTop: true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
        Chef Request Form
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <input
          type="number"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          placeholder="Years of Experience"
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <input
          type="text"
          name="culinarySpecialties"
          value={formData.culinarySpecialties}
          onChange={handleChange}
          placeholder="Culinary Specialties (comma separated)"
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ChefRequestForm;
