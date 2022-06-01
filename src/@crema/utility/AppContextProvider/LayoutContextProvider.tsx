import React, {createContext, useCallback, useContext, useState, useEffect} from 'react';
import defaultConfig from './defaultConfig';
import PropTypes from 'prop-types';
import {useAuthUser} from '../../utility/AuthHooks';
import { NavStyle } from '../../../shared/constants/AppEnums';

export interface LayoutData {
  layoutType: string;
  navStyle: string;
  footerType: string;
  headerType: string;
  footer: boolean;
}

export interface LayoutActions {
  updateLayoutType: (layout: string) => void;
  updateNavStyle: (navStyle: string) => void;
  setFooterType: (footerType: string) => void;
  setFooter: (footer: boolean) => void;
  setHeaderType: (headerType: string) => void;
}

const LayoutContext = createContext<LayoutData>({
  footer: defaultConfig.footer,
  navStyle: defaultConfig.navStyle,
  layoutType: defaultConfig.layoutType,
  footerType: defaultConfig.footerType,
  headerType: defaultConfig.headerType,
});

const LayoutActionsContext = createContext<LayoutActions>({
  updateLayoutType: () => {},
  updateNavStyle: () => {},
  setFooterType: () => {},
  setFooter: () => {},
  setHeaderType: () => {},
});

export const useLayoutContext = () => useContext(LayoutContext);

export const useLayoutActionsContext = () => useContext(LayoutActionsContext);

const LayoutContextProvider: React.FC<any> = ({children}) => {
  const [layoutType, updateLayoutType] = useState<string>(
    defaultConfig.layoutType,
  );
  const [navStyle, setNavStyle] = useState<string>(defaultConfig.navStyle);
  const {user} = useAuthUser();

  useEffect(() => {
    if(user?.role === 3) {
      setNavStyle(NavStyle.H_DEFAULT)
    } else {
      setNavStyle(NavStyle.DEFAULT)
    }
  }, [user?.role]);

  const updateNavStyle = useCallback((navStyle) => {
    setNavStyle(navStyle);
  }, []);

  const [footerType, setFooterType] = useState<string>(
    defaultConfig.footerType,
  );
  const [footer, setFooter] = useState<boolean>(defaultConfig.footer);
  const [headerType, setHeaderType] = useState<string>(
    defaultConfig.headerType,
  );

  return (
    <LayoutContext.Provider
      value={{
        navStyle,
        footerType,
        footer,
        layoutType,
        headerType,
      }}
    >
      <LayoutActionsContext.Provider
        value={{
          setFooter,
          setFooterType,
          updateNavStyle,
          updateLayoutType,
          setHeaderType,
        }}
      >
        {children}
      </LayoutActionsContext.Provider>
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;

LayoutContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
