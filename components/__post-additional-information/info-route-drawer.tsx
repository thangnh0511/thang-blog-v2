"use client";

import React from "react";
import { motion } from "framer-motion";
import "@/components/_asset/timeline.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import TransportIconDot from "@/components/transportIconDot";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";

// Define types for props and data structure
interface EventData {
  Time?: string;
  Move?: string;
  Location?: string;
  Map?: string;
  Description?: string;
}

interface DataObject {
  [day: string]: EventData[];
}

interface TimelineProps {
  data: DataObject;
}

// Animation variants for Framer Motion
const eventVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: "spring", stiffness: 100 },
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.6 } },
};

// const textColorVariants = {
//   hidden: { color: "#6b7280" },
//   visible: { color: "#ffe700", transition: { duration: 0.6 } },
// };

// Extract day number from the title
const extractDayNumber = (title: string): number => {
  const match = title.match(/Ngày (\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

const Timeline: React.FC<TimelineProps> = ({ data }) => {
  console.log("Data received in Timeline:", typeof data, data);

  // Kiểm tra nếu `data` không phải là object hợp lệ
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    console.error("Invalid data format in Timeline:", data);
    return <p className="text-red-500">Invalid data format</p>;
  }

  // Sort days by their extracted numbers
  const sortedDays = Object.keys(data).sort(
    (a, b) => extractDayNumber(a) - extractDayNumber(b)
  );

  return (
    <div className="timeline-container snap-start">
      {sortedDays.map((day_title) => {
        const events = data[day_title] ?? []; // Đảm bảo luôn là array

        return (
          <div className="snap-y timeline-day font-montserrat" key={day_title}>
            <h2
              className="day-title font-mono inline-block py-2 text-base lg:text-lg px-3 rounded-xl bg-black text-white dark:bg-[#1e1e1e] dark:text-[#ffe700] dark:border-2 dark:border-[#ffe700] shadow-md sticky top-0 z-10"
              style={{
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginRight: "0",
              }}
            >
              {day_title}
            </h2>

            {events.length > 0 ? (
              events.map((event, eventIndex) => (
                <motion.div
                  className="snap-start timeline-event font-montserrat"
                  key={`${day_title}-${eventIndex}`} // Unique key
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.99 }}
                  variants={eventVariants}
                  exit="exit"
                  style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
                >
                  {/* ✅ Fix: Nếu event?.Move không có giá trị, sẽ truyền "default" */}
                  <TransportIconDot type={event?.Move ?? "default"} />

                  <motion.div className="event-time font-montserrat text-black dark:text-white text-md">
                    {event?.Time}
                  </motion.div>

                  <div
                  // className="event-details"
                  >
                    <Card isHoverable isFooterBlurred className="z-0">
                      <CardHeader className="">
                        {event?.Map ? (
                          <a
                            href={event.Map}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="event-map inline-block text-red-500 dark:text-red-500 items-center"
                          >
                            <FaMapMarkerAlt />
                            <motion.div
                              className="event-location text-xl text-red-500 dark:text-[#ffe700]"
                              //   variants={textColorVariants}
                            >
                              {event?.Location}
                            </motion.div>
                          </a>
                        ) : (
                          <motion.div
                            className="event-location text-xl text-black dark:text-[#ffe700]"
                            // variants={textColorVariants}
                          >
                            {event?.Location}
                          </motion.div>
                        )}
                      </CardHeader>

                      {event?.Description && (
                        <CardBody className='pt-0'>
                          <div className="event-description">
                            {event.Description}
                          </div>
                        </CardBody>
                      )}
                    </Card>
                    {/* {event?.Map ? (
                      <a
                        href={event.Map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="event-map inline-block text-slate-800 dark:text-red-500 items-center"
                      >
                        <FaMapMarkerAlt />
                        <motion.div
                          className="event-location text-xl text-black dark:text-[#ffe700]"
                          //   variants={textColorVariants}
                        >
                          {event?.Location}
                        </motion.div>
                      </a>
                    ) : (
                      <motion.div
                        className="event-location text-xl text-black dark:text-[#ffe700]"
                        // variants={textColorVariants}
                      >
                        {event?.Location}
                      </motion.div>
                    )}
                    {event?.Description && (
                      <div className="event-description">
                        {event.Description}
                      </div>
                    )} */}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No events available for this day.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
