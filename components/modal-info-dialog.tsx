import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Timeline from "./timeline";

interface ModalInfoDialogProps {
  show: boolean;
  onClose: () => void;
  metadata: any; // Dữ liệu metadata từ bài viết
}

export default function ModalInfoDialog({ show, onClose, metadata }: ModalInfoDialogProps) {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {metadata.type === "travel-route" ? "Travel Route" : "Gallery"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {metadata.type === "travel-route" ? (
          <Timeline data={metadata.data} />
        ) : metadata.type === "gallery" ? (
          <div className="grid grid-cols-2 gap-4">
            {metadata.data.map((img: any, index: number) => (
              <img
                key={index}
                src={img.url}
                alt={img.title}
                className="w-full h-auto rounded-md"
              />
            ))}
          </div>
        ) : (
          <p>No metadata available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
