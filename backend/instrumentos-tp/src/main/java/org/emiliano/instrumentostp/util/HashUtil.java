package org.emiliano.instrumentostp.util;

import java.security.MessageDigest;

public class HashUtil {
    public static String encriptarSHA1(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] bytes = md.digest(input.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error al encriptar la clave", e);
        }
    }
}
