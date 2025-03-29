import { motion } from "framer-motion";
import Timeline from "./timeline";
import React, { useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

interface ModalInfoDialogProps {
  show: boolean;
  onClose: () => void;
  metadata: any;
  locale: "en" | "vi";
}

export default function ModalInfoDialog({ show, onClose, metadata, locale }: ModalInfoDialogProps) {
  const { isOpen, onOpen, onClose: closeDrawer, onOpenChange } = useDisclosure();

  // Khi `show` thay đổi, tự động mở/đóng Drawer
  useEffect(() => {
    if (show) {
      onOpen();
    } else {
      closeDrawer();
    }
  }, [show, onOpen, closeDrawer]);

  // Lấy metadata dựa trên locale
  const metaCode = locale === "en"
    ? metadata?.metadata_en?.metadata_raw_en?.code || "{}"
    : metadata?.metadata_vi?.metadata_raw_vi?.code || "{}";

  const metaTitle = locale === "en" ? metadata?.meta_title_en : metadata?.meta_title_vi;
  const gallery = Array.isArray(metadata?.gallery_metadata) ? metadata.gallery_metadata : [];

  // Chuyển đổi string metaCode sang JSON
  let parsedData;
  try {
    parsedData = JSON.parse(metaCode);
  } catch (error) {
    parsedData = null;
    console.error("Invalid JSON format:", error);
  }

  return (
    <>
      {/* Drawer Component */}
      <Drawer isOpen={isOpen} size={metadata?.type === "route"? 'lg':'3xl'}
        backdrop="blur"
        motionProps={{
            variants: {
              enter: {
                opacity: 1,
                x: 0,
                transition: {duration: 0.2},
              },
              exit: {
                x: 100,
                opacity: 0,
                transition: {duration: 0.2},
              },
            },
          }}
          onOpenChange={onOpenChange}
      onClose={onClose} className='dark:border-y-2 dark:border-l-2 dark:border-[#ffe700]'>
        <DrawerContent>
          <>
            <DrawerHeader className="flex justify-between items-center">
              {/* <h2 className="text-xl font-bold"> */}
                {/* {metadata?.type === "route" ? "Travel Route" : "Gallery"} */}
                {metaTitle}
              {/* </h2> */}
              {/* <Button variant="light" color="danger" onPress={onClose}>✖</Button> */}
            </DrawerHeader>
            <DrawerBody>
              {metadata?.type === "route" ? (
                parsedData ? (
                  <Timeline data={parsedData} />
                ) : (
                  <p className="text-red-500">Invalid JSON data</p>
                )
              ) : metadata?.type === "gallery" ? (
                <div className="grid grid-cols-2 gap-4">
                  {gallery.length > 0 ? (
                    gallery.map((img: any, index: number) => (
                      <img
                        key={index}
                        src={img?.url}
                        alt={img?.title || "Gallery Image"}
                        className="w-full h-auto rounded-md"
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">No images available.</p>
                  )}
                </div>
              ) : (
                <p>No metadata available.</p>
              )}
            </DrawerBody>
            {/* <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </DrawerFooter> */}
          </>
        </DrawerContent>
      </Drawer>
    </>
  );
}
