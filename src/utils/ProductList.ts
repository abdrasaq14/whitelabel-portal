import { fDate } from "./formatTime";
import { formatAmount } from "./Helpfunctions";
interface Pagination {
    page: number;
    pageSize: number;
    totalRows: number;
}
export interface ProductList {
    name: string;
    images: string[];
    caption: string;
    price: Number;
    type: string;
    colors: string[];
    categories: string[];
    productId:string;
    itemQuantity: number;
    merchant: string;
    category: string;
    dateListed: string;
    description: string;
  
  }

  
interface ProductListProps {
  data: ProductList[];
  pagination: Pagination;
}
  
  export const mockProductList = {
    data:  [
      {
        serialNumber: 1,
        name: "Wireless Headphones",
        images: [ "/images/green-watch.svg", "/images/gold-watch.svg", "/images/black-watch.svg", "/images/silver-watch.svg"],
        caption: "Amazon wireless headphones with noise cancellation and Bluetooth connectivity. Available in black, white, and red. ",
        price: 200,
        rating: 3,
        location: "Lagos, Nigeria",
        type: "Physical",
        storeLink: "https://supermart.com",
        colors: ["black", "white", "red"],
        categories: ["Electronics", "Audio"],
        productId: "Prd #1002",
        itemQuantity: 3,
        merchant: "John Bosco",
        category: "Clothing",
        dateListed: "Apr 12, 2023 | 09:32AM",
        description: "<p>Experience high-quality sound with our wireless headphones. These headphones provide crisp audio and come in a variety of stylish colors.</p>"

      },
      {
        serialNumber: 2,
        name: "Ebook Reader",
        images: [ "/images/green-watch.svg", "/images/gold-watch.svg", "/images/black-watch.svg", "/images/silver-watch.svg"],
        caption: "Amazon Kindle Paperwhite with 8GB storage and a 6-inch display. Available in black and gray.",
        price: 150,
        rating: 4,
        location: "Abuja, Nigeria",
        storeLink: "https://megagoods.com",
        type: "Digital",
        colors: ["gray"],
        categories: ["Electronics", "Books"],
        productId: "Prd #1003",
        itemQuantity: 1,
        merchant: "Jane Smith",
        category: "Electronics",
        dateListed: "May 5, 2023 | 11:15AM",
        description: "<p>Experience high-quality sound with our wireless headphones. These headphones provide crisp audio and come in a variety of stylish colors.</p>"
      },
      {
        serialNumber: 3,
        productId: "Prd #1004",
        name: "Yoga Mat",
        storeLink: "https://quickbuy.com",
        images: ["/images/product-image.svg", "/images/green-watch.svg", "/images/gold-watch.svg", "/images/black-watch.svg", "/images/silver-watch.svg"],
        caption: "AmazonBasics 1/2-inch extra thick yoga mat with carrying strap. Available in blue, purple, and green.",
        price: 50,
        rating: 5,
        location: "Edo, Nigeria",
        type: "Physical",
        colors: ["blue", "purple", "green"],
        categories: ["Sports", "Fitness"],
        itemQuantity: 2,
        merchant: "David Johnson",
        category: "Home & Garden",
        dateListed: "Jun 20, 2023 | 03:45PM",
        description: "<p>Experience high-quality sound with our wireless headphones. These headphones provide crisp audio and come in a variety of stylish colors.</p>"

      },
      {
        serialNumber: 4,
        name: "Digital Camera",
        images: ["/images/product-image.svg", "/images/green-watch.svg", "/images/gold-watch.svg", "/images/black-watch.svg", "/images/silver-watch.svg"],
        caption: "Canon EOS Rebel T7 DSLR camera with 18-55mm lens. Available in silver and black.",
        price: 300,
        rating: 2.5,
        location: "London, Uk",
        storeLink: "https://citygrocery.com",
        type: "Physical",
        colors: ["silver", "black"],
        categories: ["Electronics", "Photography"],
        productId: "Prd #1005",
        itemQuantity: 5,
        merchant: "Emily Davis",
        category: "Toys & Games",
        dateListed: "Jul 8, 2023 | 10:20AM",
        description: "<p>Experience high-quality sound with our wireless headphones. These headphones provide crisp audio and come in a variety of stylish colors.</p>"
      },
      {
        serialNumber: 5,
        name: "Software Subscription",
        images: ["/images/product-image.svg", "/images/green-watch.svg", "/images/gold-watch.svg", "/images/black-watch.svg", "/images/silver-watch.svg"],
        caption: "Microsoft 365 Personal | 12-month subscription, 1 person, PC/Mac Download",
        price: 100,
        rating: 3.5,
        storeLink: "https://freshfoods.com",
        location: "Liverpool, Uk",
        type: "Digital",
        colors: [],
        categories: ["Software", "Subscription"],
        productId: "Prd #1006",
        itemQuantity: 1,
        merchant: "Michael Brown",
        category: "Books",
        dateListed: "Aug 16, 2023 | 02:55PM",
        description: "<p>Experience high-quality sound with our wireless headphones. These headphones provide crisp audio and come in a variety of stylish colors.</p>"
      },
      {
        serialNumber: 6,
        name: "Smartwatch",
        images: ["/images/product-image.svg", "/images/green-watch.svg", "/images/gold-watch.svg", "/images/black-watch.svg", "/images/silver-watch.svg"],
        caption: "Samsung Galaxy Watch Active2 (40mm, GPS, Bluetooth) Smart Watch with Advanced Health Monitoring, Fitness Tracking, and Long Lasting Battery",
        price: 250,
        rating: 3,
        storeLink: "https://supermart.com",
        location: "Delta, Nigeria",
        type: "Physical",
        colors: ["black", "silver", "rose gold"],
        categories: ["Electronics", "Wearable Technology"],
        productId: "Prd #1007",
        itemQuantity: 4,
        merchant: "Emma Wilson",
        category: "Beauty & Personal Care",
        dateListed: "Sep 1, 2023 | 08:10AM",
        description: "<p>Experience high-quality sound with our wireless headphones. These headphones provide crisp audio and come in a variety of stylish colors.</p>"
      },
      {
        serialNumber: 7,
        name: "Cookbook (PDF)",
        storeLink: "https://megagoods.com",
        images: ["/images/product-image.svg", "/images/green-watch.svg", "/images/gold-watch.svg", "/images/black-watch.svg", "/images/silver-watch.svg"],
        caption: "The Complete Cooking for Two Cookbook: 650 Recipes for Everything You'll Ever Want to Make",
        price: 20,
        rating: 2,
        location: "Delta, Nigeria",
        type: "Digital",
        colors: [],
        categories: ["Books", "Cooking"],
        productId: "Prd #1008",
        itemQuantity: 2,
        merchant: "Christopher Martinez",
        category: "Sports & Outdoors",
        dateListed: "Oct 19, 2023 | 05:30PM",
        description: "<p>Experience high-quality sound with our wireless headphones. These headphones provide crisp audio and come in a variety of stylish colors.</p>"
      },
      {
        serialNumber: 8,
        name: "Dumbbells",
        storeLink: "https://quickbuy.com",
        images: ["/images/product-image.svg", "/images/green-watch.svg", "/images/gold-watch.svg", "/images/black-watch.svg", "/images/silver-watch.svg"],
        caption: "AmazonBasics Neoprene Dumbbell Hand Weights, 3 Pound Each, Set of 2, Blue and Purple, No-Slip, for Home Gym Fitness Training",
        price: 75,
        rating: 5,
        location: "Lagos, Nigeria",
        type: "Physical",
        colors: ["black", "gray"],
        categories: ["Sports", "Fitness"],
        productId: "Prd #1009",
        itemQuantity: 3,
        merchant: "Olivia Taylor",
        category: "Health & Wellness",
        dateListed: "Nov 7, 2023 | 12:45PM",
        description: "<p>Experience high-quality sound with our wireless headphones. These headphones provide crisp audio and come in a variety of stylish colors.</p>"
        }
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        totalRows: 40,
      },
  }
  

  

  interface TeamMember {
    id: number;
    name: string;
    email: string;
    staffId: string;
    role: "Admin" | "User" | "Moderator"; // Define role as specific strings
    avatar_url: string;
    phone: string;
}


