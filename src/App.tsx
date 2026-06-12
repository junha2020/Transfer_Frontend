import { useState } from "react";
import SearchResult from "./components/SearchResult";
import SearchForm from "./components/SearchForm";
import type { SearchData } from "../src/types/types";
import axios from "axios";

interface RouteResponseData {
  date: string;
  routes: Array<{
    id: number;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    fare: number;
    transferCount: number;
    badges: string[];
    isPassApplied: boolean;
    intermediateStops: Array<{ time: string; name: string }>;
  }>;
}

export default function App() {
  const [view, setView] = useState<"form" | "result">("form");
  const [searchData, setSearchData] = useState<SearchData>({
    origin: "",
    destination: "",
    passId: "",
  });
  const [apiResult, setApiResult] = useState<RouteResponseData | null>(null);

  const handleSearchSubmit = async (data: SearchData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/routes/calculate",
        data,
      );
      setSearchData(data);
      setApiResult(response.data);
      setView("result");
    } catch (error) {
      console.error(error);
      alert("서버가 꺼져있습니다.");
    }
  };

  return (
    <>
      {view === "form" && <SearchForm onSubmit={handleSearchSubmit} />}
      {view === "result" && (
        <SearchResult searchData={searchData} onBack={() => setView("form")} />
      )}
    </>
  );
}
