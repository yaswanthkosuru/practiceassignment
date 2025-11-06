export const mockProducts = [
  {
    id: 1,
    articleNo: "1234567890",
    productService: "This is a test product with fifty characters this!",
    inPrice: "900500",
    price: "1500800",
    unit: "kilometers/hour",
    inStock: "2500600",
    description: "This is the description with fifty characters this"
  },
  {
    id: 2,
    articleNo: "9876543210",
    productService: "Sony DSLR 12345",
    inPrice: "10000",
    price: "15000",
    unit: "pieces",
    inStock: "50",
    description: "Professional camera equipment"
  },
  {
    id: 3,
    articleNo: "5551234567",
    productService: "Random product",
    inPrice: "800",
    price: "1234",
    unit: "units",
    inStock: "100",
    description: "General product item"
  },
  {
    id: 4,
    articleNo: "4445556666",
    productService: "Laptop Computer HP",
    inPrice: "45000",
    price: "65000",
    unit: "pieces",
    inStock: "25",
    description: "High performance laptop"
  },
  {
    id: 5,
    articleNo: "7778889999",
    productService: "Office Chair Ergonomic",
    inPrice: "5000",
    price: "8500",
    unit: "pieces",
    inStock: "150",
    description: "Comfortable office seating"
  }
];

export const menuItems = [
  { id: "invoices", label: "Invoices", icon: "📄", active: false },
  { id: "customers", label: "Customers", icon: "👥", active: false },
  { id: "mybusiness", label: "My Business", icon: "⚙️", active: false },
  { id: "invoicejournal", label: "Invoice Journal", icon: "📋", active: false },
  { id: "pricelist", label: "Price List", icon: "💰", active: true },
  { id: "multipleinvoicing", label: "Multiple Invoicing", icon: "📑", active: false },
  { id: "unpaidinvoices", label: "Unpaid Invoices", icon: "💳", active: false },
  { id: "offer", label: "Offer", icon: "🎁", active: false },
  { id: "inventorycontrol", label: "Inventory Control", icon: "📦", active: false },
  { id: "memberinvoicing", label: "Member Invoicing", icon: "💼", active: false },
  { id: "importexport", label: "Import/Export", icon: "☁️", active: false },
  { id: "logout", label: "Log out", icon: "🚪", active: false }
];
