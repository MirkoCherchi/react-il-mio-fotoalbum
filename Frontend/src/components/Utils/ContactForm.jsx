import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg text-beige"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-beige"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-beige"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-lg font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-beige"
          rows="5"
          required
        />
      </div>
      <button type="submit" className="w-full bg-teal text-black p-2 rounded">
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
