import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Avatar,
  Chip,
  Skeleton,
} from "@nextui-org/react";
import {
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} from "@/store/question/get-all-questions";
import { stringify } from "querystring";
import { useRouter } from "next/router";
import Link from "next/link";

interface UserTableProps {
  data: {
    data: {
      data: any[];
    };
  };
  pages: number;
  users: any[];
  setUsers: Function;
  sortTable: Function;
  loading: boolean;
  setLoading: Function;
  onPreviousPage: any;
  onPageChange: Function;
  onNextPage: any;
  usersFilters: {
    page: number;
    limit: number;
    role: string;
    status: string;
    sortBy: string;
    sortOrder: string;
  };
  setUserFilters: Function;
  teacherId: any;
  deletequestion: any;
}

const QuestionsTable: React.FC<UserTableProps> = ({
  data,
  pages,
  users,
  sortTable,
  usersFilters,
  loading,
  onPreviousPage,
  onPageChange,
  onNextPage,
  teacherId,
  deletequestion,
}) => {
  const [updateQuestion, { isLoading: isUpdating }] =
    useUpdateQuestionMutation();

  // Mutation hook for deleting a question
  const [deleteQuestion, { isLoading: isDeleting }] =
    useDeleteQuestionMutation();
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null
  );
  const router = useRouter();
  // Example function to update a question
  const handleUpdateQuestion = async (
    questionId: any,
    updatedData: any,
    event: any
  ) => {
    event.preventDefault();
    try {
      await updateQuestion({ id: questionId, ...updatedData }); // Assuming 'updatedData' is an object containing the updated fields
      // Optionally, you can trigger a refetch of all questions after updating
      // refetch();
    } catch (error) {
      // Handle error
    }
  };

  // Example function to delete a question
  const handleDeleteQuestion = async (questionId: any, event: any) => {
    event.preventDefault();
    try {
      await deleteQuestion(questionId);
      deletequestion();
      // refetch();
    } catch (error) {
      // Handle error
      console.log("error deleting");
    }
  };

  const handleQuestioUpdatePage = (questionId: any) => {
    router.push(`/teacher/update_question/${questionId}`);
  };

  const tableHeads = [
    { name: "Question Title", uid: "title", sortable: false },
    { name: "Difficulty", uid: "difficulty", sortable: true },
    { name: "Date", uid: "date", sortable: false },
    { name: "Actions", uid: "actions", sortable: false },
  ];

  const t: any = {
    id: "",
    title: "",
    difficulty: "",
    createdAt: "",
    updatedAt: "",
    teacherId: "",
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const shimmers = [t, t, t, t, t];

  const openDialog = (user: any) => {
    setIsDialogOpen(true);
  };
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-US", options);
  };

  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    const dateObject = new Date(dateString);
    const time = dateObject.toLocaleDateString("en-US", options).split(",");
    return time[1];
  };
  const renderCell = (isUser: boolean, user: any, columnKey: any) => {
    console.log(user);
    switch (columnKey) {
      case "title":
        return (
          <>
            {isUser ? (
              <div className="text-xs text-gray-700 font-light">
                {user && user.id} {".  "}
                {user && user.title}
              </div>
            ) : (
              <div className="mr-32 w-full">
                <Skeleton className="h-3 mb-2 w-4/5 rounded-full" />
              </div>
            )}
          </>
        );
      case "id":
        return (
          <>
            {isUser ? (
              <div className="text-xs font-light text-gray-700">
                {user && user.id}
              </div>
            ) : (
              <div className="mr-32 w-full">
                <Skeleton className="h-3 mb-2 w-3/5 rounded-full" />
              </div>
            )}
          </>
        );

      case "difficulty":
        return (
          <>
            {isUser ? (
              <div className="text-xs text-gray-700 font-light">
                {user && user.difficulty}
              </div>
            ) : (
              <div className="mr-32 w-full">
                <Skeleton className="h-3 mb-2 w-4/5 rounded-full" />
              </div>
            )}
          </>
        );
      case "date":
        const formattedDate = formatDate(user.updatedAt);
        const formattedTime = formatTime(user.updatedAt);
        return (
          <>
            {isUser ? (
              <>
                <div className="text-xs mt-1">{formattedDate}</div>
                <div className="text-xs mt-1">{formattedTime}</div>
              </>
            ) : (
              <div className="w-full mr-24">
                <Skeleton className="h-3 mb-2 w-3/5 rounded-full" />
                <Skeleton className="h-3 my- w-2/5 rounded-full" />
              </div>
            )}
          </>
        );
      case "actions":
        return (
          <>
            {isUser ? (
              <>
                {user.teacherId == teacherId ? (
                  <div className="flex">
                    <button onClick={(e) => handleDeleteQuestion(user.id, e)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        color="#FF3B30"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 mx-2 rounded-full bg-[#FF3B30] bg-opacity-20 p-2"
                      >
                        <path
                          strokeLinecap="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/teacher/update_question/${user.id}`)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        color="#AE709F"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 mx-2 rounded-full bg-green-800 bg-opacity-30 pt-2 py-2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z
"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        color="gray"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 mx-2 rounded-full bg-gray-400 bg-opacity-20 p-2"
                      >
                        <path
                          strokeLinecap="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                    </button>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        color="gray"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 mx-2 rounded-full bg-gray-400 bg-opacity-30 pt-2 py-2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          // d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"\
                          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z
"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex w-fit">
                <Skeleton className="h-8 w-8 mr-5 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            )}
          </>
        );
      default:
        return <div></div>;
    }
  };

  const bottomContent = useMemo(() => {
    return (
      <div className="pt-30 bg-white rounded-2xl px-2 flex justify-between items-center text-primary text-xs">
        <span className="w-[30%] px-2">
          {data?.data?.data?.length} questions in total
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={usersFilters.page}
          total={pages}
          onChange={(e) => onPageChange(e)}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    usersFilters.page,
    pages,
    data?.data?.data?.length,
    onNextPage,
    onPageChange,
    onPreviousPage,
  ]);
  const handleRowClick = (userId: any) => {
    router.push(`/question/${userId}`);
  };
  return (
    <div>
      <div className="p-6 bg-white rounded-md shadow-lg">
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="inside"
          sortDescriptor={{
            column: usersFilters.sortBy,
            direction:
              usersFilters.sortOrder == "asc" ? "ascending" : "descending",
          }}
          onSortChange={(e) => sortTable(e)}
          topContentPlacement="outside"
          removeWrapper={true}
          className="text-secondary w-full h-full"
        >
          <TableHeader columns={tableHeads}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
                className="text-xs font-bold text-gray-700 bg-white"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          {loading ? (
            <TableBody>
              {shimmers.map((user, i) => (
                <TableRow key={i}>
                  {(columnKey) => (
                    <TableCell>{renderCell(false, user, columnKey)}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {users?.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    // handleRowClick(item.id);
                  }}
                  style={{ cursor: "pointer" }}>
                  {(columnKey) => (
                    <TableCell>{renderCell(true, item, columnKey)}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default QuestionsTable;
