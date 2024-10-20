"use client";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [cyberAttack, setCyberAttack] = useState("Shor Algorithm"); // Default attack type
  const [radar, setRadar] = useState({
    Security_Level: 9,
    Speed: 8,
    Key_Size: 7,
    Scalability: 8,
    Resource_Consumption: 7,
  });
  const [algorithm, setAlgorithm] = useState("AES(128bits)");
  const [encryptedText, setEncryptedText] = useState("");

  const setEncryptedTextValue = (value) => {
    setEncryptedText(value);
  };

  // Updated function to receive radar data from the API
  const sendDataToAPI = async (inputText, cyberAttack) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/data/", {
        text: inputText,
        attack: cyberAttack,
      });

      if (response.status !== 200) {
        throw new Error(
          `Failed to send data to the API. Status: ${response.status}, Message: ${response.statusText}`
        );
      }

      const encryptedTextValue = response.data.encrypted_text;

      setEncryptedTextValue(encryptedTextValue);

      const algorithmValue = response.data.algo;  

      setAlgorithm(algorithmValue);   

      // Extract radar data from API response (assuming it has this structure)
      const radarData = response.data.radarData;

      if (radarData) {
        // Update the radar state with the values from the API
        setRadar({
          Security_Level: radarData.Security_Level,
          Speed: radarData.Speed,
          Key_Size: radarData.Key_Size,
          Scalability: radarData.Scalability,
          Resource_Consumption: radarData.Resource_Consumption,
        });
      }

      return response.data;
    } catch (error) {
      console.error("API Error:", error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiResponse = await sendDataToAPI(text, cyberAttack);

    // Mock data for charts (can use apiResponse for real data)
    const mockData = {
      lineData: [
        { name: "Category A", value: 400 },
        { name: "Category B", value: 300 },
        { name: "Category C", value: 200 },
        { name: "Category D", value: 100 },
      ],
      verticalBarData: [
        { name: "AES(128bits)", NormalComputers: Math.pow(10, 21) / 1e20, SuperComputers: Math.pow(10, 12) / 1e11, QuantumComputers: 2.66 / 1e0 },
        { name: "AES(256bits)", NormalComputers: Math.pow(10, 77) / 1e76, SuperComputers: Math.pow(10, 60) / 1e59, QuantumComputers: Math.pow(10, 16) / 1e15 },
        { name: "Kyber(192bits)", NormalComputers: Math.pow(10, 57) / 1e56, SuperComputers: Math.pow(10, 50) / 1e49, QuantumComputers: Math.pow(10, 28) / 1e27 },
        { name: "McEliece(2048)", NormalComputers: Math.pow(10, 617) / 1e616, SuperComputers: Math.pow(10, 600) / 1e599, QuantumComputers: Math.pow(10, 11) / 1e10 },
      ],
      areaData: [
        { name: "January", value: 300 },
        { name: "February", value: 500 },
        { name: "March", value: 200 },
        { name: "April", value: 278 },
        { name: "May", value: 189 },
      ],
      radarData: [
        { algo: "Security Level", A: radar.Security_Level, B: 10, fullMark: 10 },
        { algo: "Speed", A: radar.Speed, B: 10, fullMark: 10 },
        { algo: "Key Size", A: radar.Key_Size, B: 10, fullMark: 10 },
        { algo: "Scalability", A: radar.Scalability, B: 10, fullMark: 10 },
        { algo: "Resource Consumption", A: radar.Resource_Consumption, B: 10, fullMark: 10 },
      ],
    };

    if (apiResponse) {
      // Optionally, use real data from API instead of mock data
      // Example: setChartData(apiResponse.chartData);
    }

    setChartData(mockData); // Use mock data
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quanta</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 mt-40">
        <div className="ml-auto mr-auto w-full max-w-md">
          <Label htmlFor="text-input">Enter Text To Encrypt</Label>
          <Input
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Text To Encrypt"
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Label htmlFor="attack-select">Select Attack Type</Label>
          <select
            id="attack-select"
            value={cyberAttack}
            onChange={(e) => setCyberAttack(e.target.value)}
            className="border rounded p-2"
          >
            <option value="Shor Algorithm">Shor Algorithm</option>
            <option value="Grover Algorithm">Grover Algorithm</option>
            <option value="Cryptoanalyzing">Cryptoanalyzing</option>
            <option value="Brute Force">Brute Force</option>
          </select>

          <Button type="submit" disabled={loading} className="mb-4 mt-4">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Simulate Attack"
            )}
          </Button>
        </div>
      </form>

      {chartData && (
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 mt-5">
          {/* Display entered text */}
          <div className="col-span-1 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Encryption/Decryption Text</CardTitle>
              </CardHeader>
              <CardContent>
                
              <div className="w-[100vw]">
              <p>{algorithm}</p> {/* Show algorithm here */}
                <hr />
                <br />
                <p className="">The encrypted text:</p>
                <p className="w-[min-content]">{encryptedText}</p>
              </div>
              </CardContent>
            </Card>
          </div>

          {/* Radar Chart */}
          <div className="w-full col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Radar Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={chartData.radarData}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="algo" />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} />
                    <Radar
                      name="Model Characteristics"
                      dataKey="A"
                      stroke="#000000"
                      fill="#000000"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Vertical Bar Chart */}
          <div className="col-span-2 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Vertical Bar Chart (Values are divided by 1e10 for readability)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    layout="vertical"
                    data={chartData.verticalBarData}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="NormalComputers" fill="#8884d8" />
                    <Bar dataKey="SuperComputers" fill="#82ca9d" />
                    <Bar dataKey="QuantumComputers" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Line Chart */}
          <div className="col-span-2 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Line Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData.lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Area Chart */}
          <div className="col-span-2 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Area Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData.areaData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
