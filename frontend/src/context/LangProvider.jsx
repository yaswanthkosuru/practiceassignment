import { createContext, useState, useEffect, useCallback } from 'react';
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
      "emailInvalid": "Please enter a valid email address"
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
    "logout": "Log out",
    "searchArticle": "Search Article No ...",
    "searchProduct": "Search Product ...",
    "newProduct": "New Product",
    "printList": "Print List",
    "advancedMode": "Advanced mode",
    "articleNo": "Article No.",
    "productService": "Product/Service",
    "inPrice": "In Price",
    "price": "Price",
    "unit": "Unit",
    "inStock": "In Stock",
    "description": "Description"
  }
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

  const value = {
    language,
    changeLanguage,
    t,
    loading,
    error,
    translations
  };

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
};
