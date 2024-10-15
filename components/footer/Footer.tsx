import React from "react";

export default function Footer() {
  return (
    <div className="border-t">
      <footer className="max-w-5xl mx-auto">
        <div className="mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-4">About Festivall</h4>
              <p className="text-gray-600 text-xs">
                Discover and book tickets for the most exciting events and
                festivals near you.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li className="text-gray-600 hover:text-purple-600 text-xs">
                  <a href="#" className="">
                    FAQ
                  </a>
                </li>
                <li className="text-gray-600 hover:text-purple-600 text-xs">
                  <a href="#" className="">
                    Terms of Service
                  </a>
                </li>
                <li className="text-gray-600 hover:text-purple-600 text-xs">
                  <a href="#" className="">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 text-xs"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 text-xs"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 text-xs"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs">
            <p className="text-gray-600">
              &copy; 2023 Festivall. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
