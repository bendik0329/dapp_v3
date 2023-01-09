/* eslint-disable prettier/prettier */
import { Outlet } from 'react-router-dom';
// material
//
import useSettings from '../../hooks/useSettings';

// ----------------------------------------------------------------------

export default function AuthLayout() {
  const { themeMode } = useSettings();
  return (
    <div id={themeMode} >
      <div>
        <Outlet />
      </div>
    </div>
  );
}
