import Link from "next/link";

export default function Layout({ children }: any) {
  const menuItems = [
    {
      href: "/CoordinatorDashboard",
      title: "Dashboard",
    },
    {
      href: "/CoordinatorDashboard/AddParticipant",
      title: "Add Participant",
    },
    {
      href: "/CoordinatorDashboard/ApproveParticipants",
      title: "Approve Participants",
    },
  ];
  return (
    <div className="min-h-screen flex justify-between items-start">
      <aside className="md:w-60 border border-gray-800  h-screen bg-gray-100" style={{width: "20%"}}>
        <nav>
          <ul>
            {menuItems.map(({ href, title }) => (
              <li className="m-2" key={title}>
                <Link
                  href={href}
                  className={`flex p-2  rounded cursor-pointer hover:bg-gray-300`}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div  style={{ width: "80s%" }}>

      {children}
      </div>
    </div>
  );
}
