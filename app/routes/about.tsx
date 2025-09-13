import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';

export const meta = () => {
  return [{title: 'Neovibe | About Us'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {shop} = await context.storefront.query(SHOP_QUERY);
  return json({shop});
}

export default function AboutUs() {
  const {shop}: any = useLoaderData();

  // Team members data
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Former lighting designer with a passion for creating immersive experiences. Alex founded Neovibe to make professional-grade lighting accessible to everyone.',
      image: '/api/placeholder/300/300?text=Alex',
    },
    {
      name: 'Maya Rodriguez',
      role: 'Head of Product Design',
      bio: 'With a background in industrial design and user experience, Maya ensures every Neovibe product is both beautiful and intuitive to use.',
      image: '/api/placeholder/300/300?text=Maya',
    },
    {
      name: 'Jordan Taylor',
      role: 'CTO',
      bio: 'Tech innovator specialized in IoT solutions. Jordan leads our development team in creating seamless app experiences and smart home integrations.',
      image: '/api/placeholder/300/300?text=Jordan',
    },
    {
      name: 'Sam Patel',
      role: 'Creative Director',
      bio: 'Award-winning visual artist who brings the Neovibe aesthetic to life through branding, packaging, and content that captures the magic of light.',
      image: '/api/placeholder/300/300?text=Sam',
    },
  ];

  // Values data
  const values = [
    {
      title: 'Innovation',
      description:
        "We constantly push the boundaries of what's possible with lighting technology.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: 'Quality',
      description:
        'We never compromise on materials, build quality, or user experience.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
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
      ),
    },
    {
      title: 'Accessibility',
      description:
        'We believe everyone deserves to transform their space with amazing lighting.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Sustainability',
      description:
        'Our products are energy-efficient and designed with eco-friendly materials wherever possible.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-[#121212] text-[#F9F9F9] min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF] to-[#C084FC]"></div>
          <div className="absolute inset-0 bg-[url('/api/placeholder/1800/600?text=')] bg-center bg-cover mix-blend-overlay opacity-20"></div>
          <div className="absolute inset-0 bg-[#121212] opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-3xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
              <p className="text-xl md:text-2xl">
                Redefining modern living through immersive lighting experiences
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
          <span className="text-[#F9F9F9]">About Us</span>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="bg-[#00E0FF] text-black px-3 py-1 text-sm rounded-full mb-4 inline-block">
            OUR MISSION
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Transforming Spaces, Elevating Vibes
          </h2>
          <p className="text-lg text-[#BBBBBB] max-w-3xl mx-auto">
            Neovibe began with a simple idea: what if lighting could do more
            than just illuminate a room? What if it could transform emotions,
            enhance creativity, and define your personal space in ways
            traditional lighting never could?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Journey</h3>
            <p className="text-[#BBBBBB] mb-6">
              Founded in 2021, Neovibe started as a project between friends who
              shared a passion for smart tech and immersive environments. We saw
              that while smart lighting was growing, it was still treated as a
              utility rather than an experience.
            </p>
            <p className="text-[#BBBBBB]">
              We set out to change that by creating products that don't just
              light up spaces, but transform them. Every product we design aims
              to combine cutting-edge technology with intuitive controls and
              breathtaking visual effects that feel personal and customizable.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img
              src="/team.png"
              alt="Neovibe team working on lighting designs"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-[#C084FC] text-black px-3 py-1 text-sm rounded-full mb-4 inline-block">
              OUR VALUES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              What Drives Us
            </h2>
            <p className="text-lg text-[#BBBBBB] max-w-3xl mx-auto">
              At Neovibe, we're guided by core principles that influence every
              product we create and every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-[#121212] p-6 rounded-xl">
                <div className="w-12 h-12 mb-4 bg-[#2A2A2A] rounded-full flex items-center justify-center text-[#00E0FF]">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-[#BBBBBB]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="bg-[#00E0FF] text-black px-3 py-1 text-sm rounded-full mb-4 inline-block">
            OUR TEAM
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Meet the Glow Makers
          </h2>
          <p className="text-lg text-[#BBBBBB] max-w-3xl mx-auto">
            Our diverse team combines expertise in lighting design, software
            development, and user experience to create products that delight and
            inspire.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#00E0FF]/10 group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 group-hover:text-[#00E0FF] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#C084FC] mb-4">{member.role}</p>
                <p className="text-[#BBBBBB] text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Workspace */}
      {/* <section className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Our Space</h2>
              <p className="text-[#BBBBBB] mb-6">
                Located in the heart of the design district, our headquarters is
                both a workspace and a living laboratory. It's where we
                experiment with new lighting concepts, test products, and
                collaborate on the next generation of Neovibe experiences.
              </p>
              <p className="text-[#BBBBBB] mb-6">
                Every corner of our office showcases different lighting
                applications — from focused work areas to creative brainstorming
                spaces to chill-out zones. We live with our products daily,
                which helps us understand how they integrate into real life.
              </p>
              <p className="text-[#BBBBBB]">
                We've designed our workspace to inspire creativity and
                innovation, the same qualities we hope our products bring to
                your spaces.
              </p>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
              <img
                src="/api/placeholder/300/400?text=Office 1"
                alt="Neovibe office space"
                className="rounded-xl w-full h-auto"
              />
              <img
                src="/api/placeholder/300/400?text=Office 2"
                alt="Neovibe design studio"
                className="rounded-xl w-full h-auto"
              />
              <img
                src="/api/placeholder/300/200?text=Office 3"
                alt="Neovibe product testing area"
                className="rounded-xl w-full h-auto col-span-2"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="bg-[#C084FC] text-black px-3 py-1 text-sm rounded-full mb-4 inline-block">
            WHAT PEOPLE SAY
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lighting Up Lives
          </h2>
          <p className="text-lg text-[#BBBBBB] max-w-3xl mx-auto">
            Don't just take our word for it — here's what our customers are
            saying.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "Neovibe's galaxy projector completely transformed my bedroom. It's like having my own personal planetarium.",
              author: 'Jamie K.',
              role: 'Content Creator',
            },
            {
              quote:
                "The app control is so intuitive. I've created different lighting scenes for working, relaxing, and entertaining.",
              author: 'Taylor M.',
              role: 'Interior Designer',
            },
            {
              quote:
                'My streams have never looked better. My viewers constantly ask about my lighting setup.',
              author: 'Chris L.',
              role: 'Twitch Streamer',
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-[#1A1A1A] p-6 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#00E0FF] mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-[#BBBBBB] italic mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-sm text-[#C084FC]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join Our Team */}
      {/* <section className="bg-gradient-to-r from-[#00E0FF] to-[#C084FC] py-20">
        <div className="max-w-3xl mx-auto px-4 text-center text-black">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
          <p className="text-lg mb-8">
            We're always looking for passionate people to help us redefine what
            lighting can be. Check out our open positions and become part of the
            Neovibe family.
          </p>
          <Link
            to="/careers"
            className="inline-block px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-opacity-80 transition-all duration-300"
          >
            See Open Positions
          </Link>
        </div>
      </section> */}

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-2xl">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-[#BBBBBB] mb-8">
              Sign up for our newsletter to get product updates, lighting
              inspiration, and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 bg-[#2A2A2A] border border-[#333333] rounded-lg flex-grow text-[#F9F9F9] focus:outline-none focus:border-[#00E0FF]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#00E0FF] hover:bg-[#00C0E0] text-black font-medium rounded-lg transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

const SHOP_QUERY = `#graphql
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;
