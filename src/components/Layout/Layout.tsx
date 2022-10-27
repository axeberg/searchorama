import { Outlet } from 'react-router-dom';
import { Theme, ThemeProvider } from 'theme-ui';

export const theme: Theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
}

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <main className={''}>
        <div className={''}>
          <Outlet />
        </div>
      </main>
    </ThemeProvider>
  );
}
