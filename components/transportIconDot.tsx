"use client";

import React from "react";
import { useTheme } from "next-themes";
import { FaCar, FaTrain, FaBus, FaBicycle, FaWalking } from "react-icons/fa";
import { GiCommercialAirplane, GiTank } from "react-icons/gi";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";

interface TransportIconDotProps {
  type: string;
}

const TransportIconDot: React.FC<TransportIconDotProps> = ({ type }) => {
  const { theme } = useTheme(); // Lấy theme hiện tại
  const iconColor = theme === "dark" ? "#ffe700": "#000000" ; // Trắng khi dark, đen khi light

  const transportType = type.toLowerCase();

  const renderIcon = () => {
    const iconProps = { size: 16, color: iconColor }; // Áp dụng màu vào icon

    switch (transportType) {
      case "car":
      case "ô tô":
        return <FaCar {...iconProps} />;
      case "train":
      case "tàu điện":
        return <FaTrain {...iconProps} />;
      case "bus":
      case "xe bus":
        return <FaBus {...iconProps} />;
      case "bicycle":
      case "xe đạp":
        return <FaBicycle {...iconProps} />;
      case "takeoff":
      case "cất cánh":
        return <MdFlightTakeoff {...iconProps} />;
      case "land":
      case "hạ cánh":
        return <MdFlightLand {...iconProps} />;
      case "airplane":
      case "máy bay":
        return <GiCommercialAirplane size={28} color={iconColor} />;
      case "walk":
      case "đi bộ":
        return <FaWalking {...iconProps} />;
      default:
        return <GiTank size={20} color={iconColor} />;
    }
  };

  return (
    <div
      className="absolute"
      style={{
        top: "2px",
        left: "0px",
        zIndex: 2,
      }}
    >
      {renderIcon()}
    </div>
  );
};

export default TransportIconDot;
