export default function MentionsLegales() {
  return (
    <>
      <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">Legal Mentions</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">1. Company Information</h2>
        <p>
          The website <strong>holdingai.io</strong> is operated by <strong>HOLDINGAI LTD</strong>, a company registered in the United Kingdom.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Company Name:</strong> HOLDINGAI LTD</li>
          <li><strong>Company Registration Number:</strong> 16382871</li>
          <li><strong>Registered Address:</strong> Lytchett House, Freeland Park, Wareham Road, Poole, Dorset, BH16 6FA, United Kingdom</li>
          <li><strong>Email:</strong> <a href="mailto:info@holdingai.io" className="text-brand-cyan hover:underline">info@holdingai.io</a></li>
          <li><strong>Phone:</strong> <a href="tel:+447537106967" className="text-brand-cyan hover:underline">+44 7537 106967</a></li>
        </ul>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-white">2. Hosting Provider</h2>
        <p>
          The website holdingai.io is hosted by Vercel Inc.<br />
          <strong>Address:</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
          <strong>Website:</strong> <a href="https://vercel.com" target="_blank" className="text-brand-cyan hover:underline">vercel.com</a>
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-white">3. Intellectual Property</h2>
        <p>
          All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of HOLDINGAI LTD or its content suppliers and is protected by international copyright laws. Unauthorized reproduction, distribution, or modification of any part of this site is strictly prohibited.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-white">4. Limitation of Liability</h2>
        <p>
          HOLDINGAI LTD endeavors to ensure the accuracy and reliability of the information provided on this website. However, the information is provided &quot;as is&quot; without any representations or warranties, express or implied. HOLDINGAI LTD will not be liable for any errors or omissions, or for any losses, injuries, or damages arising from the use of this information.
        </p>
      </section>
    </>
  );
}
