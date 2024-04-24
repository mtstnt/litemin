import { Textarea } from "flowbite-react";
import PanelLayout from "../layouts/PanelLayout";
import { Link, useParams } from "react-router-dom";
import { HiPlus, HiTable } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import { useTableBySlug } from "../stores/database";
import { useEffect } from "react";
import { SidebarItem } from "../components/SidebarItem";
import { BsGear } from "react-icons/bs";

export function DatabaseView() {
  const { slug } = useParams();
  return (
    <PanelLayout
      sidebarPanel={<SidePanel slug={slug!} />}
      mainPanel={<MainPanel />}
      mainBottomPanel={<Textarea></Textarea>}
    />
  );
}

function MainPanel(): React.ReactElement {
  return <h1 className="text-5xl font-bold">Hello world</h1>;
}

function SidePanel({ slug }: { slug: string }): React.ReactElement {
  const [tables, refreshTables, isLoadingTables] = useTableBySlug(slug);

  useEffect(() => {
    refreshTables();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full">
        <h1 className="mb-5 font-sans text-5xl font-bold dark:text-slate-100">
          Litemin
        </h1>
        <div className="flex flex-col mb-3 space-y-1">
          <SidebarItem
            className="text-white bg-blue-500 hover:bg-blue-800"
            icon={HiPlus}
          >
            New Table
          </SidebarItem>
          <SidebarItem icon={BsGear}>
            <Link to={`/database/${slug}/settings`} className="py-1 cursor-pointer hover:bg-gray-100">
              Database Settings
            </Link>
          </SidebarItem>
        </div>
        <div className="flex flex-row items-center w-full px-3 mb-2 space-x-3 font-semibold">
          <HiTable />
          <span>Tables</span>
        </div>
        <div className="flex ms-3 mt-0 flex-col flex-1 h-full space-y-0 overflow-y-auto max-h-[480px]">
          {isLoadingTables && (
            <div className="flex items-center justify-center w-full h-full">
              <ClipLoader color="green" size={30} speedMultiplier={0.8} />
            </div>
          )}
          {!isLoadingTables &&
            tables.map((e, index) => (
              <Link
                key={index}
                className="px-3 py-1 rounded hover:bg-gray-100"
                to={`/database/${slug}/tables/${e.tableName}`}
              >
                {e.tableName}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
