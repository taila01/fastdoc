import React, { useState } from "react";
import { useRouter } from "next/router";

interface Tab {
  name: string;
  route: string;
}

interface TabProps {
  tabs: Tab[];
}

const Tab: React.FC<TabProps> = ({ tabs }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.pathname);


  const handleTabChange = (route: string) => {
    setActiveTab(route);
    router.push(route);
  };

  return (
    <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`cursor-pointer px-4 py-2 text-sm font-medium ${
            activeTab === tab.route
              ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => handleTabChange(tab.route)}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

export default Tab;