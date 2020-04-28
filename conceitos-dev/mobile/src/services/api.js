import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3333" });

export default api;

/**
 * iOS com Emulador: localhost
 * iOS com fisico: IP da Maquina
 *
 * Android com Emulador: localshot (adb reverse tcp:3333 tcp:3333)
 * Android com Emulador: 10.0.2.2 (Android Studio)
 * Android com Emulador: 10.0.2.3 (Genymotion)
 * Android com Emulador: IP da Maquina
 */
