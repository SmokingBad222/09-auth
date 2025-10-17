
import { ReactNode } from "react";
import Sidebar from "./@sidebar/default";


interface Props {
  children: ReactNode;
  sidebar: ReactNode; 
}

export default function NotesFilterLayout({ children, sidebar }: Props) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      
      {sidebar || <Sidebar />}
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
