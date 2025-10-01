"use client";
import Image from "next/image";
import Link from "next/link";
import { useGetUser } from "./grapqhl/action";

export default function Footer({
  data,
}: {
  data: { logo: string; name: string };
}) {
  const { data: { getUser } = {}, loading } = useGetUser();
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r rounded-lg flex items-center justify-center">
                {data.logo && (
                  <Image
                    src={`https://cdn.thrico.network/${data.logo}`}
                    alt={`${data.name} logo`}
                    width={32}
                    height={32}
                    className="w-10 h-10 rounded-lg object-contain"
                    priority
                  />
                )}
              </div>
              <span className="text-xl font-bold">{data.name}</span>
            </div>
            <p className="text-gray-400 mb-4">
              Building meaningful professional communities, one connection at a
              time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Groups
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Members
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Thrico. All rights reserved. | Powered
            by{" "}
            <Link href="https://thrico.com" target="_blank">
              {" "}
              <span className="text-blue-400 font-semibold">Thrico</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
