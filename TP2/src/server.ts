import { makeApp } from "./app";

const app = makeApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});