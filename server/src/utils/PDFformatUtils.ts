// row left & right
export const row = (doc: PDFKit.PDFDocument, left: string, right: string) => {
  const pageWidth = doc.page.width;
  const margin = doc.page.margins.left;
  const y = doc.y;

  const usableWidth = pageWidth - margin * 2; // total area isi

  const leftWidth = usableWidth * 0.3; // 30% untuk kiri
  const rightWidth = usableWidth * 0.6; // 60% untuk kanan

  // text left
  doc.fillColor("black", 0.6); // 0.2 = 20% opacity
  doc.font("Helvetica").fontSize(18).text(left, margin, y, {
    width: leftWidth,
    align: "left",
  });

  //   text right
  doc.fillColor("black", 0.9); // 0.2 = 20% opacity
  doc
    .font("Helvetica")
    .fontSize(18)
    .text(right, margin + usableWidth - rightWidth, y, {
      width: rightWidth,
      align: "right",
    });

  //   new row
  doc.moveDown(0.5);
};
