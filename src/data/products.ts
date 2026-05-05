export interface Product {
  id: number;
  name: string;
  cat: string;
  price: number;
  orig: number | null;
  rating: number;
  reviews: number;
  tag: string;
  colors: string[];
  sizes: string[];
  img: string;
  gallery?: string[];
  desc: string;
  gender: "man" | "woman" | "unisex";
  style: "casual" | "formal" | "party" | "gym";
}

export const products: Product[] = [
  {
    id: 1, name: "Premium T-shirt", cat: "shirts", price: 120, orig: null, rating: 4.5, reviews: 312, tag: "New", colors: ["#111", "#e05252"], sizes: ["S", "M", "L", "XL"], 
    img: "/clothes/tshirt.png", 
    gallery: [
      "/clothes/tshirt.png",
      "/clothes/model_tshirt_1777965787538.png"
    ],
    desc: "A classic essential t-shirt with a premium cut and soft, breathable cotton.",
    gender: "man",
    style: "casual"
  },
  {
    id: 2, name: "Skinny Fit Jeans", cat: "jeans", price: 240, orig: 260, rating: 3.5, reviews: 89, tag: "Featured", colors: ["#6b7280", "#111"], sizes: ["30", "32", "34", "36"], 
    img: "/clothes/jeans.png", 
    gallery: [
      "/clothes/jeans.png",
      "/clothes/model_jeans_1777965801934.png"
    ],
    desc: "Premium skinny fit jeans with a slight stretch for comfort. Features classic 5-pocket styling and a versatile wash.",
    gender: "woman",
    style: "casual"
  },
  {
    id: 3, name: "Checkered Shirt", cat: "shirts", price: 180, orig: null, rating: 4.5, reviews: 204, tag: "New", colors: ["#e05252", "#111"], sizes: ["S", "M", "L", "XL"], 
    img: "/clothes/shirt.png", 
    gallery: [
      "/clothes/shirt.png",
      "/clothes/model_checkered_shirt_1777966170806.png",
    ],
    desc: "A timeless checkered button-down shirt. Perfect for layering over a tee or wearing on its own for a smart-casual look.",
    gender: "man",
    style: "formal"
  },
  {
    id: 4, name: "Performance Gym T-shirt", cat: "shirts", price: 130, orig: 160, rating: 4.5, reviews: 567, tag: "Sale", colors: ["#f0ede8", "#e05252"], sizes: ["S", "M", "L", "XL"], 
    img: "/clothes/gym tshirt.png", 
    gallery: [
      "/clothes/gym tshirt.png",
      "/clothes/model_gym_tshirt_1777965819787.png"
    ],
    desc: "A performance gym staple featuring contrasting sleeve stripes. Made from premium moisture-wicking material.",
    gender: "man",
    style: "gym"
  },
  {
    id: 5, name: "Classic Leather Jacket", cat: "jackets", price: 350, orig: 400, rating: 5.0, reviews: 188, tag: "", colors: ["#556B2F", "#111"], sizes: ["S", "M", "L", "XL"], 
    img: "/clothes/jacket.png", 
    gallery: [
      "/clothes/jacket.png",
      "/clothes/model_leather_jacket_1777966184564.png"
    ],
    desc: "Timeless leather jacket with premium hardware. An absolute wardrobe essential that gets better with age.",
    gender: "woman",
    style: "party"
  },
  {
    id: 6, name: "Loose Fit Bermuda Shorts", cat: "shorts", price: 80, orig: null, rating: 4.0, reviews: 143, tag: "", colors: ["#111"], sizes: ["30", "32", "34", "36"], 
    img: "/clothes/short.png", 
    gallery: [
      "/clothes/short.png",
      "/clothes/model_shorts_1777965838269.png"
    ],
    desc: "Comfortable loose fit bermuda shorts for warm days. Features an elasticated waistband and spacious pockets.",
    gender: "man",
    style: "casual"
  },
  {
    id: 7, name: "Tailored Fit Trousers", cat: "trousers", price: 150, orig: null, rating: 3.0, reviews: 97, tag: "", colors: ["#f0ede8", "#6b7280"], sizes: ["30", "32", "34"], 
    img: "/clothes/trowser.png", 
    gallery: [
      "/clothes/trowser.png",
      "/clothes/model_trousers_1777965852445.png"
    ],
    desc: "Elegant tailored fit trousers for a sharp, sophisticated everyday look.",
    gender: "man",
    style: "formal"
  },
  {
    id: 8, name: "Faded Skinny Jeans", cat: "jeans", price: 210, orig: null, rating: 4.5, reviews: 231, tag: "", colors: ["#6b7280"], sizes: ["30", "32", "34", "36"], 
    img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=700&q=80", 
    gallery: [
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=700&q=80",
      "/clothes/model_faded_jeans_1777966352750.png" 
    ],
    desc: "Skinny jeans with a vintage faded wash. Designed with stretch denim for maximum comfort and mobility.",
    gender: "woman",
    style: "party"
  },
  {
    id: 9, name: "Basic Oversized Hoodie", cat: "hoodie", price: 180, orig: null, rating: 4.5, reviews: 124, tag: "New", colors: ["#111", "#6b7280"], sizes: ["S", "M", "L", "XL"], 
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700&q=80"],
    desc: "Ultra-soft cotton blend hoodie with an oversized silhouette. Perfect for cozy days and casual layering.",
    gender: "unisex",
    style: "casual"
  },
  {
    id: 10, name: "Premium Cotton Hoodie", cat: "hoodie", price: 220, orig: 250, rating: 4.9, reviews: 89, tag: "Sale", colors: ["#f0ede8", "#111"], sizes: ["S", "M", "L"], 
    img: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=700&q=80"],
    desc: "High-quality heavyweight cotton hoodie. Minimalist design with a focus on fit and durability.",
    gender: "man",
    style: "gym"
  },
  {
    id: 11, name: "Classic Leather Jacket", cat: "jackets", price: 350, orig: 400, rating: 4.8, reviews: 445, tag: "New", colors: ["#111"], sizes: ["S", "M", "L", "XL"], 
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&q=80"],
    desc: "Timeless leather jacket with premium hardware. An absolute wardrobe essential that gets better with age.",
    gender: "man",
    style: "party"
  },
  {
    id: 12, name: "Minimalist Sneakers", cat: "sneakers", price: 120, orig: null, rating: 4.6, reviews: 168, tag: "", colors: ["#f0ede8", "#111"], sizes: ["8", "9", "10", "11"], 
    img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=700&q=80"],
    desc: "Clean, minimalist sneakers that pair effortlessly with any outfit. Comfortable footbed and durable outsole.",
    gender: "unisex",
    style: "casual"
  }
];
