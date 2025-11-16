import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllPlaygroundForUser } from "@/features/dashboard/actions";
import DashboardSidebar from "@/features/dashboard/components/dashboard-sidebar";

export default async function DashboardLayout({
    children,   
}: {
    children: React.ReactNode;
}) {    

    const playgroundData = await getAllPlaygroundForUser();

    const technologyIconMap: Record<string, string> = {
        REACT: "Zap",
        NEXTJS: "Lightbulb",
        EXPRESS: "Database",
        VUE: "Copass",
        HONO: "FLameIcon",
        ANGULAR: "Terminal",
    };

    const formattedPlaygorundData = playgroundData?.map((playground) =>({
        id:playground.id,
        name:playground.title,
        starred:playground.Starmark?.[0]?.isMarked || false,
        icon:technologyIconMap[playground.template] || "Code2",
    })) || [];


    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full overflow-x-hidden" suppressHydrationWarning>
                {/* TODO: DashboardSidebar implement */}
                <DashboardSidebar initialPlaygroundData={formattedPlaygorundData} />
                <main className="flex-1">{children}</main>
            </div>
        </SidebarProvider>
    );

}