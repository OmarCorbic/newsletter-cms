import SideNav from "../ui/dashboard/sidenav";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-screen flex flex-row gap-2 overflow-hidden  bg-slate-800">
      <div className="flex flex-col w-44 bg-slate-900">
        <SideNav />
      </div>
      <div className="flex-grow p-12 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
