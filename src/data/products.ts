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
}

export const products: Product[] = [
  {
    id: 1, name: "T-shirt with Tape Details", cat: "shirts", price: 120, orig: null, rating: 4.5, reviews: 312, tag: "New", colors: ["#111", "#e05252"], sizes: ["S", "M", "L", "XL"], 
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80", 
    gallery: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=700&q=80"
    ],
    desc: "A classic essential t-shirt with subtle tape details along the shoulders. Crafted from soft, breathable cotton."
  },
  {
    id: 2, name: "Skinny Fit Jeans", cat: "jeans", price: 240, orig: 260, rating: 3.5, reviews: 89, tag: "Featured", colors: ["#6b7280", "#111"], sizes: ["30", "32", "34", "36"], 
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=700&q=80", 
    gallery: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=700&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=700&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=700&q=80"
    ],
    desc: "Premium skinny fit jeans with a slight stretch for comfort. Features classic 5-pocket styling and a versatile wash."
  },
  {
    id: 3, name: "Checkered Shirt", cat: "shirts", price: 180, orig: null, rating: 4.5, reviews: 204, tag: "New", colors: ["#e05252", "#111"], sizes: ["S", "M", "L", "XL"], 
    img: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=700&q=80", 
    gallery: [
      "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=700&q=80",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=700&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=700&q=80"
    ],
    desc: "A timeless checkered button-down shirt. Perfect for layering over a tee or wearing on its own for a smart-casual look."
  },
  {
    id: 4, name: "Sleeve Striped T-shirt", cat: "shirts", price: 130, orig: 160, rating: 4.5, reviews: 567, tag: "Sale", colors: ["#f0ede8", "#e05252"], sizes: ["S", "M", "L", "XL"], 
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&q=80", 
    gallery: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=700&q=80"
    ],
    desc: "A casual staple featuring contrasting sleeve stripes. Made from premium cotton for all-day comfort."
  },
  {
    id: 5, name: "Vertical Striped Shirt", cat: "shirts", price: 212, orig: 232, rating: 5.0, reviews: 188, tag: "", colors: ["#556B2F", "#111"], sizes: ["S", "M", "L", "XL"], 
    img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=700&q=80"],
    desc: "Elegant vertical striped shirt in a relaxed fit. Adds a touch of sophistication to your everyday wardrobe."
  },
  {
    id: 6, name: "Courage Graphic T-shirt", cat: "shirts", price: 145, orig: null, rating: 4.0, reviews: 143, tag: "", colors: ["#111"], sizes: ["S", "M", "L", "XL"], 
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=700&q=80"],
    desc: "Make a statement with this bold graphic t-shirt. Soft fabric and a relaxed fit make it perfect for casual outings."
  },
  {
    id: 7, name: "Loose Fit Bermuda Shorts", cat: "shorts", price: 80, orig: null, rating: 3.0, reviews: 97, tag: "", colors: ["#f0ede8", "#6b7280"], sizes: ["30", "32", "34"], 
    img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=700&q=80"],
    desc: "Comfortable loose fit bermuda shorts for warm days. Features an elasticated waistband and spacious pockets."
  },
  {
    id: 8, name: "Faded Skinny Jeans", cat: "jeans", price: 210, orig: null, rating: 4.5, reviews: 231, tag: "", colors: ["#6b7280"], sizes: ["30", "32", "34", "36"], 
    img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1604176354204-9268737828e4?w=700&q=80"],
    desc: "Skinny jeans with a vintage faded wash. Designed with stretch denim for maximum comfort and mobility."
  },
  {
    id: 9, name: "Basic Oversized Hoodie", cat: "hoodie", price: 180, orig: null, rating: 4.5, reviews: 124, tag: "New", colors: ["#111", "#6b7280"], sizes: ["S", "M", "L", "XL"], 
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700&q=80"],
    desc: "Ultra-soft cotton blend hoodie with an oversized silhouette. Perfect for cozy days and casual layering."
  },
  {
    id: 10, name: "Premium Cotton Hoodie", cat: "hoodie", price: 220, orig: 250, rating: 4.9, reviews: 89, tag: "Sale", colors: ["#f0ede8", "#111"], sizes: ["S", "M", "L"], 
    img: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=700&q=80"],
    desc: "High-quality heavyweight cotton hoodie. Minimalist design with a focus on fit and durability."
  },
  {
    id: 11, name: "Classic Leather Jacket", cat: "jackets", price: 350, orig: 400, rating: 4.8, reviews: 445, tag: "New", colors: ["#111"], sizes: ["S", "M", "L", "XL"], 
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&q=80"],
    desc: "Timeless leather jacket with premium hardware. An absolute wardrobe essential that gets better with age."
  },
  {
    id: 12, name: "Minimalist Sneakers", cat: "sneakers", price: 120, orig: null, rating: 4.6, reviews: 168, tag: "", colors: ["#f0ede8", "#111"], sizes: ["8", "9", "10", "11"], 
    img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=700&q=80", 
    gallery: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=700&q=80"],
    desc: "Clean, minimalist sneakers that pair effortlessly with any outfit. Comfortable footbed and durable outsole."
  }
];
