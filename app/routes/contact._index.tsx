import {json, redirect, type ActionFunctionArgs} from '@shopify/remix-oxygen';
import {Form, useActionData, useNavigation} from '@remix-run/react';
import {useState} from 'react';

export const meta = () => {
  return [{title: 'Neovibe | Contact Us'}];
};

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Validation
  const errors: {[key: string]: string} = {};

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.name = 'Please enter your name';
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    errors.email = 'Please enter a valid email address';
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    errors.message = 'Please enter your message';
  }

  if (Object.keys(errors).length > 0) {
    return json({errors, success: false});
  }

  // In production, you would send this data to your email service
  // For now, we'll just simulate a successful submission
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return json({success: true, errors: {}});
}

export default function ContactUs() {
  const actionData: any = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const {name, value} = e.target;
    setFormState((prev) => ({...prev, [name]: value}));
  };

  return (
    <div className="bg-[#121212] text-[#F9F9F9] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] bg-clip-text text-transparent">
            Light Up a Conversation
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Have questions about our smart lighting? Want to share your vibe
            ideas? Our team is ready to connect!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#333333]">
            {actionData?.success ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                <p className="mb-6">
                  We've received your glow-up request and will get back to you
                  soon.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-[#00E0FF] hover:bg-[#00C0E0] text-black font-medium rounded-lg transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <Form method="post">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full bg-[#2A2A2A] border ${actionData?.errors?.name ? 'border-red-500' : 'border-[#444444]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]`}
                    placeholder="Jane Doe"
                  />
                  {actionData?.errors?.name && (
                    <p className="mt-1 text-red-500 text-sm">
                      {actionData.errors.name}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full bg-[#2A2A2A] border ${actionData?.errors?.email ? 'border-red-500' : 'border-[#444444]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]`}
                    placeholder="you@example.com"
                  />
                  {actionData?.errors?.email && (
                    <p className="mt-1 text-red-500 text-sm">
                      {actionData.errors.email}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full bg-[#2A2A2A] border border-[#444444] rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]"
                  >
                    <option value="">Select a topic</option>
                    <option value="Order Question">Order Question</option>
                    <option value="Product Information">
                      Product Information
                    </option>
                    <option value="Returns & Warranty">
                      Returns & Warranty
                    </option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full bg-[#2A2A2A] border ${actionData?.errors?.message ? 'border-red-500' : 'border-[#444444]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF] resize-none`}
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                  {actionData?.errors?.message && (
                    <p className="mt-1 text-red-500 text-sm">
                      {actionData.errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] hover:from-[#00C0E0] hover:to-[#A064DC] text-black font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </Form>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6">Other Ways to Connect</h2>

              <div className="mb-8">
                <div className="flex items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#00E0FF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#F9F9F9] mb-1">
                      Email Us
                    </h3>
                    <p className="text-[#BBBBBB] mb-2">
                      We'll respond within 24 hours
                    </p>
                    <a
                      href="mailto:support@neovibe.com"
                      className="text-[#00E0FF] hover:text-[#C084FC] transition-colors"
                    >
                      support@neovibe.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#00E0FF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#F9F9F9] mb-1">
                      Text Support
                    </h3>
                    <p className="text-[#BBBBBB] mb-2">For quick questions</p>
                    <a
                      href="sms:+18001234567"
                      className="text-[#00E0FF] hover:text-[#C084FC] transition-colors"
                    >
                      (800) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#00E0FF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#F9F9F9] mb-1">
                      Live Chat
                    </h3>
                    <p className="text-[#BBBBBB] mb-2">Available 9am-8pm EST</p>
                    <button className="text-[#00E0FF] hover:text-[#C084FC] transition-colors">
                      Start a Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333]">
              <h3 className="text-lg font-medium mb-4">
                Connect with us on social
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#00E0FF] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#00E0FF] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#00E0FF] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#00E0FF] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#00E0FF] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-12.727 0h-3.999v-13h4v13zm-6-8h4v-5h-4v5zm2.5-2.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm-3.5 10.5h4v-5h-4v5z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333]">
              <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
                What's your return policy?
              </h3>
              <p className="text-[#BBBBBB]">
                Not vibing with it? Send it back within 30 days for a full
                refund. We just ask that you keep the original packaging.
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333]">
              <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
                How long does shipping take?
              </h3>
              <p className="text-[#BBBBBB]">
                We ship within 1-2 business days. Standard shipping takes 3-5
                days, while express takes 1-2 days. International orders
                typically arrive within 7-14 days.
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333]">
              <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
                Do your lights work with smart home systems?
              </h3>
              <p className="text-[#BBBBBB]">
                Yes! Most of our products are compatible with Google Home,
                Amazon Alexa, and Apple HomeKit. Check individual product specs
                for details.
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333]">
              <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
                I'm a content creator. Do you offer partnerships?
              </h3>
              <p className="text-[#BBBBBB]">
                Absolutely! We love collaborating with creators. Select
                "Collaboration" from the subject dropdown in our contact form
                and tell us about your platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gradient-to-r from-[#00E0FF] to-[#C084FC] py-12 text-center text-black">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to transform your space?
          </h2>
          <p className="text-lg mb-8">
            Browse our collection of smart lighting solutions that match your
            vibe.
          </p>
          <a
            href="/collections"
            className="inline-block px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-opacity-80 transition-all duration-300"
          >
            Shop the Glow
          </a>
        </div>
      </div>
    </div>
  );
}
