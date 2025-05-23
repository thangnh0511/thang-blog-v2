"use client";

import { useState } from "react";
import ModalInfoDialog from "@/components/modal-info-dialog";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { TbPhotoCircle } from "react-icons/tb";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@heroui/react";


export default function MetadataModal({
  metadata,
  locale,
}: {
  metadata: any;
  locale: any;
}) {
  const [showModal, setShowModal] = useState(false);

  // Get the correct metadata based on locale
  const metaCode =
    locale === "en"
      ? metadata?.metadata_en?.metadata_raw_en?.code
      : metadata?.metadata_vi?.metadata_raw_vi?.code;

  const metaTitle =
    locale === "en" ? metadata?.meta_title_en : metadata?.meta_title_vi;

  const metaType = metadata?.type;

  const handleShowModal = () => setShowModal(!showModal);

  return (
    <>
      {/* <div
        className="inline-block w-fit cursor-pointer"
        onClick={handleShowModal}
      >
        <div className="text-sm text-black dark:text-white flex flex-row font-raleway my-1 mb-4 shadow-md rounded-lg inline-block hover:shadow-lg py-2 px-3 cursor-pointer dark:border-2 dark:border-slate-200 dark:hover:text-[#ffe700] dark:hover:border-[#ffe700]">
          {metaType === "route" ? (
            <>
              <LiaMapMarkedAltSolid className="text-2xl mr-2" />
            </>
          ) : (
            <>
              <TbPhotoCircle className="text-2xl mr-2" />
            </>
          )}
          <div className="">
            <div className="text-lg font-bold">{metaTitle}</div>
            <div className="text-red-500 text-sm">
              {metaType === "route" ? (
                <>{locale === "en" ? "View Travel Route" : "Xem Lộ Trình"}</>
              ) : (
                <>{locale === "en" ? "My Photobook" : "Xem Hình ảnh"}</>
              )}
            </div>
          </div>
        </div>
      </div> */}

      <Card className='w-fit my-4 px-2 dark:border-2 dark:border-slate-200 dark:hover:text-[#ffe700] dark:bg-black dark:hover:border-[#ffe700]' isPressable onPress={handleShowModal}>
        <CardHeader className="flex gap-3">
        {metaType === "route" ? (
            <>
              <LiaMapMarkedAltSolid className="text-3xl mr-2" />
            </>
          ) : (
            <>
              <TbPhotoCircle className="text-3xl mr-2" />
            </>
          )}
          <div className='flex flex-col items-start'>
          <p className="text-tiny uppercase text-red-500 font-bold">{metaType === "route" ? (
                <>{locale === "en" ? "View Travel Route" : "Xem Lộ Trình"}</>
              ) : (
                <>{locale === "en" ? "My Photobook" : "Xem Hình ảnh"}</>
              )}</p>
          <h4 className=" font-medium text-large" style={{'textAlign': 'left'}}>{metaTitle}</h4> 
          </div>
          

        </CardHeader>
      </Card>

      {/* Show modal dạng offcanvas từ bên phải */}
      <ModalInfoDialog
        metadata={metadata}
        onClose={() => setShowModal(false)}
        show={showModal}
        locale={locale}
      />
    </>
  );
}