import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          margin: 0,
        }}
      >
        404
      </h1>

      <p>The requested page could not be found.</p>

      <Link to="/">Back to Workflow Editor</Link>
    </div>
  );
}
