import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import ExamsTable from "./ExamsTable";

interface ExamsProps {
  exam: any[];
  teacherId: any;
  deleteexam: any;
}
const UseExamsTable: React.FC<ExamsProps> = ({
  exam,
  teacherId,
  deleteexam,
}) => {
  const [pages, setPages] = useState(1);
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const map = useMemo(() => new Map(), []);
  map.set("dashboard-users", "Dashboard Users");
  map.set("mobile-users", "Mobile Users");
  const [selectedTab, setTab] = useState(map.get(router.query.tab));

  const [usersFilters, setUsersFilters] = useState({
    page: Number(router.query.page) || 0,
    limit: 5,
    role: router.query.role?.toString() || "",
    status: router.query.status?.toString() || "",
    sortBy: router.query.sortBy?.toString() || "name",
    sortOrder: router.query.sortOrder?.toString() || "asc",
  });

  const updatePath = (filterData: any) => {
    const filters = Object.entries(filterData)
      .map(([key, value]) => (value != null ? `${key}=${value}` : undefined))
      .filter((item) => item != null)
      .join("&");

    let tabs = "&tab=dashboard-users";

    if (selectedTab) {
      const t = selectedTab.split(" ");
      const tab = `${t[0].toLowerCase()}-${t[1].toLowerCase()}`;
      tabs = `&tab=${tab}`;
    }

    const paramString = filters.concat(tabs);
    router.push(`/user-management?${paramString}`, undefined, {
      shallow: true,
    });
  };

  const onNextPage = async () => {
    setLoading(true);
    if (usersFilters.page < pages) {
      setUsers([]);
      const filters = {
        ...usersFilters,
        page: usersFilters.page + 1,
      };
      setUsersFilters(filters);
      updatePath(filters);
    }
    setLoading(false);
  };
  const sortTable = async (e: any) => {
    setLoading(true);
    setUsers([]);
    const filters = {
      ...usersFilters,
      sortBy: e.column?.toString() || "name",
      sortOrder: e.direction == "ascending" ? "asc" : "desc",
    };
    setUsersFilters(filters);
    updatePath(filters);
    setLoading(false);
  };
  const onPageChange = async (e: number) => {
    setLoading(true);
    setUsers([]);
    const filters = {
      ...usersFilters,
      page: e,
    };
    setUsersFilters(filters);
    updatePath(filters);
    setLoading(false);
  };
  const onPreviousPage = async () => {
    setLoading(true);
    if (usersFilters.page > 1) {
      setUsers([]);
      const filters = {
        ...usersFilters,
        page: usersFilters.page - 1,
      };
      setUsersFilters(filters);
      updatePath(filters);
    }
    setLoading(false);
  };

  console.log(exam, "ssssssss");
  return (
    <div>
      <div className="my-1">
        <ExamsTable
          data={{
            data: {
              data: exam,
            },
          }}
          pages={pages}
          usersFilters={usersFilters}
          users={exam}
          setUsers={setUsers}
          sortTable={sortTable}
          loading={loading}
          setLoading={setLoading}
          setUserFilters={setUsersFilters}
          onNextPage={onNextPage}
          onPageChange={onPageChange}
          onPreviousPage={onPreviousPage}
          teacherId={teacherId}
          deleteexam={deleteexam}
        />
      </div>
    </div>
  );
};

export default UseExamsTable;