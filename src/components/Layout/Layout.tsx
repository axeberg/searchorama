import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col py-6">
        <Outlet />
      </div>
    </main>
  );
}
