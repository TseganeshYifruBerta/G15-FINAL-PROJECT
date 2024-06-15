import Feature from "@/components/Feature";
import Pricing from "@/components/Pricing";
import Hero from "@/components/Hero";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/SeoHead";

export default function Home() {
  return (
    <>
      <SeoHead title='ሁሉ Code' />
      <Layout>
        <Hero />
        <Feature />
        <Pricing />
      </Layout>
    </>
  );
}