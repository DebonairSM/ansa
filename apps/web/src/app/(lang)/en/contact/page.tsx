'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaCheckCircle } from 'react-icons/fa';
import DonateLink from '@/components/DonateLink';

export default function ContactEn() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [requestData, setRequestData] = useState({
    institution: '',
    city: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    requestSummary: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestError, setRequestError] = useState('');

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRequestSubmitting(true);
    setRequestError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: requestData.contactName || requestData.institution,
          email: requestData.contactEmail,
          subject: `Institutional aid request - ${requestData.institution || 'ANSA'}`,
          message: [
            `Institution: ${requestData.institution}`,
            `City/State: ${requestData.city}`,
            `Contact person: ${requestData.contactName}`,
            `Phone: ${requestData.contactPhone}`,
            '',
            requestData.requestSummary,
          ].join('\n'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send institutional request');
      }

      setRequestSubmitted(true);
    } catch {
      setRequestError('Could not send the request. Please try again or email us directly.');
    } finally {
      setIsRequestSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
    } catch {
      setError('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-yellow-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-2xl">Have a question? We would love to hear from you!</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Address</h3>
                  <p className="text-gray-600">
                    3586 University Dr.<br />
                    Fairfax, Virginia 22030<br />
                    USA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhone className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-gray-600">(703) 785-5159</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <a href="mailto:associacaonsraa@gmail.com" className="text-yellow-600 hover:text-yellow-700">
                    associacaonsraa@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaGlobe className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Social Media</h3>
                  <div className="flex gap-4 mt-2">
                    <a
                      href="https://www.facebook.com/ANSABRAS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/ansabrasilorg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700 font-semibold"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Volunteer CTA */}
            <div className="mt-12 bg-yellow-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Want to Volunteer?</h3>
              <p className="text-gray-700 mb-4">
                We are always looking for dedicated volunteers who share our passion for helping Brazil.
              </p>
              <a
                href="mailto:associacaonsraa@gmail.com?subject=I want to volunteer"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Send Email
              </a>
            </div>

            {/* Donate CTA */}
            <div className="mt-6 bg-gray-900 text-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Want to make a Donation?</h3>
              <p className="text-gray-300 mb-4">
                Every dollar received will help needy children and communities in Brazil.
              </p>
              <DonateLink
                cta="contact-sidebar"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Donate via PayPal
              </DonateLink>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <FaCheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">
                  Thank you for reaching out. We will respond soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-bold py-4 rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}

            <div id="institutional-request" className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8 scroll-mt-24">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">For institutions</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">Institutional aid request</h3>
                <p className="mt-3 text-gray-700">
                  Use this form to start your project request and send us the basic information.
                  ANSA will then guide you through the complete package, which includes a commitment letter, image authorization, and supporting documents.
                </p>
                <a
                  href="/uploads/2021/03/NORMS-FOR-THE-SUBMISSION-OF-REQUESTS.1-2.docx"
                  download
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-amber-400 bg-white px-4 py-2 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v1a2 2 0 002 2h14a2 2 0 002-2v-1" />
                  </svg>
                  Download request submission norms (.docx)
                </a>
              </div>

              {requestSubmitted ? (
                <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-green-800">
                  We received your initial request. We will be in touch soon with next steps.
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  {requestError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                      {requestError}
                    </div>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="institution" className="block text-sm font-semibold mb-2">
                        Institution name *
                      </label>
                      <input
                        id="institution"
                        required
                        value={requestData.institution}
                        onChange={(e) => setRequestData({ ...requestData, institution: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-amber-500"
                        placeholder="e.g. Community Association..."
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold mb-2">
                        City / state *
                      </label>
                      <input
                        id="city"
                        required
                        value={requestData.city}
                        onChange={(e) => setRequestData({ ...requestData, city: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-amber-500"
                        placeholder="e.g. Quixadá, CE"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="request-contact-name" className="block text-sm font-semibold mb-2">
                        Contact person *
                      </label>
                      <input
                        id="request-contact-name"
                        required
                        value={requestData.contactName}
                        onChange={(e) => setRequestData({ ...requestData, contactName: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-amber-500"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="request-contact-email" className="block text-sm font-semibold mb-2">
                        Reply-to email *
                      </label>
                      <input
                        id="request-contact-email"
                        type="email"
                        required
                        value={requestData.contactEmail}
                        onChange={(e) => setRequestData({ ...requestData, contactEmail: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-amber-500"
                        placeholder="contact@institution.org"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="request-contact-phone" className="block text-sm font-semibold mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="request-contact-phone"
                      value={requestData.contactPhone}
                      onChange={(e) => setRequestData({ ...requestData, contactPhone: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-amber-500"
                      placeholder="+1 (xxx) xxx-xxxx"
                    />
                  </div>

                  <div>
                    <label htmlFor="request-summary" className="block text-sm font-semibold mb-2">
                      Request summary *
                    </label>
                    <textarea
                      id="request-summary"
                      required
                      rows={5}
                      value={requestData.requestSummary}
                      onChange={(e) => setRequestData({ ...requestData, requestSummary: e.target.value })}
                      className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-amber-500"
                      placeholder="Describe the main need, the people served, and how the aid will be used."
                    />
                  </div>

                  <div className="rounded-lg bg-white/80 p-4 text-sm text-gray-700">
                    A complete request typically includes a form, commitment letter, image use authorization, institution registration, detailed budget, and photos of the site.
                  </div>

                  <button
                    type="submit"
                    disabled={isRequestSubmitting}
                    className="w-full rounded-lg bg-amber-600 px-6 py-4 font-bold text-white transition-colors hover:bg-amber-700 disabled:bg-amber-300"
                  >
                    {isRequestSubmitting ? 'Sending...' : 'Submit institutional request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
