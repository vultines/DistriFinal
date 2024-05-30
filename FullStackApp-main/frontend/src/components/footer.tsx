import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

function Footer() {

  const router = useRouter();
  const showHeader = router.pathname === '/login' ? false : true;
  if (!showHeader) {
    return null;
  }
  
    return <div>
        <div className="footer">
        <div className="footerTitle">
          Centros Infantiles
        </div>

        <div className="copyrightContainer">
          Copyright &copy; 2023 Nasa Kisis
        </div>

        <div className="footerLinks">
          <Link href="#">Legal Stuff</Link>
          |
          <Link href="#">Privacy Policy</Link>
          |
          <Link href="#">Security</Link>
        </div>
      </div>
    </div>
}

export default function Layout({children}:any) {
    return (
        <>
            
            <main>{children}</main>
            <Footer />
        </>
    )
}