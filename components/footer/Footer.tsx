import React from "react";

export default function Footer() {
  return (
    <div className="border-t mt-32">
      <footer className="max-w-5xl mx-auto">
        <div className="mx-auto px-5 lg:px-8 py-12">
          <div>
            <div className="flex justify-between">
              <h5 className="text-base font-semibold mb-4">Festivall</h5>
              <div className="flex space-x-4">
                <div className="text-gray-600 hover:text-purple-600 text-sm">
                  <a href="#" className="">
                    서비스 소개
                  </a>
                </div>
                <div className="text-gray-600 hover:text-purple-600 text-sm">
                  <a href="docs/terms" className="">
                    이용약관
                  </a>
                </div>
                <div className="text-gray-600 hover:text-purple-600 text-sm">
                  <a href="docs/privacy" className="">
                    개인정보 처리방침
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2 mt-8 text-gray-500 text-xs flex flex-wrap place-content-stretch gap-x-4 gap-y-2 font-light">
              <p>페스티볼</p>
              <p>대표 심영보</p>
              <p>서울특별시 마포구 와우산로 105, 5층-J20호(서교동)</p>
              <p>대표전화: </p>
              <p>이메일: festivall.my@gmail.com</p>
              <p>사업자등록번호: 408-29-15218</p>
              <p>통신판매업신고:</p>
            </div>
            <div></div>
          </div>

          {/* <div>
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
            </div> */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs">
            <p className="text-gray-600 text-xxs">
              &copy; 2024 Festivall. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
