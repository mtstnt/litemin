import {
  Button,
  Label,
  Modal,
  Sidebar,
  TextInput,
  Textarea,
} from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import PanelLayout from "../layouts/PanelLayout";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export function Home() {
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
  const showAddDatabaseModal = (_: MouseEvent) => {
    setOpenModal(true);
  };

  return (
    <>
      <AddDatabaseModal openModal={openModal} setOpenModal={setOpenModal} />
      <Sidebar className="w-full h-full">
        <h1 className="mb-5 font-sans text-5xl font-bold dark:text-slate-100">
          Litemin
        </h1>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item onClick={showAddDatabaseModal} icon={HiPlus}>
              Add Database
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <div className="flex items-center justify-center h-full">
              <ClipLoader color="green" />
            </div>
            {/* <Link to={"/db/database_1"}>
              <Sidebar.Item className="space-y-0" icon={HiDatabase}>
                database_1
              </Sidebar.Item>
            </Link>
            <Link to={"/db/database_2"}>
              <Sidebar.Item className="space-y-0" icon={HiDatabase}>
                database_2
              </Sidebar.Item>
            </Link> */}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}

type AddDatabaseModalProps = {
  openModal: boolean;
  setOpenModal: (_: boolean) => void;
};

function AddDatabaseModal({
  openModal,
  setOpenModal,
}: AddDatabaseModalProps): React.ReactElement {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header className="p-5">Add a Database</Modal.Header>
      <Modal.Body className="p-5">
        <form className="flex flex-col gap-3">
          <div>
            <div className="block mb-2">
              <Label
                htmlFor="DatabaseName"
                value="Database Name (for display only)"
              />
            </div>
            <TextInput
              id="DatabaseName"
              type="text"
              placeholder="My Project DB"
              required
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="DatabasePath" value="Database File Path" />
            </div>
            <TextInput
              id="DatabasePath"
              type="text"
              placeholder="/var/www/html/project/database.db"
              required
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="flex flex-row justify-end">
        <Button color={"failure"} onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
        <Button color={"success"} onClick={() => setOpenModal(false)}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
