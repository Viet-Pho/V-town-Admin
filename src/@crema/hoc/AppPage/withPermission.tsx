import React, {useEffect, useState} from 'react';
import Router, {useRouter} from 'next/router';
import AppLoader from '../../core/AppLoader';
import {useAuthUser} from '../../utility/AuthHooks';
import { flattenRoute } from '../../../modules/routesConfig'
import Error403 from '../../../modules/errorPages/Error403'

const withPermission = (ComposedComponent) => (props) => {
  const {user} = useAuthUser();
  const [hasPermission, setHasPermission] = useState(true)
  
  useEffect(() => {
    const accessComponent = flattenRoute.find(route => route.url === window.location.pathname)
    if (accessComponent && accessComponent.permittedRole && !accessComponent.permittedRole.includes(user.role)) {
      setHasPermission(false)
    } 
  }, [user.role, window.location.pathname]);

  if (hasPermission) {
    return <ComposedComponent {...props} />;
  } else {
    return <Error403 {...props}></Error403>
  }
};
export default withPermission;
