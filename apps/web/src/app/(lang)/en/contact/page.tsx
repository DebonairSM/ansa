'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactEn() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
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
                  <span className="text-2xl">📍</span>
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
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-gray-600">(703) 785-5159</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✉️</span>
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
                  <span className="text-2xl">🌐</span>
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
              <Link
                href="https://www.paypal.com/US/fundraiser/charity/2006255"
                target="_blank"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Donate via PayPal
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">
                  Thank you for reaching out. We will respond soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}
