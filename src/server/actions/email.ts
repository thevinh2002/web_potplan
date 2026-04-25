"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeNewsletter(email: string) {
  if (!email) return { success: false, error: "Vui lòng nhập email" };

  try {
    const { data, error } = await resend.emails.send({
      from: "Xưởng Gốm Newsletter <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO || "hatran12387@gmail.com"],
      subject: "🎉 Có người đăng ký nhận bản tin mới",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #8b6914;">🎉 Khách hàng mới đăng ký Newsletter!</h2>
          <p>Hệ thống vừa ghi nhận một email muốn nhận thông báo từ Xưởng Gốm.</p>
          <div style="padding: 15px; background-color: #f9f9f9; border-radius: 5px; margin-top: 15px;">
            <p><strong>Email khách hàng:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Lỗi Resend:", error);
      return { success: false, error: "Không thể gửi email lúc này." };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Lỗi Server:", error);
    return { success: false, error: "Đã có lỗi hệ thống xảy ra." };
  }
}
