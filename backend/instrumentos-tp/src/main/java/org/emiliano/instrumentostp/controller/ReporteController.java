package org.emiliano.instrumentostp.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

import org.emiliano.instrumentostp.model.*;
import org.emiliano.instrumentostp.repository.InstrumentoRepository;
import org.emiliano.instrumentostp.repository.PedidoRepository;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/reporte")
public class ReporteController {
    // Ruta base a la carpeta local de imágenes
    private static final String RUTA_IMAGENES_LOCAL = "C:/Users/Enzo/Desktop/INSTRUMENTOS/frontend/instrumentos-front/public/img/";
    private final PedidoRepository pedidoRepository;
    private final InstrumentoRepository instrumentoRepository;


    public ReporteController(PedidoRepository pedidoRepository, InstrumentoRepository instrumentoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.instrumentoRepository = instrumentoRepository;
    }

    @GetMapping("/excel")
    public void exportarExcel(HttpServletResponse response,
                              @RequestParam("desde") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime desde,
                              @RequestParam("hasta") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime hasta) {

        try {
            List<Pedido> pedidos = pedidoRepository.findByFechaPedidoBetween(desde, hasta);

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=reporte_pedidos.xlsx");

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Pedidos");

            // Header
            Row headerRow = sheet.createRow(0);
            String[] columnas = {"ID Pedido", "Fecha Pedido", "Instrumento", "Marca", "Modelo", "Cantidad", "Precio", "Subtotal"};
            for (int i = 0; i < columnas.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columnas[i]);
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

            int fila = 1;
            for (Pedido pedido : pedidos) {
                for (PedidoDetalle detalle : pedido.getPedidoDetalles()) {
                    Row row = sheet.createRow(fila++);
                    Instrumento instrumento = detalle.getInstrumento();

                    row.createCell(0).setCellValue(pedido.getId()); // ID Pedido
                    row.createCell(1).setCellValue(pedido.getFechaPedido().format(formatter)); // Fecha formateada
                    row.createCell(2).setCellValue(instrumento.getInstrumento());
                    row.createCell(3).setCellValue(instrumento.getMarca());
                    row.createCell(4).setCellValue(instrumento.getModelo());
                    row.createCell(5).setCellValue(detalle.getCantidad());

                    BigDecimal precio = instrumento.getPrecio();
                    row.createCell(6).setCellValue(precio.doubleValue());
                    row.createCell(7).setCellValue(precio.multiply(BigDecimal.valueOf(detalle.getCantidad())).doubleValue());
                }
            }

            // Auto-ajustar columnas
            for (int i = 0; i < columnas.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(response.getOutputStream());
            workbook.close();

        } catch (Exception e) {
            System.err.println("Error al generar el reporte Excel: " + e.getMessage());
            e.printStackTrace();
            try {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al generar el archivo Excel.");
            } catch (IOException ioException) {
                System.err.println("Error al enviar el código de error HTTP: " + ioException.getMessage());
            }
        }
    }
    @GetMapping("/{id}/pdf")
    public void exportarInstrumentoPdf(@PathVariable Long id, HttpServletResponse response) {
        Optional<Instrumento> optInstrumento = instrumentoRepository.findById(id);
        if (optInstrumento.isEmpty()) {
            try {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Instrumento no encontrado");
            } catch (IOException e) {
                e.printStackTrace();
            }
            return;
        }

        Instrumento instrumento = optInstrumento.get();

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=instrumento_" + id + ".pdf");

        Document document = new Document(PageSize.A4);
        try {
            PdfWriter.getInstance(document, response.getOutputStream());
            document.open();

            Font tituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font textoFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

            document.add(new Paragraph("Reporte del Instrumento", tituloFont));
            document.add(new Paragraph(" ")); // espacio

            document.add(new Paragraph("Nombre: " + instrumento.getInstrumento(), textoFont));
            document.add(new Paragraph("Marca: " + instrumento.getMarca(), textoFont));
            document.add(new Paragraph("Modelo: " + instrumento.getModelo(), textoFont));
            document.add(new Paragraph("Descripción: " + instrumento.getDescripcion(), textoFont));
            document.add(new Paragraph("Precio: $" + instrumento.getPrecio(), textoFont));

            String costoEnvioTexto = (instrumento.getCostoEnvio() != null && instrumento.getCostoEnvio().equalsIgnoreCase("G"))
                    ? "Gratis" : "$" + instrumento.getCostoEnvio();
            document.add(new Paragraph("Costo de Envío: " + costoEnvioTexto, textoFont));

            document.add(new Paragraph("Cantidad Vendida: " + instrumento.getCantidadVendida(), textoFont));

            // Agregar imagen si existe
            if (instrumento.getImagen() != null && !instrumento.getImagen().isEmpty()) {
                try {
                    com.lowagie.text.Image imagenPdf;
                    String rutaImagen = instrumento.getImagen();

                    if (rutaImagen.startsWith("http://") || rutaImagen.startsWith("https://")) {
                        // Imagen externa por URL
                        imagenPdf = com.lowagie.text.Image.getInstance(new java.net.URL(rutaImagen));
                    } else {
                        // Imagen local: construimos la ruta absoluta
                        String rutaCompleta = RUTA_IMAGENES_LOCAL + rutaImagen;
                        imagenPdf = com.lowagie.text.Image.getInstance(rutaCompleta);
                    }

                    // Escalar y centrar imagen
                    imagenPdf.scaleToFit(250, 250);
                    imagenPdf.setAlignment(com.lowagie.text.Image.ALIGN_CENTER);

                    document.add(imagenPdf);
                    document.add(new Paragraph(" ")); // espacio después de la imagen
                } catch (Exception e) {
                    e.printStackTrace(); // imagen inválida o no encontrada
                }
            }

        } catch (DocumentException | IOException e) {
            e.printStackTrace();
            try {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al generar el archivo PDF.");
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        } finally {
            document.close();
        }
    }
}
