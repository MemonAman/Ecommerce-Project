import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import HeaderAndCart from "@/components/HeaderAndCart";
import PageTransition from "@/components/PageTransition";
import ShopLayoutWrapper from "@/components/ShopLayoutWrapper";

export const metadata: Metadata = {
  title: "VŌGE - Premium Fashion",
  description: "Premium fashion curated for those who move through the world with intention and style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PageTransition>
            <ShopLayoutWrapper 
              footer={
                <footer className="shopco-footer">
                  <div className="shopco-newsletter">
                    <h2 className="shopco-newsletter-title">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
                    <div className="shopco-newsletter-form">
                      <div className="shopco-input-wrap">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <input type="email" placeholder="Enter your email address" />
                      </div>
                      <button className="shopco-newsletter-btn">Subscribe to Newsletter</button>
                    </div>
                  </div>

                  <div className="shopco-footer-main">
                    <div className="shopco-footer-col brand-col">
                      <div className="shopco-footer-logo">VŌGE</div>
                      <p className="shopco-footer-desc">We have clothes that suits your style and which you're proud to wear. From women to men.</p>
                      <div className="shopco-socials">
                        <div className="shopco-social-icon">T</div>
                        <div className="shopco-social-icon" style={{background: '#000', color: '#fff'}}>F</div>
                        <div className="shopco-social-icon">I</div>
                        <div className="shopco-social-icon">G</div>
                      </div>
                    </div>
                    
                    <div className="shopco-footer-col">
                      <div className="shopco-footer-title">Company</div>
                      <a href="#" className="shopco-footer-link">About</a>
                      <a href="#" className="shopco-footer-link">Features</a>
                      <a href="#" className="shopco-footer-link">Works</a>
                      <a href="#" className="shopco-footer-link">Career</a>
                    </div>

                    <div className="shopco-footer-col">
                      <div className="shopco-footer-title">Help</div>
                      <a href="#" className="shopco-footer-link">Customer Support</a>
                      <a href="#" className="shopco-footer-link">Delivery Details</a>
                      <a href="#" className="shopco-footer-link">Terms & Conditions</a>
                      <a href="#" className="shopco-footer-link">Privacy Policy</a>
                    </div>

                    <div className="shopco-footer-col">
                      <div className="shopco-footer-title">FAQ</div>
                      <a href="#" className="shopco-footer-link">Account</a>
                      <a href="#" className="shopco-footer-link">Manage Deliveries</a>
                      <a href="#" className="shopco-footer-link">Orders</a>
                      <a href="#" className="shopco-footer-link">Payments</a>
                    </div>

                    <div className="shopco-footer-col">
                      <div className="shopco-footer-title">Resources</div>
                      <a href="#" className="shopco-footer-link">Free eBooks</a>
                      <a href="#" className="shopco-footer-link">Development Tutorial</a>
                      <a href="#" className="shopco-footer-link">How to - Blog</a>
                      <a href="#" className="shopco-footer-link">Youtube Playlist</a>
                    </div>
                  </div>

                  <div className="shopco-footer-bottom">
                    <p>VŌGE © 2000-2025, All Rights Reserved</p>
                    <div className="shopco-payments">
                      <div className="shopco-pay-badge">V</div>
                      <div className="shopco-pay-badge">M</div>
                      <div className="shopco-pay-badge">P</div>
                      <div className="shopco-pay-badge">A</div>
                      <div className="shopco-pay-badge">G</div>
                    </div>
                  </div>
                </footer>
              }
            >
              {children}
            </ShopLayoutWrapper>
          </PageTransition>
        </Providers>
      </body>
    </html>
  );
}
