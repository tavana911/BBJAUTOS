import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import emailjs from '@emailjs/browser';

const AirportTransferBooking = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    transferType: "one-way",
    departureDate: "",
    departureTime: "",
    returnDate: "",
    returnTime: "",
    passengers: "1",
    pickupLocation: "",
    dropoffLocation: "",
    specialRequirements: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailContent = `
Airport Transfer Booking Request:

Personal Information:
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}

Transfer Details:
Transfer Type: ${formData.transferType}
Passengers: ${formData.passengers}

Departure:
Date: ${formData.departureDate}
Time: ${formData.departureTime}

${formData.transferType === "round-trip" ? `Return:
Date: ${formData.returnDate}
Time: ${formData.returnTime}
` : ""}
Locations:
Pickup: ${formData.pickupLocation}
Dropoff: ${formData.dropoffLocation}

Special Requirements:
${formData.specialRequirements || "None"}
    `.trim();

    // Send via EmailJS
    emailjs.send(
      'service_cuw4xkg',
      'template_airport_transfer',
      {
        to_email: 'info@bbjautos.com',
        from_email: formData.email,
        from_name: formData.fullName,
        message: emailContent,
        reply_to: formData.email,
      },
      'KKDS3qYa3fpMpY_Sl'
    ).catch(() => {
      // Fallback to WhatsApp if email fails
      const whatsappMessage = `Airport Transfer Booking Request:\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nTransfer Type: ${formData.transferType}\nDeparture Date: ${formData.departureDate}\nDeparture Time: ${formData.departureTime}${formData.transferType === "round-trip" ? `\nReturn Date: ${formData.returnDate}\nReturn Time: ${formData.returnTime}` : ""}\nPassengers: ${formData.passengers}\nPickup: ${formData.pickupLocation}\nDropoff: ${formData.dropoffLocation}\nSpecial Requirements: ${formData.specialRequirements}`;
      const whatsappUrl = `https://wa.me/2347078236267?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank");
    });
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Quick Booking</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Airport Transfer & Protocol Booking
        </h2>
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          Book your luxury airport transfer, chauffeur service, or protocol transport in minutes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg sm:p-10"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-slate-950">Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Name *</label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                  className="mt-2 rounded-lg border-slate-300 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email *</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  className="mt-2 rounded-lg border-slate-300 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Phone *</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+971 50 123 4567"
                  className="mt-2 rounded-lg border-slate-300 bg-slate-50"
                />
              </div>
            </div>
          </div>

          {/* Transfer Details */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-slate-950">Transfer Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Transfer Type *</label>
                <Select
                  value={formData.transferType}
                  onValueChange={(value) => handleSelectChange("transferType", value)}
                >
                  <SelectTrigger className="mt-2 rounded-lg border-slate-300 bg-slate-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-way">One-Way Transfer</SelectItem>
                    <SelectItem value="round-trip">Round-Trip Transfer</SelectItem>
                    <SelectItem value="hourly">Hourly Rental</SelectItem>
                    <SelectItem value="protocol">Protocol / Escort Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Number of Passengers *</label>
                <Select
                  value={formData.passengers}
                  onValueChange={(value) => handleSelectChange("passengers", value)}
                >
                  <SelectTrigger className="mt-2 rounded-lg border-slate-300 bg-slate-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                    <SelectItem value="4">4 Passengers</SelectItem>
                    <SelectItem value="5">5+ Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Departure Details */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-slate-950">
              <Calendar className="h-5 w-5" />
              Departure Details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Departure Date *</label>
                <Input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  required
                  className="mt-2 rounded-lg border-slate-300 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Departure Time *</label>
                <div className="relative mt-2">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleInputChange}
                    required
                    className="rounded-lg border-slate-300 bg-slate-50 pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Return Details (conditionally shown) */}
          {formData.transferType === "round-trip" && (
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-slate-950">
                <Calendar className="h-5 w-5" />
                Return Details
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Return Date *</label>
                  <Input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    required={formData.transferType === "round-trip"}
                    className="mt-2 rounded-lg border-slate-300 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Return Time *</label>
                  <div className="relative mt-2">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Input
                      type="time"
                      name="returnTime"
                      value={formData.returnTime}
                      onChange={handleInputChange}
                      required={formData.transferType === "round-trip"}
                      className="rounded-lg border-slate-300 bg-slate-50 pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Locations */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-slate-950">
              <MapPin className="h-5 w-5" />
              Locations
            </h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Pickup Location *</label>
                <Input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Dubai International Airport, Terminal 1"
                  className="mt-2 rounded-lg border-slate-300 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Dropoff Location *</label>
                <Input
                  type="text"
                  name="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Hotel address or office location"
                  className="mt-2 rounded-lg border-slate-300 bg-slate-50"
                />
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-slate-950">Special Requirements</h3>
            <textarea
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleInputChange}
              placeholder="VIP escort, specific vehicle preferences, accessibility needs, protocol requirements, etc."
              rows={4}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 rounded-full bg-emerald-500 px-8 py-4 font-semibold text-white hover:bg-emerald-600"
            >
              Request Booking via WhatsApp
            </Button>
          </div>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-900"
            >
              ✓ Booking request sent! We'll confirm via WhatsApp shortly.
            </motion.div>
          )}
        </form>

        {/* Info Box */}
        <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">✓ Flexible Booking:</span> Modify or cancel up to 24 hours before departure.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">✓ Professional Drivers:</span> All chauffeurs are trained and background-checked.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">✓ Transparent Pricing:</span> No hidden charges. Hourly rates start from AED 200/hour.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AirportTransferBooking;
