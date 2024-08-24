const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const spinnerStyle = {
  width: "50px",
  height: "50px",
  border: "8px solid #f3f3f3",
  borderTop: "8px solid #3498db",
  borderRadius: "50%",
  animation: "spin 2s linear infinite",
};

const LoadingOverlay = () => (
  <div style={overlayStyle}>
    <div style={spinnerStyle}></div>
    <p style={{ color: "white", marginTop: "10px" }}>Loading...</p>
  </div>
);


export default LoadingOverlay