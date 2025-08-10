export function checkComponent(component, name) {
  if (
    typeof component !== "function" &&
    typeof component !== "string"
  ) {
    console.error(
      `❌ Invalid React component detected: ${name}`,
      component
    );
  } else {
    console.log(`✅ Component OK: ${name}`);
  }
  return component;
}
// import UserDashboard from "../../component/reusables/userDashboard"

// export default function DashboardPage() {
//   return <UserDashboard />
// }