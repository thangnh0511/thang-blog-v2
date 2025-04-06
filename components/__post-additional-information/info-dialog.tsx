import { motion } from "framer-motion";
import Timeline from "./info-route-drawer";
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
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { TbPhotoCircle } from "react-icons/tb";
import Gallery from "@/components/gallery-drawer-content";

interface ModalInfoDialogProps {
    metadata: any;
    onClose: () => void;
    show: boolean;
    locale: "en" | "vi";
    type: "route" | "gallery" | null;
}

export default function InfoDialog({  
    metadata,
    onClose,
    show,
    locale,
    type, }: ModalInfoDialogProps) {
  const { isOpen, onOpen, onClose: closeDrawer, onOpenChange } = useDisclosure();

  // Khi `show` thay đổi, tự động mở/đóng Drawer
  useEffect(() => {
    if (show) {
      onOpen();
    } else {
      closeDrawer();
    }
  }, [show, onOpen, closeDrawer]);

  if (!show || !type) return null;

  // Check Metadata type
  const metaRouteTitle =
    locale === "en"
      ? (metadata?.route?.meta_title_en ?? "")
      : (metadata?.route?.meta_title_vi ?? "");
  const metaGalleryTitle =
    locale === "en"
      ? (metadata?.gallery?.meta_title_en ?? "")
      : (metadata?.gallery?.meta_title_vi ?? "");

  // Get metadata and gallery data
  const routeData =
  locale === "en"
    ? metadata?.route?.metadata_en?.metadata_raw_en?.code
    : metadata?.route?.metadata_vi?.metadata_raw_vi?.code;

const galleryData = metadata?.gallery?.gallery_metadata;



//   const metaTitle = locale === "en" ? metadata?.meta_title_en : metadata?.meta_title_vi;
//   const gallery = Array.isArray(metadata?.gallery_metadata) ? metadata.gallery_metadata : [];

    const metaTitle =
    type === "route"
        ? (locale === "en"
            ? metadata?.route?.meta_title_en
            : metadata?.route?.meta_title_vi)
        : (locale === "en"
            ? metadata?.gallery?.meta_title_en
            : metadata?.gallery?.meta_title_vi);
    // console.log(metaGallery)

  // Chuyển đổi string metaCode sang JSON
  let parsedData;
  try {
    parsedData = JSON.parse(routeData);
  } catch (error) {
    parsedData = null;
    console.error("Invalid JSON format:", error);
  }

  return (
    <>
      {/* Drawer Component */}
      <Drawer isOpen={isOpen} size={type === "route"? 'lg':'3xl'}
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
          <DrawerHeader className="flex justify-start items-center">
            {type === "route" ? (
                <LiaMapMarkedAltSolid className="text-2xl mr-2" />
            ) : (
                <TbPhotoCircle className="text-2xl mr-2" />
            )}
            {metaTitle}
            </DrawerHeader>
            <DrawerBody>
            {type === "route" && parsedData && (
                    <Timeline data={parsedData}/>
                )}
                {type === "gallery" && galleryData && (
                    <Gallery data={galleryData} locale={locale} />
                )}
            </DrawerBody>
            <DrawerFooter className='block lg:hidden'>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </>
        </DrawerContent>
      </Drawer>
    </>
  );
}
