import DashboardNavigation from "@/components/common/dashboard-nav/dashboard-nav";


export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="w-screen h-screen flex flex-col">
            <DashboardNavigation />
            {/* <div className="bg-red-200 h-full"> */}

            {children}
            {/* </div> */}
        </div>
    );
  }