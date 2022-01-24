import { toast } from "react-toastify";

const renderCustomNotification = (type, description, link, autoClose = true) =>
  toast[type](
    <>
      <p>{description}</p>
      <a
        style={{
          color: "darkgreen",
          textDecoration: "none",
        }}
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        {link}
      </a>
    </>,
    { autoClose, position: "top-center" }
  );

export default renderCustomNotification;
