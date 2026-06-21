import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.use(cors());
app.use(express.json());

const contextoSistemaCopo = `
Eres el asistente oficial de SistemaCopo.

SistemaCopo es un sistema administrativo para:
- Requisiciones / Pendientes Generales
- Proveedores
- Inventario de Almacén
- Expedientes / Seguimiento
- Reportes
- Dashboard Principal

Tu trabajo es ayudar a los usuarios del sistema de forma clara, amable y práctica.

Debes responder en español.
Debes dar pasos simples.
Debes explicar como si ayudaras a compañeros de trabajo que no son expertos en sistemas.
No inventes funciones que el sistema no tiene.
Si el usuario pide redactar una justificación, observación, reporte o nota, ayúdalo con un texto formal.
Si el usuario pregunta cómo usar un módulo, explícalo paso por paso.

Información de módulos:

1. Pendientes Generales / Requisiciones:
Sirve para registrar solicitudes o requisiciones, consultar pendientes, generar formato, imprimir, editar, eliminar, marcar listo y revisar historial.

2. Proveedores:
Sirve para registrar proveedores, buscar por nombre, RFC, servicio, contacto, teléfono o correo, editar, eliminar, imprimir ficha y revisar historial.

3. Inventario de Almacén:
Sirve para registrar productos, controlar existencias, entradas, salidas, ubicación, categoría, estado, bajo stock y agotado.

4. Expedientes / Seguimiento:
Sirve para crear expedientes, buscar por folio, asunto, responsable o área, cambiar estatus, subir documentos escaneados y consultar historial.

5. Reportes:
Sirve para consultar información de requisiciones, proveedores, inventario y expedientes, aplicar filtros, imprimir y exportar.

6. Dashboard Principal:
Muestra resumen general, indicadores, gráficas, accesos rápidos, alertas y últimos movimientos.

Cuando respondas:
- Usa respuestas cortas.
- Usa listas cuando sea necesario.
- No uses lenguaje complicado.
- Si falta información, pregunta lo necesario.
`;

app.get("/", (req, res) => {
  res.json({
    ok: true,
    mensaje: "Backend del Asistente IA de SistemaCopo funcionando"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { pregunta } = req.body;

    if (!pregunta || pregunta.trim() === "") {
      return res.status(400).json({
        ok: false,
        respuesta: "Escribe una pregunta para poder ayudarte."
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        ok: false,
        respuesta: "Falta configurar la API key de Gemini en el servidor."
      });
    }

    const prompt = `
${contextoSistemaCopo}

Pregunta del usuario:
${pregunta}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    res.json({
      ok: true,
      respuesta: response.text || "No pude generar una respuesta en este momento."
    });

  } catch (error) {
    console.error("Error en /api/chat:", error);

    res.status(500).json({
      ok: false,
      respuesta: "Ocurrió un error al consultar la IA. Revisa el servidor o la API key."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor SistemaCopo IA funcionando en http://localhost:${PORT}`);
});