interface TeamDataProps {
    data: TeamMember[];
    pagination: Pagination;
}

export const TeamMember: TeamDataProps ={
  data: [
      {
          id: 1,
          name: 'John Doe',
          email: "johndoe@gmail.com",
          staffId:"STF001",
          role: "Admin",
          avatar_url: "/images/avatar.svg",
          phone: "+234 123 456 7890",
      },
      {
          id: 2,
          name: 'Jane Smith',
          email: "janesmith@example.com",
          staffId:"STF002",
          role: "User",
          avatar_url: "/images/avatar.svg",
          phone: "+1 234-567-8901",
      },
      {
          id: 3,
          name: 'Michael Johnson',
          email: "michaeljohnson@example.com",
          staffId:"STF003",
          role: "Moderator",
          avatar_url: "/images/avatar.svg",
          phone: "+44 1234 567890",
      },
      {
          id: 4,
          name: 'Emily Davis',
          email: "emilydavis@example.com",
          staffId:"STF004",
          role: "User",
          avatar_url: "/images/avatar.svg",
          phone: "+61 2 1234 5678",
      },
      {
          id: 5,
          name: 'David Wilson',
          email: "davidwilson@example.com",
          staffId:"STF005",
          role: "Admin",
          avatar_url: "/images/avatar.svg",
          phone: "+81 3-1234-5678",
      },
      {
          id: 6,
          name: 'Sarah Brown',
          email: "sarahbrown@example.com",
          staffId:"STF006",
          role: "User",
          avatar_url: "/images/avatar.svg",
          phone: "+27 21 123 4567",
      },
      {
          id: 7,
          name: 'Chris Lee',
          email: "chrislee@example.com",
          staffId:"STF007",
          role: "Moderator",
          avatar_url: "/images/avatar.svg",
          phone: "+65 6123 4567",
      },
      {
          id: 8,
          name: 'Emma Garcia',
          email: "emmagarcia@example.com",
          staffId:"STF008",
          role: "User",
          avatar_url: "/images/avatar.svg",
          phone: "+54 11 1234-5678",
      },
      {
          id: 9,
          name: 'Daniel Martinez',
          email: "danielmartinez@example.com",
          staffId:"STF009",
          role: "Admin",
          avatar_url: "/images/avatar.svg",
          phone: "+52 55 1234 5678",
      },
      {
          id: 10,
          name: 'Olivia Hernandez',
          email: "oliviahernandez@example.com",
          staffId:"STF010",
          role: "User",
          avatar_url: "/images/avatar.svg",
          phone: "+7 495 123-45-67",
      }
  ],
  pagination: {
      page: 1,
      pageSize: 10,
      totalRows: 40,
    },

}


