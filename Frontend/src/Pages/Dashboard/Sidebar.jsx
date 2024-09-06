// Sidebar Component
import {
  X,
  Activity,
  Users,
  MessageSquare,
  FileText,
  Utensils,
  Flag,
  Menu,
} from "lucide-react";
const Sidebar = ({
  setActivePage,
  activePage,
  isSidebarOpen,
  toggleSidebar,
}) => (
  <div
    className={`bg-gray-800 text-white h-screen ${
      isSidebarOpen ? "w-64" : "w-20"
    } transition-all duration-300 ease-in-out`}
  >
    <div className="p-4 flex justify-between items-center">
      {isSidebarOpen && <h2 className="text-2xl font-bold">Admin</h2>}
      <button onClick={toggleSidebar} className="p-2 hover:bg-gray-700 rounded">
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
    <nav className="mt-8">
      <ul>
        {[
          { name: "Overview", icon: <Activity size={24} /> },
          { name: "Users", icon: <Users size={24} /> },
          { name: "Messages", icon: <MessageSquare size={24} /> },
          { name: "Chef Requests", icon: <Users size={24} /> },
          { name: "Recipes", icon: <FileText size={24} /> },
          { name: "Dishes", icon: <Utensils size={24} /> },
          { name: "Reports", icon: <Flag size={24} /> },
        ].map(item => (
          <li key={item.name} className="mb-2">
            <button
              onClick={() => setActivePage(item.name)}
              className={`flex items-center space-x-4 w-full p-3 rounded transition-colors duration-200 ${
                activePage === item.name
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

export default Sidebar;
