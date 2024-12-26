"use client";

import LoginForm from "@/app/components/LoginForm";
import Footer from "../components/Footer";

export default function Login() {
    return (
      <section className="SectionLogin">
        <LoginForm/>
        <Footer/>
      </section>        
    );
  }
