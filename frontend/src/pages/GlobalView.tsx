import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { HiDatabase, HiPlus } from "react-icons/hi";
import PanelLayout from "../layouts/PanelLayout";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useDatabases } from "../stores/database";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsGear } from "react-icons/bs";
import { SidebarItem } from "../components/SidebarItem";

export function GlobalView() {
  return (
    <PanelLayout
      sidebarPanel={<SidePanel />}
      mainPanel={<MainPanel />}
      mainBottomPanel={<Textarea></Textarea>}
    />
  );
}

function MainPanel(): React.ReactElement {
  return <h1 className="text-5xl font-bold">Hello world</h1>;
}

function SidePanel(): React.ReactElement {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [databases, refreshDatabases, isLoadingDatabases] = useDatabases();

  useEffect(() => {
    refreshDatabases();
  }, []);

  const onAddedDatabaseCallback = () => refreshDatabases();
  const showAddDatabaseModal = () => setOpenModal(true);

  return (
    <div className="w-full h-full">
      <AddDatabaseModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onAddedDatabaseCallback={onAddedDatabaseCallback}
      />
      <div className="flex flex-col h-full">
        <div className="flex flex-col mb-3 space-y-1">
          <h1 className="mb-5 font-sans text-5xl font-bold dark:text-slate-100">
            Litemin
          </h1>
          <SidebarItem className="text-white bg-blue-500 hover:bg-blue-800" onClick={showAddDatabaseModal} icon={HiPlus}>
            New Database
          </SidebarItem>
          <SidebarItem icon={BsGear}>
            <Link to={"/settings"} className="py-1 cursor-pointer hover:bg-gray-100">
              Settings
            </Link>
          </SidebarItem>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex flex-row items-center w-full px-3 mb-2 space-x-3 font-semibold">
            <HiDatabase /> 
            <span>Databases</span>
          </div>
          <div className="flex ms-3 mt-0 flex-col flex-1 h-full space-y-0 overflow-y-auto max-h-[480px]">
            {isLoadingDatabases && (
              <div className="flex items-center justify-center w-full h-full">
                <ClipLoader color="green" size={30} speedMultiplier={0.8} />
              </div>
            )}
            {!isLoadingDatabases &&
              databases.map((e, index) => (
                <Link
                  key={index}
                  className="px-3 py-1 rounded hover:bg-gray-100"
                  to={`/database/${e.slug}`}
                >
                  {e.displayName}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type AddDatabaseModalProps = {
  openModal: boolean;
  setOpenModal: (_: boolean) => void;
  onAddedDatabaseCallback: () => void;
};

type AddDatabaseForm = {
  displayName: string;
  path: string;
};

function AddDatabaseModal({
  openModal,
  setOpenModal,
  onAddedDatabaseCallback,
}: AddDatabaseModalProps): React.ReactElement {
  const { register, handleSubmit } = useForm<AddDatabaseForm>();

  const onSubmit = (data: AddDatabaseForm) => {
    alert(JSON.stringify(data));
    onAddedDatabaseCallback();
    setOpenModal(false);
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header className="p-5">Add a Database</Modal.Header>
      <Modal.Body className="p-5">
        <div className="flex flex-col gap-3">
          <div>
            <div className="block mb-2">
              <Label
                htmlFor="DatabaseName"
                value="Database Name (for display only)"
              />
            </div>
            <TextInput
              {...register("displayName", { required: true })}
              type="text"
              placeholder="My Project DB"
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="DatabasePath" value="Database File Path" />
            </div>
            <TextInput
              {...register("path", { required: true })}
              type="text"
              placeholder="/var/www/html/project/database.db"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex flex-row justify-end">
        <Button color={"failure"} onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
        <Button color={"success"} onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
