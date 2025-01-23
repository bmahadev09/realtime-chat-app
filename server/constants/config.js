const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://chat-app-by-mithu9.netlify.app/",
    process.env.CLIENT_URL,
  ],
  credentials: true,
};

export { corsOptions };
