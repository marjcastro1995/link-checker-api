// api/check-links.js
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const urls = req.body.urls || [];

  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return { url, status: response.status, ok: response.ok };
      } catch (err) {
        return { url, status: "error", ok: false, message: err.message };
      }
    })
  );

  res.status(200).json(results.filter((r) => !r.ok));
};
