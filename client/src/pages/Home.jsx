// Import necessary React Hooks and components
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Used to display alert popups
import Navbar from "../components/Navbar"; // Navbar at the top
import Restaurants from "../components/Restaurants"; // Component to display the list of restaurants

// Define the base URL for your Backend API
const API_BASE_URL = 'http://localhost:5000/api/v1/restaurant'; // <-- Changed to your Backend API URL

const Home = () => {
  const [restaurants, setRestaurants] = useState([]); // Stores all restaurant data
  const [keyword, setKeyword] = useState(""); // Stores the search keyword
  const [loading, setLoading] = useState(true); // Loading status
  const [error, setError] = useState(null); // Error message

  // useEffect Hook to fetch restaurant data from the API when the component mounts
  useEffect(() => {
    const fetchRestaurants = async () => { // Make this an async function
      setLoading(true); // Set loading to true before fetching
      setError(null);   // Clear any previous errors
      try {
        const response = await fetch(API_BASE_URL); // <-- Use the API_BASE_URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Adjust data structure: Backend uses 'name' and 'imageUrl', Frontend uses 'title' and 'img'
        const formattedData = data.map(item => ({
          id: item.id,
          title: item.name,     // Map 'name' from Backend to 'title' for Frontend
          type: item.type,
          img: item.imageUrl    // Map 'imageUrl' from Backend to 'img' for Frontend
        }));
        setRestaurants(formattedData); // Set the formatted data to state
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Failed to load restaurants. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetch completes (success or failure)
      }
    };

    fetchRestaurants(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  // Function to delete a restaurant
  const handleDelete = (id) => {
    // Confirm deletion using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-xl", // Add rounded corners to the popup
      },
    }).then(async (result) => { // Make this callback async to use await
      if (result.isConfirmed) {
        try {
          // Send DELETE request to your Backend API
          const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" }); // <-- Use API_BASE_URL and id

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }

          // Remove the deleted item from state (no page reload needed)
          setRestaurants(restaurants.filter((item) => item.id !== id));
          // Notify successful deletion
          Swal.fire({
            title: "Deleted!",
            text: "Your restaurant has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (err) {
          console.error("Error deleting restaurant:", err);
          Swal.fire({
            title: "Error!",
            text: `Failed to delete restaurant: ${err.message}`,
            icon: "error",
          });
        }
      }
    });
  };

  // Filter restaurants based on user's keyword
  const filtered = restaurants.filter(
    (r) =>
      r.title.toLowerCase().includes(keyword.toLowerCase()) || // Search by name (title)
      r.type.toLowerCase().includes(keyword.toLowerCase())      // Or by type
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar /> {/* Navbar at the top */}

      <main className="container mx-auto px-4 pt-28 pb-12 max-w-5xl">
        <h1 className="text-4xl font-extralight mb-8 text-gray-900 text-center tracking-wide select-none">
          All Restaurants
        </h1>

        {/* Restaurant search box */}
        <form onSubmit={(e) => e.preventDefault()} className="max-w-xl mx-auto mb-10">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            {/* Magnifying glass icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Search input field */}
            <input
              type="search"
              id="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Search restaurants..."
            />
          </div>
        </form>

        {/* Display loading status or error message */}
        {loading && <p className="text-center text-gray-500 mt-10 text-lg">Loading restaurants...</p>}
        {error && <p className="text-center text-red-500 mt-10 text-lg">{error}</p>}

        {/* Display restaurant list (if data exists and not loading) */}
        {!loading && !error && (filtered.length > 0 ? (
          <Restaurants restaurants={filtered} onDelete={handleDelete} />
        ) : (
          !loading && !error && <p className="text-center text-gray-500 mt-10 text-lg">No restaurants found.</p>
        ))}
      </main>
    </div>
  );
};

export default Home;
