import * as SecureStore from "expo-secure-store";
import bcrypt from "bcryptjs";
import * as ExpoCrypto from "expo-crypto";

// Configurar bcryptjs para Expo
bcrypt.setRandomFallback((len) => {
  const bytes = ExpoCrypto.getRandomBytes(len);
  return Array.from(bytes).map((b) => String.fromCharCode(b)).join("");
});

const SALT_ROUNDS = 10;

export function emailToKey(email) {
  return email.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function registerUser(email, password) {
  const hash = bcrypt.hashSync(password, SALT_ROUNDS);
  await SecureStore.setItemAsync(emailToKey(email), hash);
}

export async function loginUser(email, password) {
  const storedHash = await SecureStore.getItemAsync(emailToKey(email));
  return storedHash && bcrypt.compareSync(password, storedHash);
}

export async function userExists(email) {
  const storedHash = await SecureStore.getItemAsync(emailToKey(email));
  return storedHash !== null;
}






