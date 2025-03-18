import React, { useEffect, useState } from 'react'
import type { Route } from './+types/search';
import axios from 'axios';
import * as _ from 'lodash'
import useAuth from '~/stores/authStore';
import { motion } from 'framer-motion';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Frontlett - Search" },
    { name: "description", content: "Search using work ID" },
  ];
}

type UserData = {
  id: number;
  workId: string;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  createdAt: string;
  linkedIn: string;
  works: {
    position: string;
    location: string;
    start: string;
    end: string;
    company: string;
  }[]
  // Add other user data fields here
};

const Search = () => {
  const { token } = useAuth()
  const [query, setQuery] = useState('')
  const [research, setResearch] = useState(true);
  const [suggestions, setSuggestions] = useState<{
    workId: string
    fullName: string
  }[]>([])
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchUserDetails = async (workId: string) => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVICE_URL}/dashboard/user/${workId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
      setSelectedUser(response.data.work);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleUserSelect = (emp: { workId: string; fullName: string }) => {
    setQuery(emp.fullName);
    setSuggestions([]); // Clear suggestions after selection
    fetchUserDetails(emp.workId);
    setResearch(false)
  };

  // Debounced API Call to prevent excessive requests
  const fetchSuggestions = React.useCallback(
    _.debounce(async (searchTerm: string) => {
      if (!searchTerm) {
        setSuggestions([]);
        setSelectedUser(null);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_SERVICE_URL}/dashboard/search?q=${searchTerm}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        setSuggestions(response.data.employers);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }, 300),
    [token]
  );

  useEffect(() => {
    if (!research) return
    fetchSuggestions(query)
  }, [query, research])

  return (
    <>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none"
          placeholder="Search employers..."
          value={query}
          onChange={(e) => {setResearch(true);setQuery(e.target.value)}}
          onKeyDown={(e) => {
            if (e.key === 'Tab' && suggestions.length > 0) {
              e.preventDefault();
              handleUserSelect(suggestions[0]);
            }
          }}
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full bg-white border rounded-lg shadow-lg mt-2 px-3 py-2"
          >
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="text-sm text-gray-500 mt-1"
            >
              Press Tab to autocomplete with "{suggestions[0]?.fullName}"
            </motion.li>
            {suggestions.map((emp, index) => (
              <motion.li
                key={emp.workId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-2 cursor-pointer hover:bg-gray-200 ${index === 0 ? 'bg-gray-100' : ''
                  }`}
                onClick={() => handleUserSelect(emp)}
              >
                {emp.fullName} ({emp.workId})
              </motion.li>
            ))}
          </motion.ul>
        )}
        {/* {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-sm text-gray-500 mt-1"
          >
            Press Tab to autocomplete with "{suggestions[0]?.fullName}"
          </motion.div>
        )} */}
      </div>

      {(isLoading || selectedUser) && <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <UserDetails isLoading={isLoading} selectedUser={selectedUser} />
      </div>}


    </>
  )
}

const UserDetails: React.FC<{ isLoading: boolean; selectedUser: UserData | null }> = ({ isLoading, selectedUser }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  <a href="" target=""></a>
  if (!selectedUser) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4">Employee Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-50 rounded-xl">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Basic Details</h3>
          <div className="space-y-4">
            <p className="flex items-center"><span className="text-gray-600 w-24">Work ID:</span> <span className="text-gray-900 font-medium">{selectedUser.workId}</span></p>
            <p className="flex items-center"><span className="text-gray-600 w-24">Full Name:</span> <span className="text-gray-900 font-medium">{selectedUser.fullName}</span></p>
            <p className="flex items-center"><span className="text-gray-600 w-24">Email:</span> <span className="text-blue-600 hover:text-blue-700">{selectedUser.email}</span></p>
            <p className="flex items-center"><span className="text-gray-600 w-24">Phone:</span> <span className="text-gray-900">{selectedUser.phone}</span></p>
            <p className="flex items-center"><span className="text-gray-600 w-24">Username:</span> <span className="text-gray-900">{selectedUser.username}</span></p>
            <p className="flex items-center"><span className="text-gray-600 w-24">LinkedIn:</span> <a href={selectedUser.linkedIn} className="text-blue-600 hover:text-blue-700 hover:underline">{selectedUser.linkedIn}</a></p>
            <p className="flex items-center"><span className="text-gray-600 w-24">Created At:</span> <span className="text-gray-900">{new Date(selectedUser.createdAt).toLocaleDateString()}</span></p>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Work History</h3>
          <div className="space-y-6">
            {selectedUser.works.map((work) => (
              <div key={`${work.company}-${work.position}-${work.start}`} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="flex items-center text-lg font-semibold text-gray-800 mb-2">{work.position}</p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center"><span className="text-gray-600 w-20">Company:</span> <span className="text-gray-900">{work.company}</span></p>
                  <p className="flex items-center"><span className="text-gray-600 w-20">Location:</span> <span className="text-gray-900">{work.location}</span></p>
                  <p className="flex items-center"><span className="text-gray-600 w-20">Period:</span> <span className="text-gray-900">{work.start} - {work.end}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Search