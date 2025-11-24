const { db } = require('../config/database');

const getProducts = (req, res) => {
  let { category, search } = req.query;

  // regex para parametros SQL
  const prohibidos = /(--|;|\/\*|\*\/|'|"|#|UNION|SELECT|DROP|OR\s+1=1|information_schema)/i;

  // si se detecta alguno devuelve array vacio
  if ((category && prohibidos.test(category)) || (search && prohibidos.test(search))) {
    return res.status(200).json([]);
  }

  // consulta segura usando parametros
  let query = "SELECT * FROM products WHERE 1 = 1";
  const parametros = [];

  if (category) {
    query += " AND category = ?";
    parametros.push(category);
  }

  if (search) {
    query += " AND name LIKE ?";
    parametros.push(`%${search}%`);
  }

  db.query(query, parametros, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    res.json(results);
  });
};

module.exports = {
  getProducts
};
