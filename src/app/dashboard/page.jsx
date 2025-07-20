// import UserDashboard from "../../component/reusables/userDashboard"

// export default function DashboardPage() {
//   return <UserDashboard />
// }

import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardContent from '@/components/DashboardContent';

import { checkComponent } from '@/utils/checkComponent';

export default function DashboardPage() {
  // Check each imported component
  checkComponent(DashboardHeader, 'DashboardHeader');
  checkComponent(DashboardSidebar, 'DashboardSidebar');
  checkComponent(DashboardContent, 'DashboardContent');

  return (
    <div>
      <DashboardHeader />
      <DashboardSidebar />
      <DashboardContent />
    </div>
  );
}
