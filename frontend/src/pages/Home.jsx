import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Search,
  MapPin,
  Star,
  ChevronRight,
  ShieldCheck,
  Clock3,
  BadgeCheck,
  Zap,
  Droplets,
  Hammer,
  Snowflake,
  Paintbrush,
} from "lucide-react";

const services = [

  {
    name: "Electrical",
    description: "Wiring, installation & repairs",
    jobs: "1,240+ jobs",
    icon: Zap,
    categoryId: 1,
  },
  {
    name: "Plumbing",
    description: "Pipes, leaks & installations",
    jobs: "980+ jobs",
    icon: Droplets,
    categoryId: 2,
  },
  {
    name: "AC & Cooling",
    description: "Service, repair & installation",
    jobs: "760+ jobs",
    icon: Snowflake,
    categoryId: 1,
  },
  {
    name: "Carpentry",
    description: "Furniture, woodwork & repairs",
    jobs: "620+ jobs",
    icon: Hammer,
    categoryId: 3,
  },
  {
    name: "Painting",
    description: "Interior & exterior finishing",
    jobs: "510+ jobs",
    icon: Paintbrush,
    categoryId: 3,
  },
];

const technicians = [
  {
    name: "Arun Kumar",
    role: "Master Electrician",
    experience: "8 years experience",
    location: "Chennai",
    rating: "4.9",
    reviews: 128,
    jobs: 184,
    price: "From ₹399",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "Rahul S.",
    role: "Plumbing Specialist",
    experience: "6 years experience",
    location: "Coimbatore",
    rating: "4.8",
    reviews: 94,
    jobs: 126,
    price: "From ₹349",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "Vignesh R.",
    role: "AC Technician",
    experience: "7 years experience",
    location: "Madurai",
    rating: "5.0",
    reviews: 156,
    jobs: 211,
    price: "From ₹499",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "Sanjay M.",
    role: "Carpenter",
    experience: "5 years experience",
    location: "Salem",
    rating: "4.9",
    reviews: 72,
    jobs: 98,
    price: "From ₹449",
    image:
      "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=1000&q=90",
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Verified professionals",
    text: "Identity and profile checks before joining.",
  },
  {
    icon: BadgeCheck,
    title: "Real customer reviews",
    text: "Make decisions based on verified work.",
  },
  {
    icon: Clock3,
    title: "Fast responses",
    text: "Connect with available professionals nearby.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");


  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/technicians");
  };

  return (
    <main className="min-h-screen bg-[#F7F7F3] text-[#111111]">


      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-12 sm:px-8 lg:px-10 lg:pb-16 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          {/* Copy */}
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
              <span className="h-1.5 w-1.5 bg-[#68705A]" />
              Your local service marketplace
            </div>

            <h1 className="max-w-[900px] text-[clamp(4rem,8.5vw,8.5rem)] font-semibold leading-[0.8] tracking-[-0.085em]">
              Skilled people.
              <br />
              <span className="text-[#68705A]">Better work.</span>
            </h1>

            <p className="mt-7 max-w-[540px] text-[15px] leading-6 text-black/50">
              Find trusted technicians for repairs, maintenance and
              installations. Compare professionals, read reviews and hire
              with confidence.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="mt-8 max-w-[720px] border border-black/15 bg-white">
              <div className="grid md:grid-cols-[1fr_190px_auto]">
                <div className="flex items-center gap-3 border-b border-black/10 px-5 py-4 md:border-b-0 md:border-r">
                  <Search
                    size={18}
                    strokeWidth={1.6}
                    className="text-black/40"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What service do you need?"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-black/30"
                  />
                </div>

                <div className="flex items-center gap-2 border-b border-black/10 px-5 py-4 md:border-b-0 md:border-r">
                  <MapPin
                    size={16}
                    strokeWidth={1.6}
                    className="text-black/40"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full bg-transparent text-xs outline-none placeholder:text-black/30"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#111111] px-7 py-4 text-xs font-medium text-white transition hover:bg-[#68705A]"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-black/40">
              <span>Popular:</span>
              <Link to="/technicians" className="underline underline-offset-4">
                AC repair
              </Link>
              <Link to="/technicians?category=1" className="underline underline-offset-4">
                Electrician
              </Link>
              <Link to="/technicians?category=2" className="underline underline-offset-4">
                Plumber
              </Link>
              <Link to="/technicians?category=3" className="underline underline-offset-4">
                Carpenter
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/4.5] overflow-hidden lg:aspect-[4/4.7]">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=90"
                alt="Professional technician"
                className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
              />
            </div>

            {/* Image information */}
            <div className="absolute bottom-0 left-0 bg-[#F7F7F3] px-5 py-4">
              <p className="text-[9px] uppercase tracking-[0.16em] text-black/35">
                Professionals on Locos
              </p>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-semibold tracking-[-0.05em]">
                  12,000+
                </span>
                <span className="text-[10px] text-black/40">
                  technicians
                </span>
              </div>
            </div>

            <div className="absolute right-4 top-4 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <Star
                  size={13}
                  fill="currentColor"
                />
                <span className="text-xs font-semibold">
                  4.9
                </span>
              </div>
              <p className="mt-1 text-[9px] text-black/40">
                average rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK TRUST BAR
      ===================================================== */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-3">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex gap-4 px-5 py-6 sm:px-8 lg:px-10 ${
                  index !== 2 ? "border-b sm:border-b-0 sm:border-r border-black/10" : ""
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#68705A]"
                />
                <div>
                  <h3 className="text-xs font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[10px] leading-4 text-black/40">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}
      <section id="services" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Browse services
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
              What can we help with?
            </h2>
          </div>

          <Link
            to="/technicians"
            className="hidden items-center gap-2 text-xs font-medium sm:flex hover:opacity-50"
          >
            View all services
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                to={`/technicians?category=${service.categoryId}`}
                key={service.name}
                className="group border-b border-r border-black/10 bg-[#F7F7F3] p-6 transition hover:bg-white lg:p-7"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    size={23}
                    strokeWidth={1.4}
                    className="text-[#68705A]"
                  />

                  <ArrowUpRight
                    size={16}
                    className="text-black/25 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black"
                  />
                </div>

                <div className="mt-12">
                  <h3 className="text-lg font-semibold tracking-[-0.035em]">
                    {service.name}
                  </h3>

                  <p className="mt-1.5 text-[10px] leading-4 text-black/40">
                    {service.description}
                  </p>

                  <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.12em] text-black/30">
                    {service.jobs}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          FEATURED TECHNICIANS
      ===================================================== */}
      <section className="border-y border-black/10 bg-[#ECECE7]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
                Recommended professionals
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.065em] sm:text-5xl">
                People who know
                <br className="hidden sm:block" />
                their craft.
              </h2>
            </div>

            <Link
              to="/technicians"
              className="hidden items-center gap-2 text-xs font-medium sm:flex hover:opacity-50"
            >
              Explore all
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
            {technicians.map((person, index) => (
              <article
                key={person.name}
                className={`group mb-5 break-inside-avoid ${
                  index === 1 ? "lg:mt-12" : ""
                } ${
                  index === 3 ? "lg:mt-[-8px]" : ""
                }`}
              >
                <div className="relative overflow-hidden bg-black/5">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="aspect-[4/5] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  <div className="absolute left-3 top-3 flex items-center gap-1 bg-[#F7F7F3] px-2.5 py-1.5 text-[10px]">
                    <Star
                      size={11}
                      fill="currentColor"
                    />
                    {person.rating}
                  </div>
                </div>

                <div className="border-b border-black/15 py-4">
                  <div className="flex justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-semibold tracking-[-0.025em]">
                          {person.name}
                        </h3>

                        <BadgeCheck
                          size={13}
                          className="text-[#68705A]"
                        />
                      </div>

                      <p className="mt-1 text-[10px] text-black/45">
                        {person.role}
                      </p>
                    </div>

                    <Link to="/technicians">
                      <ArrowUpRight
                        size={16}
                        className="text-black/25 transition-all group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-black/35">
                    <span>{person.experience}</span>
                    <span>·</span>
                    <span>{person.location}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[9px] text-black/35">
                      {person.jobs} completed jobs · {person.reviews} reviews
                    </span>

                    <span className="text-[10px] font-semibold">
                      {person.price}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section id="how-it-works" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
              How Locos works
            </p>

            <h2 className="mt-5 text-5xl font-semibold leading-[0.85] tracking-[-0.07em] sm:text-6xl">
              From problem
              <br />
              to solved.
            </h2>

            <p className="mt-6 max-w-[340px] text-sm leading-6 text-black/45">
              Getting professional help shouldn't take hours of searching
              and calling.
            </p>
          </div>

          <div className="border-t border-black/10">
            {[
              {
                number: "01",
                title: "Describe your job",
                text: "Tell us what needs to be repaired, installed or maintained.",
              },
              {
                number: "02",
                title: "Compare professionals",
                text: "See experience, ratings, completed jobs and pricing before choosing.",
              },
              {
                number: "03",
                title: "Get it done",
                text: "Connect directly with your technician and get the job completed.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="grid grid-cols-[40px_1fr_auto] gap-5 border-b border-black/10 py-7"
              >
                <span className="font-mono text-[10px] text-black/30">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.035em]">
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-[520px] text-xs leading-5 text-black/40">
                    {step.text}
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="mt-1 text-black/25"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          LARGE CTA
      ===================================================== */}
      <section className="bg-[#111111] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                For skilled professionals
              </p>

              <h2 className="mt-6 text-[clamp(4rem,8vw,8rem)] font-semibold leading-[0.8] tracking-[-0.085em]">
                Your skills.
                <br />
                <span className="text-[#68705A]">
                  Your business.
                </span>
              </h2>
            </div>

            <div>
              <p className="max-w-[360px] text-sm leading-6 text-white/45">
                Build your profile, showcase your work and connect with
                customers looking for your expertise.
              </p>

              <Link
                to="/register"
                className="mt-7 flex items-center gap-4 bg-white px-6 py-4 text-xs font-medium text-black transition hover:bg-[#68705A] hover:text-white w-fit"
              >
                Become a technician
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

