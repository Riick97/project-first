import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {useState} from 'react';

export const meta = () => {
  return [{title: 'Neovibe | Policies'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {shop} = await context.storefront.query(POLICIES_QUERY);
  return json({shop});
}

export default function Policies() {
  // const {shop, policies} = useLoaderData();
  const [activePolicy, setActivePolicy] = useState('shipping');

  // Structured policy content for better organization - in a real implementation, this would pull from Shopify's policies API
  const policyContent: any = {
    shipping: {
      title: 'Shipping Policy',
      sections: [
        {
          heading: 'Processing Time',
          content:
            'All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.',
        },
        {
          heading: 'Shipping Options',
          content:
            'We offer the following shipping methods:\n\n• Standard Shipping (3-5 business days): Free on orders over $50, otherwise $4.99\n• Express Shipping (1-2 business days): $9.99\n• International Shipping (7-14 business days): Calculated at checkout based on destination',
        },
        {
          heading: 'Tracking Information',
          content:
            "You will receive a shipping confirmation email with tracking information once your order has shipped. Please allow up to 24 hours for the tracking information to update in the carrier's system.",
        },
        {
          heading: 'International Orders',
          content:
            "Please note that import duties, taxes, and charges are not included in the product price or shipping cost. These charges are the buyer's responsibility and will be collected by the shipping carrier or local customs office.",
        },
        {
          heading: 'Shipping Restrictions',
          content:
            'Due to shipping regulations, certain products may not be available for international shipping. We currently ship to most countries, but some restrictions apply.',
        },
      ],
    },
    returns: {
      title: 'Returns & Refunds',
      sections: [
        {
          heading: '30-Day Satisfaction Guarantee',
          content:
            "If you're not completely satisfied with your Neovibe purchase, you can return it within 30 days of receipt for a full refund of the product price (shipping fees are non-refundable).",
        },
        {
          heading: 'Return Process',
          content:
            "1. Contact our customer support at support@neovibe.com to initiate your return\n2. We'll email you a prepaid return shipping label (for domestic orders only)\n3. Package the item in its original packaging if possible\n4. Attach the return label and drop off at any authorized shipping location\n5. Once we receive and inspect your return, we'll process your refund",
        },
        {
          heading: 'Refund Processing',
          content:
            "Refunds will be issued to the original payment method used for purchase. Please allow 7-10 business days for the refund to appear in your account after we've received and processed your return.",
        },
        {
          heading: 'Conditions for Returns',
          content:
            'Products must be returned in their original condition and packaging when possible. Products that are damaged due to misuse, missing accessories, or show excessive wear may not be eligible for a full refund.',
        },
        {
          heading: 'Exchanges',
          content:
            "If you'd like to exchange an item, please return the original item for a refund and place a new order for the preferred item. This ensures the fastest processing time.",
        },
      ],
    },
    warranty: {
      title: 'Warranty Policy',
      sections: [
        {
          heading: '2-Year Limited Warranty',
          content:
            'All Neovibe products are covered by our 2-year limited warranty from the date of purchase. This warranty covers defects in materials and workmanship under normal use.',
        },
        {
          heading: "What's Covered",
          content:
            '• Manufacturing defects\n• Premature product failure under normal use\n• LED malfunctions and color accuracy issues\n• Power adapters and controllers included with products\n• Connection and software issues related to hardware',
        },
        {
          heading: "What's Not Covered",
          content:
            '• Physical damage from drops, water exposure, or misuse\n• Normal wear and tear\n• Products with evidence of tampering or modification\n• Damage caused by improper installation or use with incompatible accessories\n• Batteries beyond 6 months (these have a shorter warranty period)',
        },
        {
          heading: 'Making a Warranty Claim',
          content:
            'To submit a warranty claim, please contact our support team at warranty@neovibe.com with your order number, a description of the issue, and photos or videos demonstrating the problem.',
        },
        {
          heading: 'Warranty Service',
          content:
            'For approved warranty claims, we will at our discretion either repair the defective product, replace it with the same or a similar model, or issue a partial or full refund. Shipping costs for warranty service may be covered depending on your location.',
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: 'Information We Collect',
          content:
            'We collect personal information that you voluntarily provide to us when you register on our website, express interest in obtaining information about us or our products, or otherwise contact us. This information may include:\n\n• Name, email address, postal address, phone number\n• Order information and purchase history\n• Payment information (stored securely through our payment processors)\n• Device information and usage data when you use our website or app',
        },
        {
          heading: 'How We Use Your Information',
          content:
            "We use your information to:\n\n• Process and fulfill your orders\n• Communicate with you about your orders, products, and services\n• Improve our website, products, and customer service\n• Send you marketing communications (if you've opted in)\n• Comply with legal obligations",
        },
        {
          heading: 'Data Sharing and Disclosure',
          content:
            'We may share your information with:\n\n• Service providers who help us operate our business\n• Shipping partners to deliver your orders\n• Payment processors for transaction processing\n• Legal authorities when required by law',
        },
        {
          heading: 'Your Rights and Choices',
          content:
            'You have the right to:\n\n• Access, correct, or delete your personal information\n• Opt out of marketing communications\n• Object to the processing of your data in certain circumstances\n• Request a copy of your data',
        },
        {
          heading: 'Security',
          content:
            'We implement appropriate technical and organizational measures to protect your personal information. However, no electronic transmission or storage system is 100% secure, and we cannot guarantee absolute security.',
        },
        {
          heading: 'Policy Updates',
          content:
            'We may update this privacy policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any material changes by posting the new policy on our website.',
        },
      ],
    },
    terms: {
      title: 'Terms of Service',
      sections: [
        {
          heading: 'Agreement',
          content:
            'By accessing or using the Neovibe website, mobile app, or making a purchase, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
        },
        {
          heading: 'Account Responsibilities',
          content:
            'If you create an account, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.',
        },
        {
          heading: 'Intellectual Property',
          content:
            'All content on our website and app, including text, graphics, logos, images, and software, is the property of Neovibe and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express permission.',
        },
        {
          heading: 'Product Use',
          content:
            'Our products are designed for personal use in accordance with provided instructions. Misuse, modification, or improper installation of products voids warranties and may pose safety risks. We are not liable for damage resulting from improper use.',
        },
        {
          heading: 'Limitation of Liability',
          content:
            'To the fullest extent permitted by law, Neovibe shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of our products, website, or services.',
        },
        {
          heading: 'Governing Law',
          content:
            'These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is registered, without regard to its conflict of law provisions.',
        },
        {
          heading: 'Changes to Terms',
          content:
            'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes indicates your acceptance of the revised terms.',
        },
      ],
    },
  };

  return (
    <div className="bg-[#121212] text-[#F9F9F9] min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF] to-[#C084FC]"></div>
          <div className="absolute inset-0 bg-[#121212] opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-3xl px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our Policies
              </h1>
              <p className="text-lg md:text-xl">
                Transparency and trust are important to us
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm">
        <div className="flex items-center text-[#BBBBBB]">
          <Link to="/" className="hover:text-[#00E0FF]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#F9F9F9]">Policies</span>
        </div>
      </div>

      {/* Policy Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-[#1A1A1A] rounded-xl p-4 sticky top-8">
              <h3 className="text-lg font-medium mb-4 px-2">Policies</h3>
              <nav className="flex flex-col space-y-1">
                {Object.entries(policyContent).map(([key, policy]: any) => (
                  <button
                    key={key}
                    onClick={() => setActivePolicy(key)}
                    className={`px-4 py-2 rounded-lg text-left transition-colors ${
                      activePolicy === key
                        ? 'bg-[#00E0FF] text-black font-medium'
                        : 'text-[#F9F9F9] hover:bg-[#2A2A2A]'
                    }`}
                  >
                    {policy.title}
                  </button>
                ))}
              </nav>

              <div className="mt-6 p-4 bg-[#2A2A2A] rounded-lg">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-[#BBBBBB] mb-4">
                  If you have any questions about our policies, please don't
                  hesitate to contact us.
                </p>
                <Link
                  to="/contact"
                  className="text-[#00E0FF] hover:underline flex items-center text-sm"
                >
                  Contact Support
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-[#1A1A1A] rounded-xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {policyContent[activePolicy].title}
              </h2>

              <div className="prose prose-invert max-w-none">
                {policyContent[activePolicy].sections.map((section: any, index: any) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-xl font-medium mb-4 text-[#00E0FF]">
                      {section.heading}
                    </h3>
                    <div className="text-[#BBBBBB] whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#333333] mt-8 pt-8">
                <p className="text-sm text-[#BBBBBB]">
                  Last Updated: March 15, 2025
                </p>
                <p className="text-sm text-[#BBBBBB] mt-2">
                  If you have any questions about our{' '}
                  {policyContent[activePolicy].title.toLowerCase()}, please{' '}
                  <Link
                    to="/contact"
                    className="text-[#00E0FF] hover:underline"
                  >
                    contact us
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Policy Highlights */}
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              {activePolicy === 'shipping' && (
                <>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 text-[#00E0FF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Free Shipping</h3>
                    <p className="text-[#BBBBBB] text-sm">
                      All orders over $50 qualify for free standard shipping
                      within the continental US.
                    </p>
                  </div>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 text-[#00E0FF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Fast Processing</h3>
                    <p className="text-[#BBBBBB] text-sm">
                      We process all orders within 1-2 business days to get your
                      lights to you faster.
                    </p>
                  </div>
                </>
              )}

              {activePolicy === 'returns' && (
                <>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 text-[#00E0FF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">30-Day Returns</h3>
                    <p className="text-[#BBBBBB] text-sm">
                      Not vibing with your purchase? Return it within 30 days,
                      no questions asked.
                    </p>
                  </div>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 text-[#00E0FF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Easy Process</h3>
                    <p className="text-[#BBBBBB] text-sm">
                      We provide prepaid return labels and process refunds
                      quickly after receiving your return.
                    </p>
                  </div>
                </>
              )}

              {activePolicy === 'warranty' && (
                <>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 text-[#00E0FF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">2-Year Protection</h3>
                    <p className="text-[#BBBBBB] text-sm">
                      All Neovibe products are backed by our comprehensive
                      2-year warranty against defects.
                    </p>
                  </div>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 text-[#00E0FF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Responsive Support</h3>
                    <p className="text-[#BBBBBB] text-sm">
                      Our dedicated support team makes warranty claims easy and
                      hassle-free.
                    </p>
                  </div>
                </>
              )}

              {activePolicy === 'privacy' && (
                <>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 text-[#00E0FF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Data Protection</h3>
                    <p className="text-[#BBBBBB] text-sm">
                      We use industry-standard security measures to protect your
                      personal information.
                    </p>
                  </div>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 text-[#00E0FF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Your Control</h3>
                    <p className="text-[#BBBBBB] text-sm">
                      You have the right to access, modify, or delete your
                      personal information at any time.
                    </p>
                  </div>
                </>
              )}

              {activePolicy === 'terms' && (
                <>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 text-[#00E0FF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Legal Agreement</h3>
                    <p className="text-[#BBBBBB] text-sm">
                      Using our site or services constitutes acceptance of these
                      terms and conditions.
                    </p>
                  </div>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 text-[#00E0FF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Intellectual Property</h3>
                    <p className="text-[#BBBBBB] text-sm">
                      All content on our site is protected by copyright and
                      other intellectual property laws.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Banner */}
      <div className="bg-[#1A1A1A] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Still Have Questions?
          </h2>
          <p className="text-[#BBBBBB] mb-8 max-w-2xl mx-auto">
            Our support team is here to help you understand our policies and
            answer any questions you may have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/faq"
              className="px-6 py-3 bg-[#2A2A2A] hover:bg-[#333333] text-[#F9F9F9] rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              View FAQ
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] hover:from-[#00C0E0] hover:to-[#A064DC] text-black font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  query ShopPolicies {
    shop {
      refundPolicy {
        id
        title
        body
      }
      privacyPolicy {
        id
        title
        body
      }
      shippingPolicy {
        id
        title
        body
      }
      termsOfService {
        id
        title
        body
      }
      subscriptionPolicy {
        id
        title
        body
      }
    }
  }
`;
