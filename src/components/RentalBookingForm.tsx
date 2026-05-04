import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PHONE_NUMBER = "2347078236267";
const WHATSAPP_API_URL = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=`;

const RentalBookingForm = () => {
  const [formData, setFormData] = useState({
    carModel: "",
    startDate: "",
    customerName: "",
  });
  const [messageText, setMessageText] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [redirectBlocked, setRedirectBlocked] = useState(false);

  const buildMessage = () =>
    `Rental Booking Request | Car Model: ${formData.carModel.trim() || "N/A"} | Start Date: ${formData.startDate || "N/A"} | Customer Name: ${formData.customerName.trim() || "N/A"}`;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = buildMessage();
    setMessageText(message);

    const whatsappUrl = `${WHATSAPP_API_URL}${encodeURIComponent(message)}`;
    const newWindow = window.open(whatsappUrl, "_blank");

    if (!newWindow) {
      setRedirectBlocked(true);
      setCopyStatus("");
      return;
    }

    newWindow.focus();
    setRedirectBlocked(false);
    setCopyStatus("");
  };

  const handleCopyToClipboard = async () => {
    const message = messageText || buildMessage();
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Copied booking text to clipboard.");
    } catch {
      setCopyStatus("Unable to copy automatically. Please copy the message manually.");
    }
  };

  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg sm:p-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Rental Booking</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Book Your Rental via WhatsApp
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
          Fill in your preferred car, start date, and name, then tap to send the request directly to WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">Customer Name</label>
            <Input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
              placeholder="Your full name"
              className="mt-2 rounded-lg border-slate-300 bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Car Model</label>
            <Input
              type="text"
              name="carModel"
              value={formData.carModel}
              onChange={handleInputChange}
              required
              placeholder="e.g. Mercedes GLE 63"
              className="mt-2 rounded-lg border-slate-300 bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Start Date</label>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              className="mt-2 rounded-lg border-slate-300 bg-slate-50"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" className="flex-1 rounded-full bg-emerald-500 px-6 py-4 font-semibold text-white hover:bg-emerald-600">
            Send Booking to WhatsApp
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-full px-6 py-4 font-semibold text-slate-900"
            onClick={handleCopyToClipboard}
          >
            Copy Booking Text
          </Button>
        </div>

        {redirectBlocked && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            WhatsApp redirect was blocked by your browser. Use the copy button to paste the message into WhatsApp manually.
          </div>
        )}

        {copyStatus && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            {copyStatus}
          </div>
        )}
      </form>
    </section>
  );
};

export default RentalBookingForm;
