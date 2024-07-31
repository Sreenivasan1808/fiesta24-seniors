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
    {
      href: "/CoordinatorDashboard/RegisterEvent",
      title: "Register for Event",
    },
    {
      href: "/CoordinatorDashboard/ChangeParticipantPass",
      title: "Change Password for participant",
    }
  ];
  return (
    <div className="min-h-screen flex justify-between items-start">
      <aside className="md:w-60 border border-gray-800  bg-slate-600 text-white" style={{width: "20%", minWidth:"15%", minHeight: "100vh"}}>
        <nav className="h-full">
          <ul>
            {menuItems.map(({ href, title }) => (
              <li className="m-2" key={title}>
                <Link
                  href={href}
                  className={`flex p-2  rounded cursor-pointer hover:bg-green-400 hover:text-black`}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div  style={{ width: "80%" }}>

      {children}
      </div>
    </div>
  );
}
