'use client';

import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface BookingData {
  _id: string;
  studioTitle: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  hourlyRate: number;
  subtotal: number;
  securityDeposit: number;
  totalPrice: number;
  status: string;
  userName: string;
  userEmail: string;
}

export default function InvoiceGenerator({ booking }: { booking: BookingData }) {
  const [downloading, setDownloading] = useState(false);

  const generatePDF = () => {
    try {
      setDownloading(true);
      const doc = new jsPDF({
        unit: 'mm',
        format: 'a4',
      });

      // Background accent banner
      doc.setFillColor(15, 23, 42); // slate-950
      doc.rect(0, 0, 210, 40, 'F');

      // Title & Branding
      doc.setTextColor(245, 158, 11); // Amber
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('StudioSpace', 14, 22);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(203, 213, 225); // Slate 300
      doc.text('Peer-to-Peer Creative Production Marketplace', 14, 29);

      // Receipt Badge on Right
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('OFFICIAL BOOKING RECEIPT', 130, 22);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text(`Booking Ref: #${booking._id.slice(-8).toUpperCase()}`, 130, 29);

      // Body Section
      let y = 55;

      // Status Banner
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(14, y, 182, 14, 2, 2, 'F');

      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`Reservation Status: ${booking.status.toUpperCase()}`, 20, y + 9);

      y += 24;

      // Guest & Session Details Grid
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('Guest & Workspace Information', 14, y);

      y += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);

      doc.text(`Guest Name:`, 14, y);
      doc.text(booking.userName, 60, y);

      y += 6;
      doc.text(`Guest Email:`, 14, y);
      doc.text(booking.userEmail, 60, y);

      y += 6;
      doc.text(`Studio Space:`, 14, y);
      doc.setFont('helvetica', 'bold');
      doc.text(booking.studioTitle, 60, y);
      doc.setFont('helvetica', 'normal');

      y += 6;
      doc.text(`Category:`, 14, y);
      doc.text(booking.category || 'Creative Studio', 60, y);

      y += 6;
      doc.text(`Reserved Session:`, 14, y);
      doc.text(`${booking.date} (${booking.startTime} - ${booking.endTime})`, 60, y);

      y += 6;
      doc.text(`Duration:`, 14, y);
      doc.text(`${booking.totalHours} Hours`, 60, y);

      y += 16;

      // Financial Breakdown Table
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, 182, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('Description', 20, y + 6);
      doc.text('Rate', 120, y + 6);
      doc.text('Amount (USD)', 160, y + 6);

      y += 12;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);

      doc.text(`Studio Rental Slot (${booking.totalHours} hrs)`, 20, y);
      doc.text(`$${booking.hourlyRate}/hr`, 120, y);
      doc.text(`$${booking.subtotal}`, 160, y);

      if (booking.securityDeposit > 0) {
        y += 8;
        doc.text('Refundable Security Deposit', 20, y);
        doc.text('Flat', 120, y);
        doc.text(`$${booking.securityDeposit}`, 160, y);
      }

      y += 12;
      doc.setDrawColor(226, 232, 240);
      doc.line(14, y, 196, y);

      y += 8;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('Total Investment:', 120, y);
      doc.setTextColor(217, 119, 6); // amber-600
      doc.text(`$${booking.totalPrice} USD`, 160, y);

      // Footer Terms
      y = 260;
      doc.setDrawColor(226, 232, 240);
      doc.line(14, y, 196, y);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text(
        'StudioSpace Marketplace • All reservations protected by $1M Host Liability Shield • Questions? support@studiospace.com',
        14,
        y + 6
      );

      doc.save(`StudioSpace-Booking-${booking._id.slice(-6).toUpperCase()}.pdf`);
      toast.success('Booking Invoice PDF downloaded successfully!');
    } catch (err) {
      console.error('PDF error:', err);
      toast.error('Failed to generate PDF receipt.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={downloading}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
      title="Download Official Booking PDF Invoice"
    >
      <Download className="w-3.5 h-3.5 text-amber-500" />
      <span>{downloading ? 'Exporting...' : 'Invoice PDF'}</span>
    </button>
  );
}
