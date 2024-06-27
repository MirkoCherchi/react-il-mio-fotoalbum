import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/Utils/ContactForm";

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-beige">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-28">
        <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-gray-300 mb-4">
            If you have any questions or comments, please feel free to reach out
            to us using the form below.
          </p>
          <ContactForm />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
