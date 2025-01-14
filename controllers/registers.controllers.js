import { sendMail } from "../utils/mailer.js";
import { pool } from "../db.js";

export const getRegisters = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM people WHERE state = 1 ORDER BY createdAt ASC;"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRegister = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM people WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length == 0) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRegister = async (req, res) => {
  try {
    const { name, email, tel, num_people } = req.body;

    const [totalPeopleResult] = await pool.query(
      "SELECT SUM(num_people) AS total_people FROM people WHERE state = 1"
    );

    const totalPeople = parseInt(totalPeopleResult[0].total_people, 10) || 0;
    const numPeopleToRegister = parseInt(num_people, 10);

    if (isNaN(numPeopleToRegister)) {
      return res.status(400).json({
        errorCode: "INVALID_INPUT",
        message: "El número de personas debe ser un número válido.",
      });
    }

    const limit = 304;
    if (totalPeople + numPeopleToRegister > limit) {
      return res.status(401).json({
        errorCode: "LIMIT_EXCEEDED",
        message: `No se pudieron registrar ${numPeopleToRegister} persona(s), ya que solo quedan ${
          limit - totalPeople
        } espacios disponibles.`,
      });
    }

    const [result] = await pool.query(
      "INSERT INTO people(name, email, tel, num_people) VALUES (?, ?, ?, ?)",
      [name, email, tel, numPeopleToRegister]
    );

    const newRegisterId = result.insertId;

    try {
      await sendMail(name, email, numPeopleToRegister, newRegisterId);
      console.log("Correo de confirmación enviado exitosamente a:", email);
    } catch (error) {
      console.error("Error al enviar el correo de confirmación:", error);
    }

    res.json({
      id: result.insertId,
      name,
      email,
      tel,
      num_people: numPeopleToRegister,
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    return res.status(500).json({
      errorCode: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

export const updateRegister = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE people SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRegister = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE people SET state = 0 WHERE id = ?",
      [req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
