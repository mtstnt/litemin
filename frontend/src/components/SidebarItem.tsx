import { PropsWithChildren } from "react";

type SidebarItemProps = {
  icon: React.ComponentType;
} & PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement>;

export function SidebarItem({
  children,
  icon,
  ...props
}: SidebarItemProps): React.ReactElement {
  const Icon = icon;
  return (
    <div
      color={"red"}
      {...props}
      className={`flex flex-row px-3 py-1 cursor-pointer rounded items-center space-x-3 transition ${props.className}`}
    >
      <Icon />
      <div>{children}</div>
    </div>
  );
}
