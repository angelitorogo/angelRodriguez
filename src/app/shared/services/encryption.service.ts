import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {

  private readonly secretKey = environment.ID_SECRET;

  decrypt(encryptedData: string, iv: string): string | null {
    try {
      const key = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(this.secretKey).toString());
      const ivBytes = CryptoJS.enc.Base64.parse(iv);

      //console.log('Frontend Key:', key.toString(CryptoJS.enc.Hex));

      // Desencriptar los datos
      const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { iv: ivBytes });
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

      if (!decryptedText) {
        //console.error('Error al desencriptar: Datos inválidos.');
        return null;
      }

      // Parsear el payload y verificar expiración
      const payload = JSON.parse(decryptedText);
      const currentTime = Date.now();
      const expirationTime = 5 * 60 * 1000; // 5 minutos en milisegundos

      //console.log(payload)

      /*
      if (currentTime - payload.timestamp > expirationTime) {
        //console.log('Enlace expirado');
        return null;
      }
      */

      //console.log(payload)
      return payload.data; // Retorna los datos desencriptados
    } catch (error) {
      //console.error('Error al desencriptar:', error);
      return null;
    }
  }
}
