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
}

const StudentQuestionsTable: React.FC<UserTableProps> = ({
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



  const handleQuestioUpdatePage = (questionId: any) => {
    router.push(`/teacher/update_question/${questionId}`);
  };

  const tableHeads = [
    { name: "Question Title", uid: "title", sortable: false },
    { name: "Difficulty", uid: "difficulty", sortable: true },
    { name: "Date", uid: "date", sortable: false },
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
              <button
                onClick={() => {
                  handleRowClick(user.id);
                }}
              >
                <div className="text-xs text-gray-700 font-light">
                  {user && user.id} {".  "}
                  {user && user.title}
                </div>
              </button>
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
                <TableRow key={item.id} style={{ cursor: "pointer" }}>
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

export default StudentQuestionsTable;
