import React from "react";
import { FaCar, FaTrain, FaBus, FaBicycle, FaWalking } from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdFlightTakeoff, MdFlightLand, MdOutlineEmojiTransportation } from "react-icons/md";

interface TransportIconProps {
  type: string;
}

const TransportIcon: React.FC<TransportIconProps> = ({ type }) => {
  const transportType = type.toLowerCase();

  const renderIcon = () => {
    switch (transportType) {
      case "car":
      case "ô tô":
        return <FaCar size={16} />;
      case "train":
      case "tàu điện":
        return <FaTrain size={16} />;
      case "bus":
      case "xe bus":
        return <FaBus size={16} />;
      case "bicycle":
      case "xe đạp":
        return <FaBicycle size={16} />;
      case "takeoff":
      case "cất cánh":
        return <MdFlightTakeoff size={16} />;
      case "land":
      case "hạ cánh":
        return <MdFlightLand size={16} />;
      case "airplane":
      case "máy bay":
        return <GiCommercialAirplane size={28} />;
      case "walk":
      case "đi bộ":
        return <FaWalking size={16} />;
      default:
        return <MdOutlineEmojiTransportation size={16} />;
    }
  };

  return <div className="inline-block">{renderIcon()}</div>;
};

export default TransportIcon;
