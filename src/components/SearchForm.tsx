import { useState } from "react";
import type { SearchData } from "../types/types";

export default function SearchForm({
  initialData,
  onSubmit,
  isLoading,
}: {
  initialData: SearchData;
  onSubmit: (data: SearchData) => void;
  isLoading: boolean;
}) {
  const [origin, setOrigin] = useState("도쿄");
  const [destination, setDestination] = useState("신주쿠");
  const [passId, setPassId] = useState("tokyo_subway_ticket_24");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!origin || !destination) {
      alert("출발역과 도착역을 다시 확인해주세요");
      return;
    }
    onSubmit({ origin, destination, passId });
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans text-[#333]">
      <div className="max-w-[800px] mx-auto">
        {/* 헤더 */}
        <div className="flex items-end gap-2 mb-2 border-b-[3px] border-[#377b38] pb-1">
          <svg
            className="w-9 h-9 text-[#377b38] mb-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8 2 4 2.5 4 6v9.5c0 .9.7 1.5 1.5 1.5H6v2c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-2h4v2c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-2h.5c.8 0 1.5-.6 1.5-1.5V6c0-3.5-4-4-8-4zm0 2c3.5 0 6 .5 6 2v2H6V6c0-1.5 2.5-2 6-2zm-4.5 9.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm9 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
          </svg>
          <h1 className="text-3xl font-bold text-[#377b38] tracking-tight">
            안내
          </h1>
        </div>
        {/* 메인 컨테이너 */}
        <div className="bg-[#f2f2f2] p-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* 출발 / 도착 */}
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex w-full md:w-[46%] bg-white border border-gray-300">
                <div className="bg-[#539755] text-white px-4 py-2 font-bold flex items-center justify-center whitespace-nowrap text-lg">
                  출발
                </div>
                <input
                  type="text"
                  className="flex-1 p-2 outline-none text-lg"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>
              <div className="text-gray-500 font-bold text-2xl px-1 hidden md:block">
                ⇄
              </div>
              <div className="flex w-full md:w-[46%] bg-white border border-gray-300">
                <div className="bg-[#539755] text-white px-4 py-2 font-bold flex items-center justify-center whitespace-nowrap text-lg">
                  도착
                </div>
                <input
                  type="text"
                  className="flex-1 p-2 outline-none text-lg"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="역, 버스 정류장, 주소, 시설"
                />
              </div>
            </div>

            {/* 경유 */}
            <div className="flex justify-center">
              <div className="flex w-full md:w-[60%] bg-white border border-gray-300">
                <div className="bg-[#b2d4b2] text-[#333] px-3 py-1 font-medium flex items-center justify-center whitespace-nowrap">
                  경유1
                </div>
                <input
                  type="text"
                  className="w-full p-1.5 outline-none"
                  placeholder="역, 버스 정류장"
                />
                <button
                  type="button"
                  className="bg-[#f0f0f0] border-l border-gray-300 px-3 hover:bg-gray-300 text-lg font-bold text-gray-600 transition"
                >
                  +
                </button>
              </div>
            </div>

            <hr className="border-t border-[#dcdcdc]" />

            {/* 일시 */}
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="bg-[#dcdcdc] px-4 py-1 font-bold w-full md:w-[80px] text-center whitespace-nowrap mt-1 flex items-center justify-center relative">
                일시
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#dcdcdc] hidden md:block"></div>
              </div>
              <div className="space-y-2 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <select className="border border-gray-400 p-1 bg-white outline-none text-sm">
                    <option>2026년</option>
                  </select>
                  <select className="border border-gray-400 p-1 bg-white outline-none text-sm">
                    <option>6월</option>
                  </select>
                  <select className="border border-gray-400 p-1 bg-white outline-none text-sm">
                    <option>12일</option>
                  </select>
                  <span
                    className="text-xl mx-1 cursor-pointer"
                    title="캘린더에서 등록"
                  >
                    📅
                  </span>
                  <select className="border border-gray-400 p-1 bg-white outline-none text-sm">
                    <option>22시</option>
                  </select>
                  <select className="border border-gray-400 p-1 bg-white outline-none text-sm">
                    <option>11분</option>
                  </select>
                </div>
                <div className="flex flex-wrap gap-4 text-sm mt-2">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="timeType"
                      defaultChecked
                      className="text-blue-600 w-4 h-4"
                    />{" "}
                    출발
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="timeType" className="w-4 h-4" />{" "}
                    도착
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="timeType" className="w-4 h-4" />{" "}
                    첫차
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="timeType" className="w-4 h-4" />{" "}
                    막차
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="timeType" className="w-4 h-4" />{" "}
                    지정 없음
                  </label>
                </div>
              </div>
            </div>

            <hr className="border-t border-[#dcdcdc]" />

            {/* 운임 조건 */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-[#dcdcdc] px-4 py-1 font-bold w-full md:w-[80px] text-center whitespace-nowrap relative">
                  운임
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#dcdcdc] hidden md:block"></div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    종별
                    <select className="border border-gray-400 p-1 bg-white outline-none">
                      <option>교통카드 우선</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-2">
                    좌석
                    <select className="border border-gray-400 p-1 bg-white outline-none">
                      <option>자유석 우선</option>
                    </select>
                  </label>
                </div>
              </div>

              <hr className="border-t border-[#dcdcdc]" />

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-[#dcdcdc] px-4 py-1 font-bold w-full md:w-[80px] text-center whitespace-nowrap relative">
                  조건
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#dcdcdc] hidden md:block"></div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <label className="flex items-center gap-2 text-[#1875d6] hover:underline cursor-pointer">
                    걷는 속도※
                  </label>
                  <select className="border border-gray-400 p-1 bg-white outline-none">
                    <option>조금 빠르게</option>
                  </select>
                  <label className="flex items-center gap-2 md:ml-4">
                    표시 순서
                    <select className="border border-gray-400 p-1 bg-white outline-none">
                      <option>도착이 빠른 순</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <hr className="border-t border-[#dcdcdc]" />

            {/* 수단 */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-[#dcdcdc] px-4 py-1 font-bold w-full md:w-[80px] text-center whitespace-nowrap relative">
                수단
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#dcdcdc] hidden md:block"></div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5" /> 신칸센
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5" /> 특급열차
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5" /> 고속버스
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5" /> 노선버스
                </label>
              </div>
            </div>

            <hr className="border-t border-[#dcdcdc]" />

            {/* 패스권 선택 */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-[#e8f0fe] -mx-4 px-4 py-2 border-y border-[#bbd4f7]">
              <div className="bg-[#1875d6] text-white px-4 py-1 font-bold w-full md:w-[80px] text-center whitespace-nowrap rounded relative">
                패스
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#1875d6] hidden md:block"></div>
              </div>
              <div className="flex items-center gap-4 text-sm w-full">
                <select
                  value={passId}
                  onChange={(e) => setPassId(e.target.value)}
                  className="border border-gray-400 p-1.5 bg-white outline-none flex-1 max-w-[300px] font-medium"
                >
                  <option value="none">적용 안함</option>
                  <option value="tokyo_subway_ticket_24">
                    도쿄 지하철 티켓 (24시간)
                  </option>
                  <option value="jr_tokyo_wide">JR 도쿄 와이드 패스</option>
                  <option value="kansai_railway">간사이 레일웨이 패스</option>
                </select>
                <span className="text-xs text-gray-500 hidden md:inline">
                  ※ 선택한 패스의 구역은 0엔으로 계산됩니다.
                </span>
              </div>
            </div>

            {/* 검색 버튼 */}
            <div className="pt-2 flex justify-center pb-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#eb7d23] hover:bg-[#d66a15] text-white font-bold text-2xl py-2 px-16 md:px-32 shadow-[0_3px_0_#b55b14] active:translate-y-[3px] active:shadow-none transition-all"
              >
                {isLoading ? "검색중..." : "검색"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
