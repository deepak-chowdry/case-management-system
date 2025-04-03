import { UserButton } from "@stackframe/stack";
import { SidebarTrigger } from "./ui/sidebar";

const TopBar = () => {
  return (
    <div className="flex items-center justify-center  w-full h-14 shadow-sm shadow-muted sticky top-0 bg-background z-20">
      <div className="w-[97%] flex items-center justify-between">
        <div className="w-3/4 md:w-1/2">
          <SidebarTrigger />
        </div>
        <div className="px-2">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
