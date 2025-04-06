"use client";

import { useState, useEffect } from "react";
import InfoDialog from "./info-dialog";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { TbPhotoCircle } from "react-icons/tb";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";
import { Tooltip, Button } from "@heroui/react";



function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 1024);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);
  
    return isMobile;
  }

export default function MetadataModal({
  metadata,
  locale,
}: {
  metadata: any;
  locale: any;
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"route" | "gallery" | null>(null);

  const isMobile = useIsMobile();

  // Check Metadata type
  const metaRouteTitle =
    locale === "en"
      ? (metadata?.route?.meta_title_en ?? "")
      : (metadata?.route?.meta_title_vi ?? "");
  const metaGalleryTitle =
    locale === "en"
      ? (metadata?.gallery?.meta_title_en ?? "")
      : (metadata?.gallery?.meta_title_vi ?? "");


    const handleShowModal = (type: "route" | "gallery") => {
    setModalType(type);
    setShowModal(true);
    };
  console.log(metadata)

  return (
    <>
      <div className="flex gap-2">
        {metaRouteTitle && metaRouteTitle.trim() !== "" && (
          <Tooltip
            content={
              <>
                <div className="flex flex-col items-start">
                  <p className="text-tiny uppercase text-red-500 font-bold">
                    {locale === "en" ? "View Travel Route" : "Xem Lộ Trình"}
                  </p>
                  <h4
                    className=" font-medium text-large"
                    style={{ textAlign: "left" }}
                  >
                    {metaRouteTitle}
                  </h4>
                </div>
              </>
            }
          >
            <Button
              radius="md"
              items-center
              isIconOnly={isMobile}
              onPress={() => handleShowModal("route")}
              color="success"
            >
              <LiaMapMarkedAltSolid className="text-3xl" />
              {!isMobile && <div className="hidden lg:block">Route</div>}
            </Button>
          </Tooltip>
        )}
        {metaGalleryTitle && metaGalleryTitle.trim() !== "" && (
          <Tooltip
            content={
              <>
                <div className="flex flex-col items-start">
                  <p className="text-tiny uppercase text-red-500 font-bold">
                    {locale === "en" ? "My Photobook" : "Xem Hình ảnh"}
                  </p>
                  <h4
                    className=" font-medium text-large"
                    style={{ textAlign: "left" }}
                  >
                    {metaGalleryTitle}
                  </h4>
                </div>
              </>
            }
          >
            <Button
              radius="md"
              items-center
              isIconOnly={isMobile}
              onPress={() => handleShowModal("gallery")}
              color="danger"
            >
              <TbPhotoCircle className="text-3xl" />
              {!isMobile && <div className="hidden lg:block">Photos</div>}
            </Button>
          </Tooltip>
        )}
      </div>

      {/* Show modal dạng offcanvas từ bên phải */}
      <InfoDialog
         metadata={metadata}
         onClose={() => setShowModal(false)}
         show={showModal}
         locale={locale}
         type={modalType}
      />
    </>
  );
}
