const attachCookie = ({ res, token }) => {
  const expiry = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + expiry),
    secure: process.env.NODE_ENV === "production",
  });
};

export default attachCookie;
