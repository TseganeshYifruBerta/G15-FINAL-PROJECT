import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import { Input } from "@material-tailwind/react";
import { useRouter } from "next/router"; // Adjust the import path as necessary
import { useGetPassKeyQuery } from "@/store/exam/pass-key-api";
import ExamDetail from "./ExamDetail";
interface PassKeyPopupProps {
  examId: string;
}
const PassKeyPopup: React.FC<PassKeyPopupProps> = ({ examId }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [passKey, setPassKey] = useState("");
  const [passKeyError, setPassKeyError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [submitParams, setSubmitParams] = useState<{
    examId: string;
    passKey: string;
  } | null>(null);

  const { data, error, isFetching } = useGetPassKeyQuery(submitParams, {
    skip: !submitParams, // Skip the query if submitParams is null
  });

  useEffect(() => {
    if (!isFetching) {
      if (error) {
        setPassKeyError("Invalid passkey");
      } else if (data) {
        closeModal();
        console.log(data, "data exam detail");
        localStorage.setItem("enter", "true");
        router.push(`/enter_exam/${examId}/${passKey}`);
      }
      setIsLoading(false);
    }
  }, [data, error, isFetching]);

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setPassKeyError("");
    setPassKey("");
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passKey.length === 0) {
      setPassKeyError("Passkey is required");
      return;
    }
    setPassKeyError("");
    setIsLoading(true); // Replace with actual exam ID
    setSubmitParams({ examId, passKey });
  };

  return (
    <div>
      <div>
        <button
          className="text-sm text-white bg-primary py-[8px] px-4 rounded-md hover:bg-primary-hover"
          onClick={() => setShowModal(true)}
        >
          Enter Exam
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div
            ref={modalRef}
            className="relative p-5 w-96 shadow-lg rounded-md bg-white"
          >
            <div className="mt-3 text-center">
              <div className="font-semi-bold text-xl">Enter Passkey</div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="pb-4">
                    <Input
                      id="passkey"
                      name="passkey"
                      label="Passkey"
                      value={passKey}
                      color={passKeyError ? "red" : "black"}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPassKey(e.target.value);
                      }}
                      type="text"
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                      crossOrigin={true}
                    />
                    {passKeyError && (
                      <p className="text-red-500 text-xs italic">
                        {passKeyError}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none"
                  disabled={isLoading}
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
                    "Submit"
                  )}
                </button>
                <div className="mt-4"></div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassKeyPopup;
