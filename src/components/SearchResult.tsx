import { useState } from "react";
import type { SearchData } from "../types/types";

interface SearchResultProps {
  searchData: SearchData;
  onBack: () => void;
}

export default function SearchResult({
  searchData,
  onBack,
}: SearchResultProps) {
  const [isStopsOpen, setIsStopsOpen] = useState(false);

  const mockResultData = {
    date: "2026년 6월 7일 22:11 출발",
    routes: [
      {
        id: 1,
        departureTime: "22:13",
        arrivalTime: "22:26",
        duration: "13분",
        fare: 253,
        transferCount: 0,
        badges: ["최속", "편함"],
        isPassApplied: searchData.passId === "tokyo_subway_ticket_24",
        intermediateStops: [
          { time: "22:15", name: "칸다" },
          { time: "22:18", name: "오차노미즈" },
          { time: "22:22", name: "요츠야" },
        ],
      },
    ],
  };

  const route = mockResultData.routes[0];

  return (
    <div className="w-full max-w-md mx-auto bg-[#f2f2f2] font-sans pb-10 min-h-screen">
      {/* 조건 변경 */}
      <div className="bg-white p-2 border-b border-gray-300 flex items-center">
        <button
          onClick={onBack}
          className="text-[#1875d6] font-bold flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          조건 변경
        </button>
      </div>

      {/* 상단 헤더 */}
      <div className="bg-[#fef4c2] p-3 text-lg font-bold text-[#333] border-b border-[#e5dcae]">
        {searchData.origin} → {searchData.destination}
      </div>

      {/* 날짜 네비게이션 */}
      <div className="flex justify-between items-center bg-white p-2 text-sm border-b border-gray-300">
        <button className="bg-[#eb7d23] text-white px-3 py-1 rounded-l-full font-bold text-xs">
          ◀ 이전
        </button>
        <div className="font-bold text-[#333]">{mockResultData.date}</div>
        <button className="bg-[#eb7d23] text-white px-3 py-1 rounded-r-full font-bold text-xs">
          다음 ▶
        </button>
      </div>

      {/* 정렬 탭 */}
      <div className="grid grid-cols-3 bg-white text-xs font-bold text-center border-b border-gray-300">
        <div className="py-2 border-b-4 border-[#e11d48] text-[#e11d48]">
          최단 시간 순
        </div>
        <div className="py-2 border-b-4 border-transparent text-[#1875d6]">
          최소 환승 순
        </div>
        <div className="py-2 border-b-4 border-transparent text-[#eb7d23]">
          최소 금액 순
        </div>
      </div>

      {/* 상세 경로 카드 */}
      <div className="bg-white border-t border-b border-gray-300 mt-1 shadow-sm">
        <div className="p-3 border-b border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div className="fle items-center gap-2">
              <span className="bg-[#4caf50] text-white px-2 py-0.5 rounded font-bold text-sm">
                루트 1
              </span>
              <span className="text-lg font-bold">
                {route.departureTime}발 →{" "}
                <span className="text-[#eb7d23">{route.arrivalTime}</span>착
              </span>
            </div>
            <div className="text-right text-xs text-gray-500">
              환승 {route.transferCount}회 | 10.3km
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-[#e11d48] text-white text-[10px] px-1 rounded">
              최소 시간
            </span>
            <span className="bg-[#1875d6] text-white text-[10px] px-1 rounded">
              최소 환승
            </span>
            <span className="text-gray-500">■교통카드 우선:</span>
            {route.isPassApplied ? (
              <>
                <span className="line-through text-gray-400">253엔</span>
                <span className="font-bold text-green-600">
                  0엔 (패스 적용)
                </span>
              </>
            ) : (
              <span className="font-bold text-lg">{route.fare}엔</span>
            )}
          </div>
        </div>

        {/* 타임라인 */}
        <div className="p-0">
          {/* 출발역 */}
          <div className="flex bg-[#f2f6fa] border-b border-gray-200">
            <div className="w-14 flex items-center justify-center font-bold text-lg">
              {route.departureTime}
            </div>
            <div className="w-6 flex flex-col items-center">
              <div className="h-4 w-1 bg-transparent"></div>
              <div className="w-5 h-5 bg-gray-400 text-white text-[10px] flex items-center justify-center rounded">
                발
              </div>
              <div className="flex-1 w-1.5 bg-[#eb7d23]"></div>
            </div>
            <div className="flex-1 py-3 pr-3 pl-1 font-bold text-lg text-[#1875d6]">
              {searchData.origin}
            </div>
          </div>

          {/* 중간 노선 및 아코디언 */}
          <div className="flex bg-white relative">
            <div className="w-14 flex items-center justify-center py-6">
              <button
                onClick={() => setIsStopsOpen(!isStopsOpen)}
                className="w-8 h-8 rounded-full border border-gray-300 flex flex-col items-center justify-center text-[10px] text-gray-500 bg-white z-10 shadow-sm"
              >
                4역
              </button>
            </div>
            <div className="w-6 flex flex-col items-center">
              <div className="h-full w-1.5 bg-[#eb7d23]"></div>
            </div>
            <div className="flex-1 py-4 pr-3 pl-1">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold">🚃 JR 츄오선 쾌속</div>
                  <div className="text-xs text-gray-500 mt-1">
                    당역 시발 | 타카오 행
                  </div>
                </div>
                <div className="border border-gray-400 text-gray-600 text-xs px-1.5 py-0.5 rounded bg-white">
                  {route.isPassApplied ? "0엔" : `${route.fare}엔`}
                </div>
              </div>
            </div>
          </div>

          {/* 중간 역 리스트 */}
          {isStopsOpen &&
            route.intermediateStops.map((stop, idx) => (
              <div key={idx} className="flex bg-[#fbfbfb] relative">
                <div className="w-14 flex items-center justify-end pr-2 text-xs text-gray-500">
                  {stop.time}
                </div>
                <div className="w-6 flex flex-col items-center relative">
                  <div className="absolute top-0 bottom-0 w-1.5 bg-[#eb7d23]"></div>
                  <div className="w-2.5 h-2.5 bg-white border-2 border-gray-400 rounded-full z-10 my-2"></div>
                </div>
                <div className="flex-1 py-1 pr-3 pl-1 text-sm text-[#333]">
                  {stop.name}
                </div>
              </div>
            ))}

          {/* 도착역 */}
          <div className="flex bg-[#f2f6fa]">
            <div className="w-14 flex items-center justify-center font-bold text-lg">
              {route.arrivalTime}
            </div>
            <div className="w-6 flex flex-col items-center">
              <div className="h-3 w-1.5 bg-[#eb7d23]"></div>
              <div className="w-5 h-5 bg-gray-400 text-white text-[10px] flex items-center justify-center rounded">
                착
              </div>
              <div className="flex-1 w-1 bg-transparent"></div>
            </div>
            <div className="flex-1 py-2 pr-3 pl-1 font-bold text-lg text-[#1875d6]">
              {searchData.destination}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
