import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import useFetchTranslations from '../hooks/useFetchTranslations';

export const LangContext = createContext();

const defaultTranslations = {
  "login": {
    "heading": "Log in",
    "emailLabel": "Enter your email address",
    "emailPlaceholder": "Email address",
    "passwordLabel": "Enter your password",
    "passwordPlaceholder": "Password",
    "showPassword": "Show password",
    "hidePassword": "Hide password",
    "submitButton": "Log in",
    "registerLink": "Register",
    "forgotPasswordLink": "Forgot password?",
    "errors": {
      "emailRequired": "Email is required",
      "emailInvalid": "Please enter a valid email address",
      "passwordRequired": "Password is required",
      "userNotFound": "The user does not exist",
      "invalidCredentials": "Invalid username or password"
    }
  },
  "nav": {
    "logo": "Logo",
    "home": "Home",
    "order": "Order",
    "customers": "Our Customers",
    "about": "About Us",
    "contact": "Contact Us"
  },
  "footer": {
    "brand": "123 Fakturera",
    "home": "Home",
    "order": "Order",
    "contact": "Contact us",
    "copyright": "© Lättfaktura, CRO no. 638537, 2025. All rights reserved."
  },
  "dashboard": {
    "menu": "Menu",
    "invoices": "Invoices",
    "customers": "Customers",
    "mybusiness": "My Business",
    "invoicejournal": "Invoice Journal",
    "pricelist": "Price List",
    "multipleinvoicing": "Multiple Invoicing",
    "unpaidinvoices": "Unpaid Invoices",
    "offer": "Offer",
    "inventorycontrol": "Inventory Control",
    "memberinvoicing": "Member Invoicing",
    "importexport": "Import/Export",
    "logout": "Log out"
  },
  "menuStructure": [
    { "id": "invoices", "icon": "📄", "route": "/dashboard/invoices", "order": 1 },
    { "id": "customers", "icon": "👥", "route": "/dashboard/customers", "order": 2 },
    { "id": "mybusiness", "icon": "⚙️", "route": "/dashboard/mybusiness", "order": 3 },
    { "id": "invoicejournal", "icon": "📋", "route": "/dashboard/invoicejournal", "order": 4 },
    { "id": "pricelist", "icon": "💰", "route": "/dashboard", "order": 5 },
    { "id": "multipleinvoicing", "icon": "📑", "route": "/dashboard/multipleinvoicing", "order": 6 },
    { "id": "unpaidinvoices", "icon": "💳", "route": "/dashboard/unpaidinvoices", "order": 7 },
    { "id": "offer", "icon": "🎁", "route": "/dashboard/offer", "order": 8 },
    { "id": "inventorycontrol", "icon": "📦", "route": "/dashboard/inventorycontrol", "order": 9 },
    { "id": "memberinvoicing", "icon": "💼", "route": "/dashboard/memberinvoicing", "order": 10 },
    { "id": "importexport", "icon": "☁️", "route": "/dashboard/importexport", "order": 11 },
    { "id": "logout", "icon": "🚪", "route": "/logout", "order": 12 }
  ]
};

export const LangProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const [translations, setTranslations] = useState(defaultTranslations);
  const { data, loading, error } = useFetchTranslations(language);

  useEffect(() => {
    if (data) {
      setTranslations(data);
    }
  }, [data]);

  const changeLanguage = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  }, []);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }

    return value || key;
  }, [translations]);

  const getMenuItems = useCallback(() => {
    const menuStructure = translations.menuStructure || [];
    return menuStructure.map(item => ({
      ...item,
      label: t(`dashboard.${item.id}`)
    }));
  }, [translations, t]);

  const value = useMemo(() => ({
    language,
    changeLanguage,
    t,
    loading,
    error,
    translations,
    getMenuItems
  }), [language, changeLanguage, t, loading, error, translations, getMenuItems]);

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
};
