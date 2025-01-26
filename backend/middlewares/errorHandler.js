exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.response?.data?.error) {
    return res
      .status(err.response.status)
      .json({ error: err.response.data.error });
  }

  res.status(500).json({ error: "An error occurred. Please try again later." });
};
