import { Link } from 'react-router-dom';
import {
  HiOutlineBriefcase,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Product: [
    { label: 'Browse Jobs', href: '/jobs' },
    { label: 'Saved Jobs', href: '/saved' },
    { label: 'Post a Job', href: '#' },
    { label: 'Pricing', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <HiOutlineBriefcase className="text-white text-xl" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-indigo-400">Job</span>
                <span className="text-white">Sphere</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Your modern job board connecting talented professionals with world-class opportunities.
            </p>
            {/* Contact info */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <HiOutlineMail className="shrink-0 text-indigo-400" />
                hello@jobsphere.io
              </li>
              <li className="flex items-center gap-2">
                <HiOutlinePhone className="shrink-0 text-indigo-400" />
                +1 (555) 000-1234
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineLocationMarker className="shrink-0 text-indigo-400" />
                San Francisco, CA
              </li>
            </ul>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white font-semibold mb-4">{group}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-indigo-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-700/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} JobSphere. All rights reserved.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-4">
            {[
              { Icon: FaGithub, href: '#', label: 'GitHub' },
              { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
              { Icon: FaTwitter, href: '#', label: 'Twitter' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
