import { useEffect } from "react";
import useAuth from "../stores/authStore";

export function Welcome() {
  const { fetchCurrentUser, user } = useAuth();
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-gray-600">
      <h2 className="text-xl font-semibold mb-4">Work ID Details</h2>
      <div className="space-y-4">
        <div className="flex">
          <span className="font-medium w-32">Work ID:</span>
          <span>{user?.workId}</span>
        </div>
        <div className="flex">
          <span className="font-medium w-32">Department:</span>
          <span>Engineering</span>
        </div>
        <div className="flex">
          <span className="font-medium w-32">Position:</span>
          <span>Software Developer</span>
        </div>
      </div>
    </div>
  );
}

// const TodoItem = ({ title, completed }: { title: string; completed: boolean }) => {
//   return (
//     <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50">
//       <input
//         type="checkbox"
//         checked={completed}
//         className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
//       />
//       <span className={`ml-3 ${completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
//         {title}
//       </span>
//     </div>
//   );
// };
