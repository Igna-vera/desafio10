export const authMiddleware = (req, res, next) => {
  req.header("autorizado") == process.env.PASS
    ? next()
    : res.status(401).json({ error: "no autorizado" });
};
