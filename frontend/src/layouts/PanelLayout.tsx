import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

type Props = {
  sidebarPanel?: React.ReactElement;
  mainBottomPanel?: React.ReactElement;
  mainPanel?: React.ReactElement;
};

export default function PanelLayout({
  sidebarPanel,
  mainBottomPanel,
  mainPanel,
}: Props): React.ReactElement {
  return (
    <PanelGroup direction="horizontal">
      <Panel
        hidden={sidebarPanel == undefined}
        className="min-h-screen p-3 border"
        defaultSize={15}
        minSize={15}
      >
        {sidebarPanel}
      </Panel>
      <PanelResizeHandle />
      <Panel>
        <PanelGroup direction="vertical">
          <Panel
            hidden={mainPanel == undefined}
            minSize={15}
            className="p-5 overflow-y-auto border"
          >
            {mainPanel}
          </Panel>
          <PanelResizeHandle />
          <Panel
            hidden={mainBottomPanel == undefined}
            defaultSize={15}
            minSize={15}
            className="p-5 overflow-y-auto border"
          >
            {mainBottomPanel}
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}
