import Offcanvas from "react-bootstrap/Offcanvas";

interface OffcanvasTemplateProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function OffcanvasTemplate({ show, onClose, title, children }: OffcanvasTemplateProps) {
  return (
    <Offcanvas show={show} onHide={onClose} placement="end" style={{ width: "600px" }}>
      <div className="text-xl font-bold text-primary-white bg-primary-black">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="font-bold font-raleway">{title}</Offcanvas.Title>
        </Offcanvas.Header>
      </div>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
}
