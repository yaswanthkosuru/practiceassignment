const SUPPORTED_LANGUAGES = ["en", "sv"];

const TRANSLATIONS = {
  en: {
    login: {
      heading: "Log in",
      emailLabel: "Enter your email address",
      emailPlaceholder: "Email address",
      passwordLabel: "Enter your password",
      passwordPlaceholder: "Password",
      showPassword: "Show password",
      hidePassword: "Hide password",
      submitButton: "Log in",
      registerLink: "Register",
      forgotPasswordLink: "Forgot password?",
      errors: {
        emailRequired: "Email is required",
        emailInvalid: "Please enter a valid email address",
        passwordRequired: "Password is required",
        userNotFound: "The user does not exist",
        invalidCredentials: "Invalid username or password",
      },
    },
    nav: {
      logo: "Logo",
      home: "Home",
      order: "Order",
      customers: "Our Customers",
      about: "About Us",
      contact: "Contact Us",
    },
    footer: {
      brand: "123 Fakturera",
      home: "Home",
      order: "Order",
      contact: "Contact us",
      copyright: "© Lättfaktura, CRO no. 638537, 2025. All rights reserved.",
    },
    dashboard: {
      menu: "Menu",
      invoices: "Invoices",
      customers: "Customers",
      mybusiness: "My Business",
      invoicejournal: "Invoice Journal",
      pricelist: "Price List",
      multipleinvoicing: "Multiple Invoicing",
      unpaidinvoices: "Unpaid Invoices",
      offer: "Offer",
      inventorycontrol: "Inventory Control",
      memberinvoicing: "Member Invoicing",
      importexport: "Import/Export",
      logout: "Log out",
    },
    menuStructure: [
      { id: "invoices", icon: "📄", route: "/dashboard/invoices", order: 1 },
      { id: "customers", icon: "👥", route: "/dashboard/customers", order: 2 },
      {
        id: "mybusiness",
        icon: "⚙️",
        route: "/dashboard/mybusiness",
        order: 3,
      },
      {
        id: "invoicejournal",
        icon: "📋",
        route: "/dashboard/invoicejournal",
        order: 4,
      },
      { id: "pricelist", icon: "💰", route: "/dashboard", order: 5 },
      {
        id: "multipleinvoicing",
        icon: "📑",
        route: "/dashboard/multipleinvoicing",
        order: 6,
      },
      {
        id: "unpaidinvoices",
        icon: "💳",
        route: "/dashboard/unpaidinvoices",
        order: 7,
      },
      { id: "offer", icon: "🎁", route: "/dashboard/offer", order: 8 },
      {
        id: "inventorycontrol",
        icon: "📦",
        route: "/dashboard/inventorycontrol",
        order: 9,
      },
      {
        id: "memberinvoicing",
        icon: "💼",
        route: "/dashboard/memberinvoicing",
        order: 10,
      },
      {
        id: "importexport",
        icon: "☁️",
        route: "/dashboard/importexport",
        order: 11,
      },
      { id: "logout", icon: "🚪", route: "/logout", order: 12 },
    ],
  },
  sv: {
    login: {
      heading: "Logga in",
      emailLabel: "Skriv in din epost adress",
      emailPlaceholder: "Epost adress",
      passwordLabel: "Skriv in ditt lösenord",
      passwordPlaceholder: "Lösenord",
      showPassword: "Visa lösenord",
      hidePassword: "Dölj lösenord",
      submitButton: "Logga in",
      registerLink: "Registrera dig",
      forgotPasswordLink: "Glömt lösenord?",
      errors: {
        emailRequired: "E-post krävs",
        emailInvalid: "Användaren finns inte",
        passwordRequired: "Lösenord krävs",
        userNotFound: "Användaren finns inte",
        invalidCredentials: "Ogiltigt användarnamn eller lösenord",
      },
    },
    nav: {
      logo: "Logotyp",
      home: "Hem",
      order: "Beställa",
      customers: "Våra Kunder",
      about: "Om Oss",
      contact: "Kontakta Oss",
    },
    footer: {
      brand: "123 Fakturera",
      home: "Hem",
      order: "Beställa",
      contact: "Kontakta oss",
      copyright:
        "© Lättfaktura, org.nr. 638537, 2025. Alla rättigheter förbehållna.",
    },
    dashboard: {
      menu: "Meny",
      invoices: "Fakturor",
      customers: "Kunder",
      mybusiness: "Mitt Företag",
      invoicejournal: "Fakturajournal",
      pricelist: "Prislista",
      multipleinvoicing: "Flerfakturering",
      unpaidinvoices: "Obetalda Fakturor",
      offer: "Erbjudande",
      inventorycontrol: "Lagerkontroll",
      memberinvoicing: "Medlemsfakturering",
      importexport: "Import/Export",
      logout: "Logga ut",
    },
    menuStructure: [
      { id: "invoices", icon: "📄", route: "/dashboard/invoices", order: 1 },
      { id: "customers", icon: "👥", route: "/dashboard/customers", order: 2 },
      {
        id: "mybusiness",
        icon: "⚙️",
        route: "/dashboard/mybusiness",
        order: 3,
      },
      {
        id: "invoicejournal",
        icon: "📋",
        route: "/dashboard/invoicejournal",
        order: 4,
      },
      { id: "pricelist", icon: "💰", route: "/dashboard", order: 5 },
      {
        id: "multipleinvoicing",
        icon: "📑",
        route: "/dashboard/multipleinvoicing",
        order: 6,
      },
      {
        id: "unpaidinvoices",
        icon: "💳",
        route: "/dashboard/unpaidinvoices",
        order: 7,
      },
      { id: "offer", icon: "🎁", route: "/dashboard/offer", order: 8 },
      {
        id: "inventorycontrol",
        icon: "📦",
        route: "/dashboard/inventorycontrol",
        order: 9,
      },
      {
        id: "memberinvoicing",
        icon: "💼",
        route: "/dashboard/memberinvoicing",
        order: 10,
      },
      {
        id: "importexport",
        icon: "☁️",
        route: "/dashboard/importexport",
        order: 11,
      },
      { id: "logout", icon: "🚪", route: "/logout", order: 12 },
    ],
  },
};

exports.getTranslations = async (req, res) => {
  try {
    const { language } = req.params;

    if (!language) {
      return res.status(400).json({
        error: "Language parameter is required",
      });
    }

    const lang = language.toLowerCase();

    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      return res.status(404).json({
        error: `Language '${language}' is not supported. Supported languages: ${SUPPORTED_LANGUAGES.join(
          ", "
        )}`,
      });
    }

    const translations = TRANSLATIONS[lang];

    if (!translations) {
      return res.status(404).json({
        error: `Translation data for language '${language}' not found`,
      });
    }

    res.json(translations);
  } catch (error) {
    console.error("Error loading translations:", error);
    res.status(500).json({
      error: "Server error while loading translations",
    });
  }
};

exports.getSupportedLanguages = async (req, res) => {
  try {
    res.json({
      languages: SUPPORTED_LANGUAGES,
      default: "en",
    });
  } catch (error) {
    console.error("Error getting supported languages:", error);
    res.status(500).json({
      error: "Server error while getting supported languages",
    });
  }
};
