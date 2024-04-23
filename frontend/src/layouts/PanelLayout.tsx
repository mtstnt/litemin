import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

type Props = {
  sidebarPanel: React.ReactElement
  
  mainBottomPanel: React.ReactElement
  mainPanel: React.ReactElement
};

export default function PanelLayout({ sidebarPanel, mainBottomPanel, mainPanel }: Props): React.ReactElement {
  return (
    <PanelGroup direction="horizontal">
      <Panel className="min-h-screen border" defaultSize={15} minSize={15}>
        {sidebarPanel}
      </Panel>
      <PanelResizeHandle />
      <Panel>
        <PanelGroup direction="vertical">
          <Panel minSize={15} className="p-5 overflow-y-auto border">
            {mainPanel}
          </Panel>
          <PanelResizeHandle />
          <Panel
            defaultSize={15}
            minSize={15}
            className="p-5 overflow-y-auto border"
          >
            {mainBottomPanel}
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  )
}