interface OrderDetails {
  id: number;
  OrderId: string;
  amount: string;
  Date: string;
  status: string;
  quantity: number;
  deliveryMethod: string;
  customerInfo:{
    name: string;
    email: string;
    phone: string;
    address: string;
  }
  productInfo:
    {
      name: string;
      price: string;
      quantity: number;
      vendor: string;
      description: string;
      productId: string;
    }[]
  
  
}

export interface OrderDetailsProps {
  data: OrderDetails[];
  pagination: Pagination;
}



export const OrderDetailsMockData: OrderDetailsProps ={
  data:[
    {
      id: 1,
      OrderId: "ORD123456",
      amount: "100.00",
      Date: "2024-03-16",
      status: "delivered",
      quantity: 2,
      deliveryMethod: "Express",
      productInfo: [
        {
          name: "Wireless Headphones",
          price: "200.00",
          quantity: 1,
          vendor: "John Bosco",
          description: "Amazon wireless headphones with noise cancellation and Bluetooth connectivity. Available in black, white, and red.",
          productId: "Prd #1002"
        },
        {
          name: "Ebook Reader",
          price: "150.00",
          quantity: 1,
          vendor: "Jane Smith",
          description: "Amazon Kindle Paperwhite with 8GB storage and a 6-inch display. Available in black and gray.",
          productId: "Prd #1003"
        }
      ],
      customerInfo: {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Main St, City, Country"
      }
    },
    {
      id: 2,
      OrderId: "ORD234567",
      amount: "120.00",
      Date: "2024-03-17",
      status: "pending",
      quantity: 3,
      deliveryMethod: "Standard",
      customerInfo: {
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm St, City, Country"
      },
      productInfo: [
        {
          name: "Product 3",
          price: "60.00",
          quantity: 2,
          vendor: "Vendor 3",
          description: "Description of Product 3",
          productId: "PROD456789123"
        }
      ]
    },
    {
      id: 3,
      OrderId: "ORD345678",
      amount: "80.00",
      Date: "2024-03-18",
      status: "delivered",
      quantity: 1,
      deliveryMethod: "Express",
      customerInfo: {
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
        phone: "555-123-4567",
        address: "789 Oak St, City, Country"
      },
      productInfo: [
        {
          name: "Product 4",
          price: "40.00",
          quantity: 1,
          vendor: "Vendor 4",
          description: "Description of Product 4",
          productId: "PROD789123456"
        }
      ]
    },
    {
      id: 4,
      OrderId: "ORD456789",
      amount: "150.00",
      Date: "2024-03-19",
      status: "pending",
      quantity: 2,
      deliveryMethod: "Standard",
      customerInfo: {
        name: "Michael Brown",
        email: "michaelbrown@example.com",
        phone: "222-333-4444",
        address: "101 Pine St, City, Country"
      },
      productInfo: [
        {
          name: "Product 5",
          price: "75.00",
          quantity: 1,
          vendor: "Vendor 5",
          description: "Description of Product 5",
          productId: "PROD321654987"
        },
        {
          name: "Product 6",
          price: "75.00",
          quantity: 1,
          vendor: "Vendor 6",
          description: "Description of Product 6",
          productId: "PROD654321987"
        }
      ]
    },
    {
      id: 5,
      OrderId: "ORD567890",
      amount: "200.00",
      Date: "2024-03-20",
      status: "delivered",
      quantity: 3,
      deliveryMethod: "Express",
      customerInfo: {
        name: "Emily Wilson",
        email: "emilywilson@example.com",
        phone: "111-222-3333",
        address: "222 Cedar St, City, Country"
      },
      productInfo: [
        {
          name: "Product 7",
          price: "100.00",
          quantity: 1,
          vendor: "Vendor 7",
          description: "Description of Product 7",
          productId: "PROD789456123"
        },
        {
          name: "Product 8",
          price: "50.00",
          quantity: 2,
          vendor: "Vendor 8",
          description: "Description of Product 8",
          productId: "PROD456789321"
        }
      ]
    },
    {
      id: 6,
      OrderId: "ORD678901",
      amount: "90.00",
      Date: "2024-03-21",
      status: "pending",
      quantity: 1,
      deliveryMethod: "Standard",
      customerInfo: {
        name: "David Lee",
        email: "davidlee@example.com",
        phone: "444-555-6666",
        address: "333 Walnut St, City, Country"
      },
      productInfo: [
        {
          name: "Product 9",
          price: "30.00",
          quantity: 1,
          vendor: "Vendor 9",
          description: "Description of Product 9",
          productId: "PROD789321654"
        }
      ]
    },
    {
      id: 7,
      OrderId: "ORD789012",
      amount: "180.00",
      Date: "2024-03-22",
      status: "cancelled",
      quantity: 2,
      deliveryMethod: "Express",
      customerInfo: {
        name: "Sarah Turner",
        email: "sarahturner@example.com",
        phone: "777-888-9999",
        address: "444 Maple St, City, Country"
      },
      productInfo: [
        {
          name: "Product 10",
          price: "90.00",
          quantity: 1,
          vendor: "Vendor 10",
          description: "Description of Product 10",
          productId: "PROD1234567890"
        },
        {
          name: "Product 11",
          price: "90.00",
          quantity: 1,
          vendor: "Vendor 11",
          description: "Description of Product 11",
          productId: "PROD0987654321"
        }
      ]
    },


  ],
  pagination: {
    page: 1,
    pageSize: 10,
    totalRows: 40,
  },

}



export const  sampleVendorData = [
  { storeName: "SuperMart", productsSold: 150, storeURL: "https://supermart.com" },
  { storeName: "MegaGoods", productsSold: 200, storeURL: "https://megagoods.com" },
  { storeName: "QuickBuy", productsSold: 120, storeURL: "https://quickbuy.com" },
  { storeName: "CityGrocery", productsSold: 180, storeURL: "https://citygrocery.com" },
  { storeName: "FreshFoods", productsSold: 250, storeURL: "https://freshfoods.com" },
];
