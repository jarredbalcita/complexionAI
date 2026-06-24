export const handleError = (res, err, statusCode = 500) => {
  console.error(err);
  res.status(statusCode).json({ error: "An internal error occurred" });
};
