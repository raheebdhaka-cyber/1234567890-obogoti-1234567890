// PDF Generation Utility using jsPDF
function generateCitizenPDF(citizen, title = "Government of the People's Republic of Bangladesh - Citizen Registration Record") {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("PDF library is loading. Please try again in a moment.");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Header Banner
  doc.setFillColor(14, 22, 71); // Deep Navy
  doc.rect(0, 0, 210, 25, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text("GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH", 105, 11, { align: "center" });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text("CITIZEN PROFILE & GRIEVANCE REDRESS DOSSIER", 105, 18, { align: "center" });

  let y = 35;

  // Photo Box (Right side)
  doc.setDrawColor(200, 200, 200);
  doc.rect(155, 30, 40, 48);
  if (citizen.photo_url) {
    try {
      doc.addImage(citizen.photo_url, 'JPEG', 156, 31, 38, 46);
    } catch (e) {
      doc.setTextColor(150, 150, 150);
      doc.setFontSize(8);
      doc.text("Citizen Photo", 175, 55, { align: "center" });
    }
  } else {
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.text("No Photo Attached", 175, 55, { align: "center" });
  }

  // Section 1: Personal Profile
  doc.setTextColor(14, 22, 71);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("SECTION 1: PERSONAL PROFILE", 15, y);
  y += 6;
  doc.setDrawColor(14, 22, 71);
  doc.setLineWidth(0.5);
  doc.line(15, y, 145, y);
  y += 6;

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text("Full Name:", 15, y);
  doc.setFont('helvetica', 'normal');
  doc.text(String(citizen.full_name || 'N/A'), 50, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text("Phone Number:", 15, y);
  doc.setFont('helvetica', 'normal');
  doc.text(String(citizen.phone || 'N/A'), 50, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text("Primary ID Type:", 15, y);
  doc.setFont('helvetica', 'normal');
  doc.text(String(citizen.primary_id_type || 'N/A').toUpperCase(), 50, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text("Primary ID No:", 15, y);
  doc.setFont('helvetica', 'normal');
  doc.text(String(citizen.primary_id_number || 'N/A'), 50, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text("Assigned Role:", 15, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${citizen.account_type || 'Civil Citizen'} (${citizen.assigned_role || 'General'})`, 50, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text("Approval Status:", 15, y);
  doc.setFont('helvetica', 'normal');
  doc.text((citizen.status || 'pending').toUpperCase(), 50, y);
  y += 10;

  // Address Details
  doc.setTextColor(14, 22, 71);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text("Present Address Breakdown:", 15, y);
  y += 6;
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Division: ${citizen.division || '-'}   |   District: ${citizen.district || '-'}   |   Upazila: ${citizen.upazila || '-'}`, 15, y);
  y += 5;
  doc.text(`Unit Type: ${citizen.area_type || '-'}   |   Ward/Union: ${citizen.ward_union || '-'}`, 15, y);
  y += 5;
  doc.text(`House/Road: ${citizen.house_road || '-'}`, 15, y);
  y += 10;

  // Section 2: Other Identity & Contact Information
  doc.setTextColor(14, 22, 71);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("SECTION 2: IDENTITY DOCUMENTS & CONTACT", 15, y);
  y += 6;
  doc.line(15, y, 195, y);
  y += 6;

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Birth Certificate No: ${citizen.birth_certificate_no || 'Not Provided'}`, 15, y);
  doc.text(`National ID (NID): ${citizen.nid_no || 'Not Provided'}`, 105, y);
  y += 5;
  doc.text(`Passport Number: ${citizen.passport_no || 'Not Provided'}`, 15, y);
  doc.text(`Email Address: ${citizen.email || 'Not Provided'}`, 105, y);
  y += 10;

  // Section 3: Parents' Information
  doc.setTextColor(14, 22, 71);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("SECTION 3: PARENTS' INFORMATION", 15, y);
  y += 6;
  doc.line(15, y, 195, y);
  y += 6;

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text("Father's Particulars:", 15, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.text(`Father's Name: ${citizen.father_name || 'N/A'}`, 15, y);
  doc.text(`Father's Birth Cert: ${citizen.father_birth_certificate_no || 'N/A'}`, 105, y);
  y += 5;
  doc.text(`Father's NID: ${citizen.father_nid_no || 'N/A'}`, 15, y);
  doc.text(`Father's Passport: ${citizen.father_passport_no || 'N/A'}`, 105, y);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.text("Mother's Particulars:", 15, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.text(`Mother's Name: ${citizen.mother_name || 'N/A'}`, 15, y);
  doc.text(`Mother's Birth Cert: ${citizen.mother_birth_certificate_no || 'N/A'}`, 105, y);
  y += 5;
  doc.text(`Mother's NID: ${citizen.mother_nid_no || 'N/A'}`, 15, y);
  doc.text(`Mother's Passport: ${citizen.mother_passport_no || 'N/A'}`, 105, y);
  y += 12;

  // Footer & Verification Notice
  doc.setFillColor(245, 247, 250);
  doc.rect(15, y, 180, 22, 'F');
  doc.setTextColor(70, 70, 70);
  doc.setFontSize(8);
  doc.text("OFFICIAL RECORD NOTE:", 18, y + 6);
  doc.text("This document is an authentic certified snapshot generated from the Central National Grievance Portal.", 18, y + 11);
  doc.text(`Generated on: ${new Date().toLocaleString()} | Tracking Database ID: ${citizen.id || 'N/A'}`, 18, y + 16);

  // Save the PDF
  const filename = `Citizen_Registration_${(citizen.primary_id_number || 'Record')}.pdf`;
  doc.save(filename);
}

// Function to generate Report Dossier PDF (Citizen profile + Crime / Problem statement)
function generateReportDossierPDF(report, citizen) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("PDF library is loading. Please try again in a moment.");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Header Banner
  doc.setFillColor(143, 33, 39); // Crimson for reports
  doc.rect(0, 0, 210, 25, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text("GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH", 105, 11, { align: "center" });
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`OFFICIAL INCIDENT REPORT & CITIZEN DOSSIER [${report.tracking_id || 'ID'}]`, 105, 18, { align: "center" });

  let y = 35;

  // Report Specific Summary Box
  doc.setFillColor(248, 250, 252);
  doc.rect(15, y, 180, 36, 'F');
  doc.setDrawColor(143, 33, 39);
  doc.setLineWidth(0.5);
  doc.rect(15, y, 180, 36, 'S');

  doc.setTextColor(143, 33, 39);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`INCIDENT TYPE: ${(report.report_type || '').toUpperCase()}`, 18, y + 7);
  doc.text(`STATUS: ${(report.status || 'SUBMITTED').toUpperCase()}`, 130, y + 7);

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text("Category / Section:", 18, y + 15);
  doc.setFont('helvetica', 'normal');
  doc.text(String(report.category || 'N/A'), 60, y + 15);

  doc.setFont('helvetica', 'bold');
  doc.text("Assigned Role / Officer:", 18, y + 22);
  doc.setFont('helvetica', 'normal');
  doc.text(String(report.assigned_role || 'Unassigned'), 60, y + 22);

  doc.setFont('helvetica', 'bold');
  doc.text("Submission Date:", 18, y + 29);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(report.created_at || Date.now()).toLocaleString(), 60, y + 29);
  y += 44;

  // Statement / Description
  doc.setTextColor(14, 22, 71);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text("COMPLAINT STATEMENT / PROBLEM DESCRIPTION:", 15, y);
  y += 5;
  doc.setDrawColor(14, 22, 71);
  doc.line(15, y, 195, y);
  y += 6;

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  const splitText = doc.splitTextToSize(report.description || 'No description provided.', 180);
  doc.text(splitText, 15, y);
  y += (splitText.length * 5) + 8;

  // Attached Complainant Profile
  doc.setTextColor(14, 22, 71);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text("ATTACHED COMPLAINANT CITIZEN PROFILE:", 15, y);
  y += 5;
  doc.line(15, y, 195, y);
  y += 6;

  const c = citizen || report.citizen_snapshot || {};
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(9);
  doc.text(`Full Name: ${c.full_name || 'N/A'}`, 15, y);
  doc.text(`Phone: ${c.phone || 'N/A'}`, 105, y);
  y += 5;
  doc.text(`Email: ${c.email || 'N/A'}`, 105, y);
  y += 5;
  doc.text(`Present Address: ${c.house_road || ''}, ${c.ward_union || ''}, ${c.upazila || ''}, ${c.district || ''}, ${c.division || ''}`, 15, y);
  y += 5;
  doc.text(`Father: ${c.father_name || 'N/A'} | Mother: ${c.mother_name || 'N/A'}`, 15, y);
  y += 12;

  // Verification & Sign-off
  doc.setDrawColor(200, 200, 200);
  doc.line(15, y, 195, y);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("Verified Electronic Dossier generated automatically for authorized Special Officers & Law Enforcement.", 15, y);

  doc.save(`Report_${report.tracking_id || 'Dossier'}.pdf`);
}
