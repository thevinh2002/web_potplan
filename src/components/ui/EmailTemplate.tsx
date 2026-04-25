import * as React from "react";

export const NewsletterEmail: React.FC<Readonly<{ email: string }>> = ({
  email,
}) => (
  <div
    style={{ fontFamily: "Arial, sans-serif", padding: "20px", color: "#333" }}
  >
    <h2 style={{ color: "#8b6914" }}>🎉 Khách hàng mới đăng ký Newsletter!</h2>
    <p>Hệ thống vừa ghi nhận một email muốn nhận thông báo từ Xưởng Gốm.</p>
    <div
      style={{
        padding: "15px",
        backgroundColor: "#f9f9f9",
        borderRadius: "5px",
        marginTop: "15px",
      }}
    >
      <p>
        <strong>Email khách hàng:</strong>{" "}
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    </div>
  </div>
);
