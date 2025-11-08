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
    terms: {
      heading: "Terms",
      closebutton: "Close and Go Back",
      content: "BY clicking Invoice Now, you choose to register according to the information that you have typed in and the text on the registration page and the terms here, and you at the same time accept the terms here.\n\nYou can use the program FOR FREE for 14 days.\n\n123 Fakturera is so easy and self-explanatory that the chance that you will need support is minimal, but if you should need support, we are here for you, with our office manned for the most part of the day. After the trial period, the subscription continues and costs SEK 99 excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from registration.\n\nYou have of course the right to terminate the use of the program without any costs, by giving us notice per email before 14 days from registration, that you do not want to continue with the program, and you then of course do not pay anything.\n\nIf we do not receive such a notice from you before 14 days from registration, then the order, for natural reasons, cannot be changed. With registration it is meant the date and time when you did choose to press the button Invoice Now.\n\nBilling is for one year at a time.\n\nThe price for 123 Fakturera (offer price SEK 99 per month / ordinary price SEK 159 per month) is for the annual fee Start for one year's use of the program.\n\n(When using the offer price of SEK 99, the one-year period is calculated from registration.)\n\nAll prices are excluding. VAT.\n\nOffer, Inventory Control, Member Invoicing, Multiuser version and English printout are (or can be) additional modules that can be ordered later.\n\nIntermediation, as well as invoicing, may take place from K-Soft Sverige AB, Box 2826, 187 28 Täby. In the future, we may choose to cooperate with another company for e.g. intermediation and invoicing. However, the customer relationship is with us. The payment is made to the company from which the invoice comes.\n\nThe annual fee is on a continuous basis, but if you do not wish to continue using the program, all you have to do is give notice thirty days before the start of the next one-year period.\n\nThe introductory offer ( SEK 99 per month) is for the annual fee Start for the first year. After the first year, the ordinary price is billed, which is currently, for annual fee Start, one hundred and fifty-nine kroner per month, for annual fee Remote control, three hundred kroner per month and for annual fee Pro, three hundred and thirty-three kroner per month. After one year, the annual Remote Control fee is invoiced as standard, but you can choose Start or Pro by giving notice at any time before the due date.\n\nIf you choose to keep the program by not notifying us by email within 14 days of registration that you do not wish to continue with the program, you accept that you will pay the invoice for your order. Failure to pay the invoice or late payment does not give the right to cancel the order. We are happy to help you with logo at a cost price.\n\nLicense for the use of 123 Fakturera is of course sold in accordance with applicable laws.\n\nIn order to be able to help you more easily and provide you with support, as well as to comply with the laws, we, for natural reasons, have to store your information.\n\nIn connection with the storage of information, the law requires that we provide you with the following information:\n\nIf you order as a private person, you have the right to cancel as stated by law. Your information is stored so that we can help you, etc. We will use it to be able to help you if you need help, follow the laws regarding bookkeeping, etc. When there are upgrades and the like, we may send you offers and the like about our products and services by email or the like. You may be contacted by email, post and telephone. If you don't want to be contacted, just send us an email about it.\n\nYou can at any time ask not to be sent information about upgrades by email, letter or the like, and we will of course not do that. You send such a request to us by email, post or similar.\n\nFor natural reasons, we have to store, process and move your data. Your information is stored until further notice. You give us permission to store, process and move your data, as well as to send you offers and the like by email, letter and the like, and tell others that you are customer. Due to the way it works with software, permission also needs to be given to other parties. The permission is therefore granted to us, as well as to the companies and/or person(s) who own the software, the source code, the website and the like. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control us. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control the companies (if any), which own or will own the software, source code, website and the like. It is also given to current and future persons (if any) who own or will own the software, source code, website and the like. This applies both to current and future products and services. It is also given to another company, (like K-Soft Sverige AB), which we can use to send/sell products, upgrades and the like, either by intermediation or otherwise.\n\nYou of course have the right to request access to, change and deletion of the information we hold about you. You also have the right to request restriction of data processing, and to object to data processing and the right to data portability. You have the right to complain to the supervisory authority. You can find more legal information about us here. The laws of Ireland are the applicable laws. Placing an order is of course completely voluntary. Of course, we do not use any automated profiling or decisions.\n\nIf you wish to contact us, please use the information on this website.\n\nClick on Invoice Now to register according to the information you have entered and the terms here. (Date and time of admission are entered automatically in our registers.)\n\nOur experience is that our customers are very satisfied with the way we work and hope and believe that this will also be your experience.\n\nHave a great day!"
    },
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
    terms: {
      heading: "Villkor",
      closebutton: "Stäng och gå tillbaka",
      content: "GENOM ATT klicka på Fakturera Nu så väljer ni att registrera enligt den information som ni har lagt in och texten på registrerings sidan och villkoren här, och accepterar samtidigt villkoren här.\n\nNi kan använda programmet GRATIS i 14 dagar.\n\n123 Fakturera är så lätt och självförklarande att chansen för att du kommer behöva support är minimal, men om du skulle behöva support, så är vi här för dig, med vårt kontor bemannat större delen av dygnet. Efter provperioden så fortsätter abonnemanget och kostar 99 kronor exkl. moms per månad, som faktureras årligen. Om du inte vill behålla programmet, så är det bara att avbryta provperioden genom att ge oss besked inom 14 dagar från registrering.\n\nNi har självklart rätt att avsluta användningen av programmet utan kostnad, genom att ge oss besked per email inom 14 dagar från registrering, att ni inte vill fortsätta med programmet, och betalar då självklart inte heller något.\n\nOm vi inte inom 14 dagar från registrering mottar sådant besked från er, så kan ordern av naturliga orsaker inte ändras. Med registrering menas det datum och klockslag då ni valde att trycka på knappen Fakturera Nu.\n\nFakturering sker för ett år i taget.\n\nPriset för 123 Fakturera (specialpris kr 99:- / ord. pris kr 159:- per månad) är för årsavgift Start för ett års användning av programmet.\n\n(Vid användning av specialpriset kr 99:- så räknas ett års perioden från registrering.)\n\nAlla priser är exkl. moms.\n\nOffert, Lagerstyrning, Medlemsfakturering, Fleranvändarversion och Engelsk utskrift är (eller kan vara) tilläggsmoduler som kan beställas senare.\n\nFörmedling, samt fakturering kan komma att ske från K-Soft Sverige AB, Box 2826, 187 28 Täby. Vi kan i framtiden välja att samarbeta med annat företag för t.ex. förmedling och fakturering. Kundförhållandet är dock självklart med oss. Betalningen görs till det företag som fakturan kommer från.\n\nÅrsavgiften är löpande men om ni inte vill fortsätta att använda programmet, så är det bara att ge besked trettio dagar innan ingången av nästföljande ett års period.\n\nIntroduktionspriset (kr 99:- per månad) är för årsavgift Start för det första året. Efter det första året faktureras ord. pris vilket för närvarande är, för årsavgift Start, ett hundra och femtinio kronor per månad, för årsavgift Fjärrstyrning, tre hundra kronor per månad och för årsavgift Pro, tre hundra och trettiotre kronor per månad. Efter ett år faktureras årsavgift Fjärrstyrning som standard men ni kan välja Start eller Pro genom att ge besked när som helst innan förfallodagen.\n\nOm ni väljer att behålla programmet genom att inte ge oss besked per email innan 14 dagar från registrering, om att ni inte vill fortsätta med programmet, så accepterar ni att ni kommer att betala fakturan för er beställning. Att inte betala fakturan eller sen betalning ger inte rätt till att annullera beställningen. Vi hjälper gärna att fiksa logo för er till självkostpris.\n\nLicens för användning av 123 Fakturera säljs självklart enligt gällande lagar.\n\nFör att lättare kunna hjälpa er och ge er support samt för att följa lagarna, måste vi av naturliga orsaker spara er information.\n\nI samband med lagring av information så kräver lagen att vi ger er följande information:\n\nOm ni beställer som privatperson så har ni den ångerrätt som lagen fastställer. Er information sparas så att vi kan hjälpa er m.m. Vi kommer använda den för att kunna hjälpa er om ni behöver hjälp, följa lagarna ang. bokföring m.m. När det kommer uppgraderingar och liknande, kan vi komma att skicka er erbjudande och liknande om våra produkter och tjänster per email eller liknande. Ni kan också komma att bli kontaktad per email, post och telefon. Om ni inte vill bli kontaktad, bara skicka oss en email ang. det.\n\nNi kan när som helst begära att inte få tillsänt information om uppgraderingar per email, brev eller liknande och vi kommer då självklart inte att göra det. Sådan begäran skickar ni till oss per email, brev eller liknande.\n\nAv naturliga orsaker måste vi spara, databehandla och flytta era data. Er information sparas tills vidare. Ni ger oss medgivande till att lagra, databehandla och flytta era data, samt att skicka er erbjudanden och liknande per email, brev och liknande, samt att informera andra om att ni är kund. Pga. sättet det fungerar på med programvara behöver medgivandet också ges till andra parter. Medgivandet ges därför till oss, samt till de företag och/eller person/personer som äger programvaran, källkod, hemsidan och liknande. Det ges också till nuvarande och framtida företag ägda och/eller kontrollerade av en eller flera av de som i dag äger och/eller kontrollerar oss. Det ges också till nuvarande och framtida personer (om några) som äger eller kommer till att äga programvaran, källkod, hemsidan och liknande. Detta både för nuvarande och framtida produkter och tjänster. Det ges också till ett annat företag, (som K-Soft Sverige AB), som vi kan använda för att skicka/sälja produkter, uppgraderingar och liknande, antingen genom att under förmedla programvaran eller på annat sätt.\n\nNi har självklart rätt att begära tillgång till, rättelse eller radering av informationen vi har om er. Ni har också rätt att begära begränsning av behandlingen av era uppgifter, eller att invända mot behandling samt rätten till dataportabilitet. Ni har självklart rätt att klaga till tillsynsmyndighet. Mer juridisk info om oss hittar ni här. Det är lagarna i Irland som är gällande lagar. Det är självklart helt frivilligt att lägga er order. Vi använder självklart inte någon automatiserad profilering och inte heller något automatiserat beslutsfattande.\n\nOm ni vill kontakta oss, vänligen använd då informationen på denna hemsidan.\n\nKlicka på Fakturera Nu för att registrera i enlighet med den information som ni har lagt in och villkoren här. (Datum och tidpunkt för inläggningen läggs in automatiskt i våra register.)\n\nVår erfarenhet är att våra kunder är mycket nöjda med sättet vi arbetar på och vi hoppas och tror att det också kommer att bli er upplevelse.\n\nHa en trevlig dag!"
    },
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
