const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://tse4.mm.bing.net/th?id=OIP.nqP-aZnXmTVgn5tuZVY9-AHaE8&pid=Api&P=0&h=180",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-118.7798, 34.0259],
    },
  },

  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-74.006, 40.7128],
    },
  },

  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-106.837, 39.1911],
    },
  },

  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    geometry: {
      type: "Point",
      coordinates: [11.2558, 43.7696],
    },
  },

  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    geometry: {
      type: "Point",
      coordinates: [-86.8515, 21.1619],
    },
  },

  // ================= INDIA =================

  {
    title: "Royal Palace Stay in Jaipur",
    description:
      "Experience royal heritage in this pink city palace stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
    },
    price: 4000,
    location: "Jaipur",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124],
    },
  },

  {
    title: "Lake View Villa in Udaipur",
    description:
      "Stay beside serene lakes with palace views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },
    price: 4200,
    location: "Udaipur",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.7125, 24.5854],
    },
  },

  {
    title: "Tea Garden Stay in Munnar",
    description:
      "Peaceful stay surrounded by lush tea plantations.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
    },
    price: 2300,
    location: "Munnar",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.0595, 10.0889],
    },
  },

  {
    title: "Modern Flat in Bangalore",
    description:
      "Stylish city apartment in tech capital.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    },
    price: 3000,
    location: "Bangalore",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.5946, 12.9716],
    },
  },

  {
    title: "Beach Resort in Pondicherry",
    description:
      "French-style beach resort with peaceful vibes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    price: 3600,
    location: "Pondicherry",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [79.8083, 11.9416],
    },
  },

  {
    title: "City Stay in Delhi",
    description:
      "Comfortable stay near historic monuments.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    },
    price: 2400,
    location: "Delhi",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.1025, 28.7041],
    },
  },

  {
    title: "Spiritual Stay in Varanasi",
    description:
      "Stay near ghats with Ganga view.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1561361058-c24cecae35ca",
    },
    price: 2100,
    location: "Varanasi",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [82.9739, 25.3176],
    },
  },

  {
    title: "Waterfall View Stay in Cherrapunji",
    description:
      "Stay near waterfalls in one of the wettest places.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    },
    price: 2600,
    location: "Cherrapunji",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [91.7336, 25.2702],
    },
  },

  // ================= GOA =================

  {
    title: "Beachfront Villa in Baga",
    description:
      "Stay just steps away from Baga Beach with vibrant nightlife and sea views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    price: 3500,
    location: "Baga",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.7517, 15.5553],
    },
  },

  {
    title: "Luxury Stay in Calangute",
    description:
      "Modern villa with pool near the famous Calangute Beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    price: 4200,
    location: "Calangute",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.7638, 15.5439],
    },
  },
];

module.exports = { data: sampleListings };