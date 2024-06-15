import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import { Input } from "@material-tailwind/react";
import { useRouter } from "next/router";

function AddCriteriaPopUp() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false); // Initially hide the modal
  const [criteria, setCriteria] = useState("");
  const [criteriaError, setCriteriaError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setCriteriaError("");
    setCriteria("");
  };

  // Effect to add an event listener to the document
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (criteria.length === 0) {
      setCriteriaError("Criteria is required");
      return;
    }
    setCriteria("");
    setIsLoading(true);

    try {
      // Perform passkey validation here (API call, etc.)
      
      const isValid = true; // Replace with actual validation logic

      if (isValid) {
        closeModal();
        // Navigate to the exam page or any other action
        router.push("/exam");
      } else {
        setCriteria("Invalid passkey");
      }
    } catch (error) {
      console.error("Error during criteria validation:", error);
      setCriteriaError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button
          className="bg-primary hover:bg-primary-hover text-white font-bold py-1 px-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Criteria
        </button>
      </div>
      <div className="relative">
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
            id="passkey-modal"
          >
            <div
              ref={modalRef}
              className="relative p-5 w-96 shadow-lg rounded-md bg-white infade"
            >
              <div className="mt-3 text-center">
                <div className="font-semi-bold text-xl">Add Criteria</div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="rounded-md shadow-sm ">
                    <div className="">
                    

                      <textarea
                        rows={6}
                        
                        placeholder="Add Criteria"
                        className={`w-full appearance-none rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                          criteriaError ? "border-red-800" : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-primary`}
                        required
                        value={criteria}
                        onChange={(e) => setCriteria(e.target.value)}
                      ></textarea>
                      {criteriaError && (
                        <p className="text-red-500 text-xs italic">
                          {criteriaError}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none"
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      "Add"
                    )}
                  </button>
                  <div className="mt-4"></div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCriteriaPopUp;
