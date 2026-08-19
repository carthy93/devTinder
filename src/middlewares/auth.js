const adminAuth = (req, res, next) => {
  // Logic of checking if the request is authenticated or not
  const token = "xyz"; // This is just a placeholder for the actual token validation logic
  const isAuthenticated = token === "xyz"; // Replace with actual authentication logic
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  // Logic of checking if the request is authenticated or not
  const token = "xyz"; // This is just a placeholder for the actual token validation logic
  const isAuthenticated = token === "xyz"; // Replace with actual authentication logic
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
