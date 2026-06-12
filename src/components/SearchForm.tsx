import { useState } from "react";
import type { SearchData } from "../types/types";

interface SearchFormProps {
  onSubmit: (data: SearchData) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [origin, setOrigin] = useState("도쿄");
  const [destination, setDestination] = useState("신주쿠");
  const [passId, setPassId] = useState("tokyo_subway_ticket_24");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit({ origin, destination, passId });
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-start justify-center pt-8 font-sans pb-10 px-3">
      <div className="w-full max-w-[390px] bg-white rounded-xl shadow-[0_4px_16px_rgba(0, 0, 0, 0.1)] overflow-hidden">
        <div className="bg-[#1875d6] p-3 text-white font-bold text-center tracking-wide text-lg border-b border-white/20">
          일본 교통비 & 패스 계산기
        </div>
        <form className="p-4 space-y-5" onSubmit={handleSubmit}>
          {/* 출발/도착 입력부 */}
          <div className="relative border border-gray-200 rounded-lg p-3 bg-[#fbfbfb]">
            <div className="space-y-1.5 pr-14">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#1875d6] w-8 text-center bg-blue-50 px-1 py-0.5 rounded">
                  출발
                </span>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-2.5 focus:ring-1 focus:ring-[#1875d6] focus:outline-none bg-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#e11d48] w-8 text-center bg-red-50 px-1 py-0.5 rounded">
                  도착
                </span>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-2.5 focus:ring-1 focus:ring-[#1875d6] focus:outline-none bg-white"
                />
              </div>
            </div>
          </div>

          {/* 이용 수단 */}
          <div className="bg-[#fbfbfb] border border-gray-200 rounded-lg p-3">
            <label className="block text-sm font-bold text-gray-700 mb-4 border-l-3 border-[#1875d6] pl-2">
              이용 수단
            </label>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-sm">
              <label className="flex items-center space-x-2 cursor-pointer p-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-[#1875d6]"
                />
                <span className="text-gray-700 font-medium">신칸센</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer p-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-[#1875d6]"
                />
                <span className="text-gray-700 font-medium">특급열차</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer p-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-[#1875d6]"
                />
                <span className="text-gray-700 font-medium">고속버스</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer p-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-[#1875d6]"
                />
                <span className="text-gray-700 font-medium">노선버스</span>
              </label>
            </div>
          </div>

          {/* 패스권 선택 */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 border-l-3 border-[#1875d6] pl-2">
              적용할 패스권
            </label>
            <select
              value={passId}
              onChange={(e) => setPassId(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-1 focus:ring-[#1875d6] focus:outline-none text-sm font-medium"
            >
              <option value="tokyo_subway_ticket_24">
                도쿄 서브웨이 티켓 (24시간)
              </option>
              <option value="jr_tokyo_wide">JR 도쿄 와이드 패스</option>
              <option value="kansai_railway">간사이 레일웨이 패스</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#009944] text-white font-black py-4 px-4 rounded-xl hover:bg-[#00883d] transition duration-200 text-xl shadow-[0_4px_0_#007a37] active:translate-y-0.5 active:shadow=[0_2px_0_#007a37] mt-3"
          >
            경로 검색
          </button>
        </form>
      </div>
    </div>
  );
}
