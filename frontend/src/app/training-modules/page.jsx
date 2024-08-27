"use client";
import ProgressBar from "@/components/progressBar";
import { useRouter } from "next/navigation";
import { useState } from "react";

const modules = [
  {
    title: "Module 1: Personal Protective Equipment (PPE)",
    content: [
      "Importance of PPE: Explain the significance of PPE in preventing injuries and illnesses in the workplace.",
      "Types of PPE: Introduce various types of PPE, such as hard hats, safety glasses, gloves, earplugs, respirators, and steel-toed boots.",
      "Proper Use and Maintenance: Demonstrate how to properly use and maintain PPE, including inspection procedures and storage guidelines.",
    ],
    videoUrl:
      "https://res.cloudinary.com/dirycjaw2/video/upload/v1724673444/Video1_h2izdy.mp4",
    progress: 2,
  },
  {
    title: "Module 2: Fire Safety",
    content: [
      "Importance of Fire Safety: Learn the critical steps in preventing and responding to fires in the workplace.",
      "Fire Extinguishers: Understand the types of fire extinguishers and how to use them effectively.",
      "Emergency Evacuation: Plan and execute a safe evacuation during a fire emergency.",
    ],
    videoUrl:
      "https://res.cloudinary.com/dirycjaw2/video/upload/v1724688706/Video2_vcx37w.mp4", // Update with actual video link
    progress: 3,
  },
  {
    title: "Module 3: Slip, Trip, and Fall Prevention",
    content: [
      "Identify potential hazards that can lead to slips, trips, and falls, such as wet floors, uneven surfaces, loose cords, and cluttered walkways.",
      "Fire Extinguishers: Understand the types of fire extinguishers and how to use them effectively.",
      "Emergency Evacuation: Plan and execute a safe evacuation during a fire emergency.",
    ],
    videoUrl:
      "https://res.cloudinary.com/dirycjaw2/video/upload/v1724688720/Video3_sosh2z.mp4", // Update with actual video link
    progress: 4,
  },
  // Add more modules here
];

const Traininig = () => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const router = useRouter();

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  if (!token) {
    router.push("/Auth/Login");
  }

  const handleNextModule = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const handlePreviousModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            TRAINING MODULES
          </div>
          <nav className="hidden md:flex space-x-10">
            <a href="/" className="text-gray-800 hover:text-blue-600">
              Home
            </a>
            <a
              href="/training-modules"
              className="text-gray-800 hover:text-blue-600"
            >
              All Trainings Modules
            </a>
          </nav>
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/Auth/Login");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 lg:p-12 bg-white rounded-lg">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-9">
            {modules[currentModuleIndex].title}
          </h2>
          <ul className="space-y-4">
            {modules[currentModuleIndex].content.map((item, index) => (
              <li key={index}>
                <strong>{item.split(":")[0]}:</strong> {item.split(":")[1]}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col items-center">
          <ProgressBar
            progress={modules[currentModuleIndex].progress}
            total={8}
          />
          <iframe
            src={modules[currentModuleIndex].videoUrl}
            width={400}
            height={300}
            className="w-full lg:w-[400px] h-[200px] lg:h-[300px]"
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between p-6 lg:p-12 bg-white space-y-4 lg:space-y-0 lg:space-x-4">
        <button
          onClick={handlePreviousModule}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full lg:w-auto"
          disabled={currentModuleIndex === 0}
        >
          ← Previous Module
        </button>
        <button
          onClick={handleNextModule}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full lg:w-auto"
          disabled={currentModuleIndex === modules.length - 1}
        >
          Next Module →
        </button>
      </div>
    </>
  );
};

export default Traininig;
