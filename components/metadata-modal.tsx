"use client";

import { useState } from "react";
import ModalInfoDialog from "@/components/modal-info-dialog";
import { FaMap } from "react-icons/fa";

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

  const handleShowModal = () => setShowModal(!showModal);

  return (
    <>
      <div
        className="inline-block w-fit cursor-pointer"
        onClick={handleShowModal}
      >
        <div className="text-sm text-black dark:text-white flex flex-row font-raleway my-1 mb-4 shadow-md rounded-lg inline-block hover:shadow-lg py-2 px-3 cursor-pointer dark:border-2 dark:border-slate-200 dark:hover:text-[#ffe700] dark:hover:border-[#ffe700]">
          <FaMap className="text-2xl mr-2" />
          <div className="">
            <div className="text-lg font-bold">{metaTitle}</div>

            <div className="text-red-500 text-sm">
              {locale === "en" ? "View Travel Route" : "Xem Lộ Trình"}
            </div>
          </div>
        </div>
      </div>

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
