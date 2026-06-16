import { useState } from "react";
import type { SearchData } from "../types/types";

export default function SearchResult({
  searchData,
  apiResult,
  onBack,
}: {
  searchData: SearchData;
  apiResult: any;
  onBack: () => void;
}) {
  const [isStopsOpen, setIsStopsOpen] = useState(false);

  // 데이터 방어 로직
  if (!apiResult || !apiResult.routes || apiResult.routes.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-[#f2f2f2] font-sans pb-10 min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-gray-600 font-bold mb-4 text-center">
          검색된 경로가 없습니다. <br />
          (서버 통신 상태를 확인해주세요.)
        </p>
        <button
          onClick={onBack}
          className="bg=[#1875d6] text-white px-4 py-2 rounded font-bold shadow"
        >
          조건을 변경해서 검색
        </button>
      </div>
    );
  }

  // 구글 데이터 까보기
  const route = apiResult.routes[0];
  const leg = route.leg[0];

  const depatruteTime = leg.departure_time?.text || "??:??";
  const arrivalTime = leg.arrival_time?.text || "??:??";
  const originalFare = route.fare ? route.fare.text : "0엔";

  // 패스권 적용 여부
  const isPassApplied =
    searchData.passId !== "none" && searchData.passId !== "";

  // 환승 스텝 필터링
  const transitSteps =
    leg.steps?.filter((s: any) => s.travel_mode === "TRANSIT") || [];
  const transferCount = transitSteps.length > 1 ? transitSteps.length - 1 : 0;

  // 노선 정보 추출
  const firstTransit = transitSteps[0]?.transit_details;
  const lineName = firstTransit?.line?.name || "노선 정보 없음";
  const numStops = firstTransit?.num_stops || 0;

  // 날짜 포맷
  const today = new Date();
  const dateString = `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, "0")}월 ${String(today.getDate()).padStart(2, "0")}일 출발`;

  return (
    <div className="min-h-screen bg-white p-0 md:p-8 font-sans text-[#333]">
      <div className="max-w-[800px] mx-auto bg-[#f2f2f2] border border-[#dcdcdc] min-h-[500px]">
        {/* 뒤로 가기 */}
        <div className="bg-[#e8f0fe] p-2 flex items-center justify-between border-b border-[#bbd4f7]">
          <span className="font-bold text-[#1875d6] ml-2">
            {searchData.origin}{" "}
            <span className="text-gray-400 font-normal">→</span>{" "}
            {searchData.destination}
          </span>
          <button
            onClick={onBack}
            className="text-[#1875d6] font-bold flex items-center gap-1 hover:bg-blue-100 px-3 py-1 rounded text-sm border border-[#1875d6] bg-white transition"
          >
            조건을 변경해서 재검색
          </button>
        </div>

        <div className="flex justify-between items-center bg-white p-2 text-sm border-b border-gray-300">
          <button className="bg-[#eb7d23] text-white px-3 py-1 rounded-l-full font-bold text-xs shadow-sm hover:bg-[#d66a15]">
            ◀ 1개 전
          </button>
          <div className="font-bold text-[#333] text-base">{dateString}</div>
          <button className="bg-[#eb7d23] text-white px-3 py-1 rounded-r-full font-bold text-xs shadow-sm hover:bg-[#d66a15]">
            1개 뒤 ▶
          </button>
        </div>

        <div className="grid grid-cols-3 bg-white text-sm font-bold text-center border-b border-gray-300">
          <div className="py-2.5 border-b-4 border-[#e11d48] text-[#e11d48] bg-red-50">
            도착이 빠른 순
          </div>
          <div className="py-2.5 border-b-4 border-transparent text-[#1875d6] hover:bg-gray-50 cursor-pointer">
            환승이 적은 순
          </div>
          <div className="py-2.5 border-b-4 border-transparent text-[#eb7d23] hover:bg-gray-50 cursor-pointer">
            요금이 저렴한 순
          </div>
        </div>

        <div className="bg-white border-b border-gray-300 shadow-sm mt-3 mx-2 md:mx-4 border-t">
          {/* 요약 헤더 */}
          <div className="p-3 border-b border-gray-200 bg-[#f9f9f9]">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#539755] text-white px-2 py-0.5 font-bold text-sm">
                  루트 1
                </span>
                <span className="text-xl font-bold">
                  {depatruteTime}{" "}
                  <span className="text-gray-400 font-normal text-sm">→</span>{" "}
                  <span className="text-[#eb7d23]">{arrivalTime}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
