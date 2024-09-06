// Overview Page Components
import Card from "./Card";
import { Users, FileText, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const OverviewPage = () => {
  const [userCount, setUserCount] = useState(0);
  const [chefCount, setChefCount] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [pendingRecipesCount, setPendingRecipesCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const usersCountResponse = await axios.get(
        "http://localhost:3000/api/users/count-users"
      );
      setUserCount(usersCountResponse.data.totalUsers);
      const chefCountResponse = await axios.get(
        "http://localhost:3000/api/users/count-chefs"
      );
      setChefCount(chefCountResponse.data.totalChefs);
      const activeUserCountResponse = await axios.get(
        "http://localhost:3000/api/users/count-active-users"
      );
      setActiveUserCount(activeUserCountResponse.data.activeUsers);

      const pendingRecipesResponse = await axios.get(
        "http://localhost:3000/api/recipes/all-pending-recipes"
      );
      setPendingRecipesCount(pendingRecipesResponse.data.recipes);

      const totalSalesResponse = await axios.get(
        `http://localhost:3000/api/orders/total-sales`
      );
      setTotalSales(totalSalesResponse.data.totalSales);
      setIsLoading(false);
    })();
  }, []);
  const userActivityData = [
    { name: "Active Users", value: activeUserCount },
    { name: "Inactive Users", value: userCount - activeUserCount },
  ];

  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 5500 },
  ];
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Users"
          value={userCount}
          icon={<Users size={24} color="white" />}
          color="bg-blue-500"
        />
        <Card
          title="All Chefs"
          value={chefCount}
          icon={<Users size={24} color="white" />}
          color="bg-green-500"
        />
        <Card
          title="Pending Recipes"
          value={pendingRecipesCount}
          icon={<FileText size={24} color="white" />}
          color="bg-yellow-500"
        />
        <Card
          title="Total Sales"
          value={`$${totalSales}`}
          icon={<DollarSign size={24} color="white" />}
          color="bg-purple-500"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sales Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
