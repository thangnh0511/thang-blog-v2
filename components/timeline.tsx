import React from "react";
import { motion } from "framer-motion";
import "../assets/timeline.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import TransportIcon from "./transportIcon";
import TransportIconDot from "./transportIconDot";

interface Event {
  Time: string;
  Location: string;
  Map?: string;
  Move?: string;
  Description?: string;
}

interface TimelineProps {
  data: Record<string, Event[]>; // Mỗi key là "Ngày X", value là mảng sự kiện
}

const Timeline: React.FC<TimelineProps> = ({ data }) => {
  // Animation variants for Framer Motion
  const eventVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 100 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } },
  };

  // Style variants for time and location color change
  const textColorVariants = {
    hidden: { color: "#6b7280" },
    visible: { color: "#0e9f6e", transition: { duration: 0.6 } },
  };

  // Function to extract the day number from the day title
  const extractDayNumber = (title: string): number => {
    const match = title.match(/Ngày (\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Sort the day titles based on the extracted day number
  const sortedDays = Object.keys(data).sort((a, b) => extractDayNumber(a) - extractDayNumber(b));

  return (
    <div className="timeline-container snap-start">
      {sortedDays.map((dayTitle, index) => (
        <div className="snap-y timeline-day font-raleway" key={index}>
          <h2
            className="day-title font-montserrat inline-block py-2 text-base lg:text-lg px-3 rounded-xl bg-primary-black text-primary-white shadow-md sticky-top"
            style={{
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginRight: "0",
            }}
          >
            {dayTitle}
          </h2>
          {data[dayTitle].map((event, eventIndex) => (
            <motion.div
              className="snap-start timeline-event font-montserrat"
              key={eventIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.99 }}
              variants={eventVariants}
              exit="exit"
              style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
            >
              {/* Time with color change on scroll */}
              {event.Move && <TransportIconDot type={event.Move} />}
              <motion.div className="event-time font-montserrat text-slate-800 text-md">
                {event.Time}
              </motion.div>

              {/* Location with color change on scroll */}
              <div className="event-details">
                <motion.h3 className="event-location font-montserrat" variants={textColorVariants}>
                  {event.Location}
                </motion.h3>

                {event.Map && (
                  <a
                    href={event.Map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-map inline-block text-slate-800 hover:text-red-500"
                  >
                    <FaMapMarkerAlt /> View on Map
                  </a>
                )}

                {event.Description && <div className="event-description">{event.Description}</div>}
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
