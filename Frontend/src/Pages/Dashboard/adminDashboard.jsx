import React, { useState } from "react";
import Sidebar from "./Sidebar";
import OverviewPage from "./overView";
import UsersPage from "./userPage";
import MessagesPage from "./messagePage";
import ChefRequestsPage from "./chefRequestPage";
import RecipesPage from "./recipePage";
import DishesPage from "./dishesPage.jsx";
import ReportsPage from "./reportPage";
const Dashboard = () => {
  const [activePage, setActivePage] = useState("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderActivePage = () => {
    switch (activePage) {
      case "Overview":
        return <OverviewPage />;
      case "Users":
        return <UsersPage />;
      case "Messages":
        return <MessagesPage />;
      case "Chef Requests":
        return <ChefRequestsPage />;
      case "Recipes":
        return <RecipesPage />;
      case "Dishes":
        return <DishesPage />;
      case "Reports":
        return <ReportsPage />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        setActivePage={setActivePage}
        activePage={activePage}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-bold text-gray-800">{activePage}</h1>
        </header>
        <main className="p-6">{renderActivePage()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
