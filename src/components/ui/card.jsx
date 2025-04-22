export function Card({ children }) {
    return (
      <div style={{ border: "1px solid #eee", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", marginTop: "1rem" }}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children }) {
    return (
      <div style={{ padding: "1rem" }}>
        {children}
      </div>
    );
  }
  